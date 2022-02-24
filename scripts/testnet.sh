#!/usr/bin/env bash

# API used for funding the calls, ideally https://api.hoprnet.org
declare API_ENDPOINT="https://api-hopr-oxbs3v49y-jjperezaguinaga.vercel.app"

# prevent execution of this script, only allow sourcing
$(return >/dev/null 2>&1)
test "$?" -eq "0" || { echo "This script should only be sourced." >&2; exit 1; }

# exit on errors, undefined variables, ensure errors in pipes are not hidden
set -Eeuo pipefail

# set log id and use shared log function for readable logs
declare mydir
mydir=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd -P)
declare HOPR_LOG_ID="testnet"
source "${mydir}/utils.sh"
source "${mydir}/gcloud.sh"
source "${mydir}/dns.sh"

# Native (e.g. XDAI)
declare min_funds=0.1

# HOPR tokens
# a topology node uses 0.5 HOPR to open channels, the rest are left in reserve
declare min_funds_hopr=1

# $1=role (ie. node-4)
# $2=network name
vm_name() {
  local role="${1}"
  local network_name="${2}"

  echo "${network_name}-${role}"
}

# $1=vm name
disk_name() {
  local vm_name="${1}"
  echo "${vm_name}-dsk"
}

# $1=environment id
get_rpc() {
  local environment_id="${1}"
  local network_id=$(cat "${mydir}/../packages/core/protocol-config.json" | jq -r ".environments.\"${environment_id}\".network_id")
  local unresolved_rpc=$(cat "${mydir}/../packages/core/protocol-config.json" | jq -r ".networks.\"${network_id}\".default_provider")

  echo "${unresolved_rpc}" | envsubst
}

# $1 = environment
# $2 = token (native | hopr)
funding_wallet_info() {
  local environment="${1}"
  local token="${2}"
  curl --silent "$API_ENDPOINT/api/faucet/$environment/info?text=$token"
}

# $1 = environment
# $2 = address
# $3 = token
wallet_balance() {
  local environment="${1}"
  local address="${2}"
  curl --silent "$API_ENDPOINT/api/balance/$environment/$address/$token?text=true"
}

# $1 = environment
# $2 = address
# $3 = token (native | hopr)
faucet_to_address() {
  local environment="${1}"
  local address="${2}"
  local token="${3}"
  local secret="${FAUCET_SECRET_API_KEY}"

  curl --silent --request POST \
  "$API_ENDPOINT/api/faucet/$environment/$address/$token?text=true" \
  --header 'Content-Type: application/json' \
  --data-raw "{\"secret\": \"$secret\"}"
}

# $1=account (hex)
# $2=environment
fund_if_empty() {
  local address="${1}"
  local environment="${2}"

  local faucet_address
  faucet_address=$(funding_wallet_info "${environment}" "address")

  local faucet_native_balance faucet_hopr_balance
  faucet_native_balance=$(funding_wallet_info "${environment}" "native")
  faucet_hopr_balance=$(funding_wallet_info "${environment}" "hopr")

  if [ "${faucet_native_balance}" = '0.0' ]; then
    log "Wallet ${faucet_address} has zero balance and cannot fund node ${address}"
    exit 1
  fi;

  if [ "${faucet_hopr_balance}" = '0.0' ]; then
    log "Wallet ${faucet_address} has no HOPR tokens and cannot fund node ${address}"
    exit 1
  fi;

  log "Funding wallet ${faucet_address} has enough funds: ${faucet_native_balance}"
  log "Funding wallet ${faucet_address} has HOPR tokens: ${faucet_hopr_balance}"

  local address_native_balance address_hopr_balance
  log "Checking balance of the address to fund: ${address}"
  address_native_balance=$(wallet_balance "${environment}" "${address}" "native")
  log "Checking balance of the address to fund: ${address}"
  address_hopr_balance=$(wallet_balance "${environment}" "${address}" "native")

  log "Native balance of ${address} is ${address_native_balance}"
  log "HOPR balance of ${address} is ${address_hopr_balance}"

  if [ "${address_native_balance}" = '0.0' ]; then
    # @TODO: Provide retry by checking balance again.
    log "${address} has no native balance. Funding native tokens..."
    faucet_to_address "${environment}" "${address}" "native"
  fi

  if [ "${address_hopr_balance}" = '0.0' ]; then
    # @TODO: Provide retry by checking balance again.
    log "${address} has no HOPR tokens. Funding HOPR tokens..."
    faucet_to_address "${environment}" "${address}" "hopr"
  fi
}

