import type { HardhatRuntimeEnvironment } from 'hardhat/types'
import type { DeployFunction } from 'hardhat-deploy/types'
import type { DeploymentTypes } from '../src/constants'
import { durations } from '@hoprnet/hopr-utils'
import { ethers } from 'ethers'

const startTimes: {
  [key in DeploymentTypes]: number
} = {
  testing: durations.days(1),
  development: durations.days(1),
  staging: durations.days(1),
  production: durations.days(1)
}

const maxMintAmounts: {
  [key in DeploymentTypes]: string
} = {
  testing: ethers.utils.parseEther('100000000').toString(),
  development: ethers.utils.parseEther('100000000').toString(),
  staging: ethers.utils.parseEther('100000000').toString(),
  production: ethers.utils.parseEther('100000000').toString()
}

const main: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers, deployments, getNamedAccounts, network, environment } = hre
  const deployer = await getNamedAccounts().then((o) => ethers.getSigner(o.deployer))
  const deploymentType = Object.keys(network.tags).find((tag) => startTimes[tag])

  const hoprToken = await deployments.get('HoprToken')

  const deployOptions = {
    log: true
  }
  // don't wait when using local hardhat because its using auto-mine
  if (!environment.match('hardhat')) {
    deployOptions['waitConfirmations'] = 2
  }

  await deployments.deploy('HoprDistributor', {
    from: deployer.address,
    args: [
      hoprToken.address,
      Math.floor(startTimes[deploymentType] ?? startTimes.testing / 1e3),
      maxMintAmounts[deploymentType] ?? maxMintAmounts.testing
    ],
    ...deployOptions
  })
}

// this smart contract should not be redeployed on a production network
// Also not necessary in local networks
main.skip = async (env: HardhatRuntimeEnvironment) => !!env.network.tags.production || !env.network.tags.development
main.dependencies = ['preDeploy', 'HoprToken']
main.tags = ['HoprDistributor']

export default main