# $1=IP
# $2=Hopr command
# $3=optional: port
run_command(){
  curl --silent -X POST --data "${2}" "${1}:${3:-3001}/api/v1/command"
}

# $1=vm name
# $2=docker image
# $3=environment id
update_if_existing() {
  local vm_name=${1}
  local docker_image=${2}
  local environment_id=${3}

  if [[ $(gcloud_find_vm_with_name $1) ]]; then
    log "Container exists, updating" 1>&2
    PREV=$(gcloud_get_image_running_on_vm $1)
    if [ "$PREV" == "$2" ]; then
      log "Same version of image is currently running. Skipping update to $PREV" 1>&2
      return 0
    fi
    log "Previous GCloud VM Image: $PREV"
    gcloud_update_container_with_image "${vm_name}" "${docker_image}" "$(disk_name ${vm_name})" "/app/db" "${environment_id}"

    # prevent docker images overloading the disk space
    gcloud_cleanup_docker_images "${vm_name}"
  else
    echo "no container"
  fi

}

# $1=vm name
# $2=docker image
# $3=environment id
# NB: --run needs to be at the end or it will ignore the other arguments.
start_testnode_vm() {
  local vm_name=${1}
  local docker_image=${2}
  local environment_id=${3}
  local api_token="${HOPRD_API_TOKEN}"
  local password="${BS_PASSWORD}"

  local rpc=$(get_rpc "${environment_id}")

  if [ "$(update_if_existing ${vm_name} ${docker_image} ${environment_id})"="no container" ]; then
    gcloud compute instances create-with-container ${vm_name} $GCLOUD_DEFAULTS \
      --create-disk name=$(disk_name ${vm_name}),size=10GB,type=pd-standard,mode=rw \
      --container-mount-disk mount-path="/app/db" \
      --container-env=^,@^DEBUG=hopr\*,@NODE_OPTIONS=--max-old-space-size=4096,@GCLOUD=1 \
      --container-image=${docker_image} \
      --container-arg="--admin" \
      --container-arg="--adminHost" --container-arg="0.0.0.0" \
      --container-arg="--announce" \
      --container-arg="--apiToken" --container-arg="${api_token}" \
      --container-arg="--healthCheck" \
      --container-arg="--healthCheckHost" --container-arg="0.0.0.0" \
      --container-arg="--identity" --container-arg="/app/db/.hopr-identity" \
      --container-arg="--init" \
      --container-arg="--password" --container-arg="${password}" \
      --container-arg="--environment" --container-arg="${environment_id}" \
      --container-arg="--rest" \
      --container-arg="--restHost" --container-arg="0.0.0.0" \
      --container-arg="--run" --container-arg="\"cover-traffic start;daemonize\"" \
      --container-restart-policy=always
  fi
}

# $1=vm name
# Run a VM with a hardhat instance
start_chain_provider(){
  gcloud compute instances create-with-container $1-provider $GCLOUD_DEFAULTS \
      --create-disk name=$(disk_name $1),size=10GB,type=pd-standard,mode=rw \
      --container-image='hopr-provider'

  #hardhat node --config packages/ethereum/hardhat.config.ts
}

# $1=testnet name
# $2=docker image
# $3=node number
# $4=environment id
start_testnode() {
  local vm ip eth_address

  local testnet_name=${1}
  local docker_image=${2}
  local node_number=${3}
  local environment_id=${4}

  # start or update vm
  vm=$(vm_name "node-${node_number}" ${testnet_name})
  log "- Starting test node ${vm} with ${docker_image} ${environment_id}"
  start_testnode_vm ${vm} ${docker_image} ${environment_id}

  # ensure node has funds, even after just updating a release
  ip=$(gcloud_get_ip "${vm}")
  wait_until_node_is_ready ${ip}
  eth_address=$(get_native_address "${ip}:3001")
  fund_if_empty "${eth_address}" "${environment_id}"
}

# $1 authorized keys file
add_keys() {
  if test -f "$1"; then
    log "Reading keys from $1"
    cat $1 | xargs -I {} gcloud compute os-login ssh-keys add --key="{}"
  else
    echo "Authorized keys file not found"
  fi
}
