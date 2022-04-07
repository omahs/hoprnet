/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, BigNumberish, Contract, ContractFactory, Overrides } from 'ethers'
import { Provider, TransactionRequest } from '@ethersproject/providers'
import type { HoprChannels, HoprChannelsInterface } from '../HoprChannels'

const _abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address'
      },
      {
        internalType: 'uint32',
        name: '_secsClosure',
        type: 'uint32'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'publicKey',
        type: 'bytes'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'multiaddr',
        type: 'bytes'
      }
    ],
    name: 'Announcement',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'source',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'destination',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'newCommitment',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'ticketEpoch',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'channelBalance',
        type: 'uint256'
      }
    ],
    name: 'ChannelBumped',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'source',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'destination',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'closureFinalizationTime',
        type: 'uint32'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'channelBalance',
        type: 'uint256'
      }
    ],
    name: 'ChannelClosureFinalized',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'source',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'destination',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'closureInitiationTime',
        type: 'uint32'
      }
    ],
    name: 'ChannelClosureInitiated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'funder',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'source',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'destination',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'ChannelFunded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'source',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'destination',
        type: 'address'
      }
    ],
    name: 'ChannelOpened',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'source',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'destination',
        type: 'address'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'balance',
            type: 'uint256'
          },
          {
            internalType: 'bytes32',
            name: 'commitment',
            type: 'bytes32'
          },
          {
            internalType: 'uint256',
            name: 'ticketEpoch',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'ticketIndex',
            type: 'uint256'
          },
          {
            internalType: 'enum HoprChannels.ChannelStatus',
            name: 'status',
            type: 'uint8'
          },
          {
            internalType: 'uint256',
            name: 'channelEpoch',
            type: 'uint256'
          },
          {
            internalType: 'uint32',
            name: 'closureTime',
            type: 'uint32'
          }
        ],
        indexed: false,
        internalType: 'struct HoprChannels.Channel',
        name: 'newState',
        type: 'tuple'
      }
    ],
    name: 'ChannelUpdated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'source',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'destination',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'nextCommitment',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'ticketEpoch',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'ticketIndex',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'proofOfRelaySecret',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'winProb',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes'
      }
    ],
    name: 'TicketRedeemed',
    type: 'event'
  },
  {
    inputs: [],
    name: 'FUND_CHANNEL_MULTI_SIZE',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'TOKENS_RECIPIENT_INTERFACE_HASH',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'publicKey',
        type: 'bytes'
      },
      {
        internalType: 'bytes',
        name: 'multiaddr',
        type: 'bytes'
      }
    ],
    name: 'announce',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'source',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: 'newCommitment',
        type: 'bytes32'
      }
    ],
    name: 'bumpChannel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'interfaceHash',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'canImplementInterfaceForAddress',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    name: 'channels',
    outputs: [
      {
        internalType: 'uint256',
        name: 'balance',
        type: 'uint256'
      },
      {
        internalType: 'bytes32',
        name: 'commitment',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: 'ticketEpoch',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'ticketIndex',
        type: 'uint256'
      },
      {
        internalType: 'enum HoprChannels.ChannelStatus',
        name: 'status',
        type: 'uint8'
      },
      {
        internalType: 'uint256',
        name: 'channelEpoch',
        type: 'uint256'
      },
      {
        internalType: 'uint32',
        name: 'closureTime',
        type: 'uint32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'destination',
        type: 'address'
      }
    ],
    name: 'finalizeChannelClosure',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account1',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'account2',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount1',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'amount2',
        type: 'uint256'
      }
    ],
    name: 'fundChannelMulti',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'destination',
        type: 'address'
      }
    ],
    name: 'initiateChannelClosure',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: 'data',
        type: 'bytes[]'
      }
    ],
    name: 'multicall',
    outputs: [
      {
        internalType: 'bytes[]',
        name: 'results',
        type: 'bytes[]'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'publicKeys',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'source',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: 'nextCommitment',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: 'ticketEpoch',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'ticketIndex',
        type: 'uint256'
      },
      {
        internalType: 'bytes32',
        name: 'proofOfRelaySecret',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'winProb',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes'
      }
    ],
    name: 'redeemTicket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'secsClosure',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'token',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: 'userData',
        type: 'bytes'
      },
      {
        internalType: 'bytes',
        name: 'operatorData',
        type: 'bytes'
      }
    ],
    name: 'tokensReceived',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

const _bytecode =
  '0x600061010081905261012081905261014081905261016052608060e081905261018060405280523480156200003357600080fd5b5060405162002b2b38038062002b2b833981016040819052620000569162000163565b6001600160a01b038216620000b15760405162461bcd60e51b815260206004820152601760248201527f746f6b656e206d757374206e6f7420626520656d707479000000000000000000604482015260640160405180910390fd5b6001600160a01b03821660a05263ffffffff811660c0526040516329965a1d60e01b815230600482018190527fb281fc8c12954d22544db45de3159a39272895b169a852b314f9cc762e44c53b60248301526044820152731820a4b7618bde71dce8cdc73aab6c95905fad24906329965a1d90606401600060405180830381600087803b1580156200014257600080fd5b505af115801562000157573d6000803e3d6000fd5b505050505050620001b5565b600080604083850312156200017757600080fd5b82516001600160a01b03811681146200018f57600080fd5b602084015190925063ffffffff81168114620001aa57600080fd5b809150509250929050565b60805160a05160c05161291c6200020f6000396000818161017301526112e20152600081816102dd01528181610322015281816106f201528181610e510152610f6d01526000818161011301526103fd015261291c6000f3fe608060405234801561001057600080fd5b50600436106100f45760003560e01c80634341abdd11610097578063ac9650d811610066578063ac9650d814610292578063b4037e80146102b2578063b7bbca8a146102c5578063fc0c546a146102d857600080fd5b80634341abdd146101d057806372581cc0146101e35780637a7ebd7b1461020a578063a3d6f9a91461027257600080fd5b8063249cb3fa116100d3578063249cb3fa1461015b578063275621d11461016e57806328f7fd78146101aa5780632bcead2f146101bd57600080fd5b806223de29146100f9578063048a097d1461010e578063075e389f14610148575b600080fd5b61010c610107366004612048565b610317565b005b6101357f000000000000000000000000000000000000000000000000000000000000000081565b6040519081526020015b60405180910390f35b61010c6101563660046120f9565b6104df565b610135610169366004612116565b61077f565b6101957f000000000000000000000000000000000000000000000000000000000000000081565b60405163ffffffff909116815260200161013f565b61010c6101b8366004612146565b6107d7565b61010c6101cb3660046121c8565b6108c3565b61010c6101de3660046122c6565b610ee6565b6101357fb281fc8c12954d22544db45de3159a39272895b169a852b314f9cc762e44c53b81565b61025f61021836600461230c565b600260208190526000918252604090912080546001820154928201546003830154600484015460058501546006909501549395949293919260ff9091169163ffffffff1687565b60405161013f979695949392919061235d565b6102856102803660046120f9565b611025565b60405161013f9190612401565b6102a56102a0366004612414565b6110bf565b60405161013f9190612489565b61010c6102c03660046120f9565b6111b4565b61010c6102d33660046124eb565b6113b2565b6102ff7f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b03909116815260200161013f565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146103945760405162461bcd60e51b815260206004820152601860248201527f63616c6c6572206d75737420626520486f7072546f6b656e000000000000000060448201526064015b60405180910390fd5b6001600160a01b03861630146103fb5760405162461bcd60e51b815260206004820152602660248201527f6d7573742062652073656e64696e6720746f6b656e7320746f20486f70724368604482015265616e6e656c7360d01b606482015260840161038b565b7f00000000000000000000000000000000000000000000000000000000000000008314156104d5576000808080610434878901896122c6565b92965090945092509050610448818361252d565b89146104ac5760405162461bcd60e51b815260206004820152602d60248201527f616d6f756e742073656e74206d75737420626520657175616c20746f20616d6f60448201526c1d5b9d081cdc1958da599a5959609a1b606482015260840161038b565b81156104be576104be8b858585611564565b80156104d0576104d08b848684611564565b505050505b5050505050505050565b33816001600160a01b03811682141561050a5760405162461bcd60e51b815260040161038b90612545565b6001600160a01b0382166105305760405162461bcd60e51b815260040161038b90612590565b6001600160a01b0381166105565760405162461bcd60e51b815260040161038b906125c7565b600061056233856118e3565b915060039050600482015460ff16600381111561058157610581612325565b146105ce5760405162461bcd60e51b815260206004820181905260248201527f6368616e6e656c206d7573742062652070656e64696e6720746f20636c6f7365604482015260640161038b565b600681015463ffffffff42811691161061062a5760405162461bcd60e51b815260206004820152601e60248201527f636c6f7375726554696d65206d757374206265206265666f7265206e6f770000604482015260640161038b565b805460068201546040805163ffffffff9092168252602082018390526001600160a01b0387169133917fe685c05e0c2d3e8915b3dc7cd37e2aac94887e856025d6295360af16183c9f9c910160405180910390a36000825560068201805463ffffffff1916905560048201805460ff191690556040516001600160a01b0386169033906000805160206128c7833981519152906106c89086906125fe565b60405180910390a380156107785760405163a9059cbb60e01b8152336004820152602481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063a9059cbb90604401602060405180830381600087803b15801561073e57600080fd5b505af1158015610752573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610776919061265a565b505b5050505050565b6000828152602081815260408083206001600160a01b038516845290915281205460ff166107ae5760006107d0565b7fa2ef4600d742022d532d4747cb3547474667d6f13804902513b2ec01c848f4b45b9392505050565b60405133906107e9908690869061267c565b6040519081900390206001600160a01b03161461085b5760405162461bcd60e51b815260206004820152602a60248201527f7075626c69634b65792773206164647265737320646f6573206e6f74206d617460448201526963682073656e6465727360b01b606482015260840161038b565b336000908152600160205260409020610875908585611f58565b50336001600160a01b03167f5df480f8854903a456738589684a9c046d81dbba3e9cb83d5f6f1bbf3f1cba32858585856040516108b594939291906126b5565b60405180910390a250505050565b87336001600160a01b0382168114156108ee5760405162461bcd60e51b815260040161038b90612545565b6001600160a01b0382166109145760405162461bcd60e51b815260040161038b90612590565b6001600160a01b03811661093a5760405162461bcd60e51b815260040161038b906125c7565b886109875760405162461bcd60e51b815260206004820181905260248201527f6e657874436f6d6d69746d656e74206d757374206e6f7420626520656d707479604482015260640161038b565b846109d45760405162461bcd60e51b815260206004820152601860248201527f616d6f756e74206d757374206e6f7420626520656d7074790000000000000000604482015260640161038b565b60006109e08b336118e3565b915060029050600482015460ff1660038111156109ff576109ff612325565b1480610a2357506003600482015460ff166003811115610a2157610a21612325565b145b610a895760405162461bcd60e51b815260206004820152603160248201527f7370656e64696e67206368616e6e656c206d757374206265206f70656e206f726044820152702070656e64696e6720746f20636c6f736560781b606482015260840161038b565b60408051602081018c90520160405160208183030381529060405280519060200120816001015414610b105760405162461bcd60e51b815260206004820152602a60248201527f636f6d6d69746d656e74206d7573742062652068617368206f66206e6578742060448201526918dbdb5b5a5d1b595b9d60b21b606482015260840161038b565b88816002015414610b635760405162461bcd60e51b815260206004820152601760248201527f7469636b65742065706f6368206d757374206d61746368000000000000000000604482015260640161038b565b87816003015410610bb65760405162461bcd60e51b815260206004820152601c60248201527f726564656d7074696f6e73206d75737420626520696e206f7264657200000000604482015260640161038b565b6000610c23610bd23384600201548b86600501548c8f8d611953565b8051602091820120604080517f19457468657265756d205369676e6564204d6573736167653a0a33320000000081850152603c8082019390935281518082039093018352605c019052805191012090565b90508b6001600160a01b0316610c3982876119cc565b6001600160a01b031614610c9a5760405162461bcd60e51b815260206004820152602260248201527f7369676e6572206d757374206d617463682074686520636f756e746572706172604482015261747960f01b606482015260840161038b565b6040805160208082018490528183018e905260608083018c90528351808403909101815260809092019092528051910120861015610d115760405162461bcd60e51b81526020600482015260146024820152733a34b1b5b2ba1036bab9ba1031329030903bb4b760611b604482015260640161038b565b60038201899055600182018b90558154610d2c9088906126e7565b82556000610d3a338e6118e3565b915050336001600160a01b03168d6001600160a01b03166000805160206128c783398151915285604051610d6e91906125fe565b60405180910390a3336001600160a01b03168d6001600160a01b03167f862117d954cb13fb5dbae8b4bdb5dc0d551725fc3af4c0e34350c194ba3588218e8e8e8e8e8e8e604051610dc597969594939291906126fe565b60405180910390a36002600482015460ff166003811115610de857610de8612325565b1415610e35578054610dfb90899061252d565b81556040516001600160a01b038e169033906000805160206128c783398151915290610e289085906125fe565b60405180910390a3610ed7565b60405163a9059cbb60e01b8152336004820152602481018990527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063a9059cbb90604401602060405180830381600087803b158015610e9d57600080fd5b505af1158015610eb1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ed5919061265a565b505b50505050505050505050505050565b6000610ef2828461252d565b11610f3f5760405162461bcd60e51b815260206004820152601d60248201527f616d6f756e74206d7573742062652067726561746572207468616e2030000000604482015260640161038b565b8115610f5157610f5133858585611564565b8015610f6357610f6333848684611564565b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000166323b872dd3330610f9e858761252d565b6040516001600160e01b031960e086901b1681526001600160a01b0393841660048201529290911660248301526044820152606401602060405180830381600087803b158015610fed57600080fd5b505af1158015611001573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610778919061265a565b6001602052600090815260409020805461103e90612742565b80601f016020809104026020016040519081016040528092919081815260200182805461106a90612742565b80156110b75780601f1061108c576101008083540402835291602001916110b7565b820191906000526020600020905b81548152906001019060200180831161109a57829003601f168201915b505050505081565b60608167ffffffffffffffff8111156110da576110da6121b2565b60405190808252806020026020018201604052801561110d57816020015b60608152602001906001900390816110f85790505b50905060005b828110156111ad5761117d308585848181106111315761113161277d565b90506020028101906111439190612793565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506119f092505050565b82828151811061118f5761118f61277d565b602002602001018190525080806111a5906127da565b915050611113565b5092915050565b33816001600160a01b0381168214156111df5760405162461bcd60e51b815260040161038b90612545565b6001600160a01b0382166112055760405162461bcd60e51b815260040161038b90612590565b6001600160a01b03811661122b5760405162461bcd60e51b815260040161038b906125c7565b600061123733856118e3565b915060029050600482015460ff16600381111561125657611256612325565b148061127a57506001600482015460ff16600381111561127857611278612325565b145b6112dd5760405162461bcd60e51b815260206004820152602e60248201527f6368616e6e656c206d757374206265206f70656e206f722077616974696e672060448201526d199bdc8818dbdb5b5a5d1b595b9d60921b606482015260840161038b565b6113077f0000000000000000000000000000000000000000000000000000000000000000426127f5565b60068201805463ffffffff9290921663ffffffff1990921691909117905560048101805460ff191660031790556040516001600160a01b0385169033906000805160206128c78339815191529061135f9085906125fe565b60405180910390a36001600160a01b038416337f33fa346a7a012d012279164042f6783bf49d701f28b0d8cd0103ef57f9919f0f4260405163ffffffff909116815260200160405180910390a350505050565b81336001600160a01b0382168114156113dd5760405162461bcd60e51b815260040161038b90612545565b6001600160a01b0382166114035760405162461bcd60e51b815260040161038b90612590565b6001600160a01b0381166114295760405162461bcd60e51b815260040161038b906125c7565b600061143585336118e3565b915050836114855760405162461bcd60e51b815260206004820152601b60248201527f43616e6e6f742073657420656d70747920636f6d6d69746d656e740000000000604482015260640161038b565b6001808201859055600282015461149b9161252d565b60028201556001600482015460ff1660038111156114bb576114bb612325565b14156114d15760048101805460ff191660021790555b336001600160a01b0316856001600160a01b03166000805160206128c78339815191528360405161150291906125fe565b60405180910390a36002810154815460408051878152602081019390935282015233906001600160a01b038716907f3ed4218941b780517f978f5c9b88cd51f7010c9468cf3ea55422098c81755a7e9060600160405180910390a35050505050565b8282806001600160a01b0316826001600160a01b031614156115985760405162461bcd60e51b815260040161038b90612545565b6001600160a01b0382166115be5760405162461bcd60e51b815260040161038b90612590565b6001600160a01b0381166115e45760405162461bcd60e51b815260040161038b906125c7565b600083116116345760405162461bcd60e51b815260206004820152601d60248201527f616d6f756e74206d7573742062652067726561746572207468616e2030000000604482015260640161038b565b6001600160a01b0385166000908152600160205260409020805461165790612742565b151590506116a75760405162461bcd60e51b815260206004820152601860248201527f736f7572636520686173206e6f7420616e6e6f756e6365640000000000000000604482015260640161038b565b6001600160a01b038416600090815260016020526040902080546116ca90612742565b1515905061171a5760405162461bcd60e51b815260206004820152601d60248201527f64657374696e6174696f6e20686173206e6f7420616e6e6f756e636564000000604482015260640161038b565b600061172686866118e3565b915060039050600482015460ff16600381111561174557611745612325565b14156117935760405162461bcd60e51b815260206004820152601d60248201527f43616e6e6f742066756e64206120636c6f73696e67206368616e6e656c000000604482015260640161038b565b6000600482015460ff1660038111156117ae576117ae612325565b141561183e5760058101546117c490600161252d565b6005820155600060028201819055600382015560018101541561182e5760048101805460ff191660021790556040516001600160a01b0380871691908816907fdd90f938230335e59dc925c57ecb0e27a28c2d87356e31f00cd5554abd6c1b2d90600090a361183e565b60048101805460ff191660011790555b805461184b90859061252d565b81556040516001600160a01b0380871691908816906000805160206128c78339815191529061187b9085906125fe565b60405180910390a3846001600160a01b0316866001600160a01b0316886001600160a01b03167f4b4ab74078c30b1983f2e92a76c9d915b471f0689ecbfea501b3bf3299f6c010876040516118d291815260200190565b60405180910390a450505050505050565b600080600061193785856040516bffffffffffffffffffffffff19606084811b8216602084015283901b16603482015260009060480160405160208183030381529060405280519060200120905092915050565b60008181526002602052604090209093509150505b9250929050565b6060600061196087611a15565b6040516bffffffffffffffffffffffff1960608c811b8216602084015283901b166034820152604881018a9052606881018790526088810185905260a8810186905260c8810188905290915060e801604051602081830303815290604052915050979650505050505050565b60008060006119db8585611b04565b915091506119e881611b71565b509392505050565b60606107d083836040518060600160405280602781526020016128a060279139611d2f565b600070014551231950b75fc4402da1732fc9bebe1982611a475760405162461bcd60e51b815260040161038b9061281d565b808310611a665760405162461bcd60e51b815260040161038b9061281d565b7f79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798601b600060018183858780611a9e57611a9e61286d565b878b096040805160008152602081018083529590955260ff909316928401929092526060830152608082015260a0016020604051602081039080840390855afa158015611aef573d6000803e3d6000fd5b5050604051601f190151979650505050505050565b600080825160411415611b3b5760208301516040840151606085015160001a611b2f87828585611e03565b9450945050505061194c565b825160401415611b655760208301516040840151611b5a868383611ef0565b93509350505061194c565b5060009050600261194c565b6000816004811115611b8557611b85612325565b1415611b8e5750565b6001816004811115611ba257611ba2612325565b1415611bf05760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604482015260640161038b565b6002816004811115611c0457611c04612325565b1415611c525760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604482015260640161038b565b6003816004811115611c6657611c66612325565b1415611cbf5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b606482015260840161038b565b6004816004811115611cd357611cd3612325565b1415611d2c5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b606482015260840161038b565b50565b6060833b611d8e5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b606482015260840161038b565b600080856001600160a01b031685604051611da99190612883565b600060405180830381855af49150503d8060008114611de4576040519150601f19603f3d011682016040523d82523d6000602084013e611de9565b606091505b5091509150611df9828286611f1f565b9695505050505050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0831115611e3a5750600090506003611ee7565b8460ff16601b14158015611e5257508460ff16601c14155b15611e635750600090506004611ee7565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015611eb7573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116611ee057600060019250925050611ee7565b9150600090505b94509492505050565b6000806001600160ff1b03831660ff84901c601b01611f1187828885611e03565b935093505050935093915050565b60608315611f2e5750816107d0565b825115611f3e5782518084602001fd5b8160405162461bcd60e51b815260040161038b9190612401565b828054611f6490612742565b90600052602060002090601f016020900481019282611f865760008555611fcc565b82601f10611f9f5782800160ff19823516178555611fcc565b82800160010185558215611fcc579182015b82811115611fcc578235825591602001919060010190611fb1565b50611fd8929150611fdc565b5090565b5b80821115611fd85760008155600101611fdd565b6001600160a01b0381168114611d2c57600080fd5b60008083601f84011261201857600080fd5b50813567ffffffffffffffff81111561203057600080fd5b60208301915083602082850101111561194c57600080fd5b60008060008060008060008060c0898b03121561206457600080fd5b883561206f81611ff1565b9750602089013561207f81611ff1565b9650604089013561208f81611ff1565b955060608901359450608089013567ffffffffffffffff808211156120b357600080fd5b6120bf8c838d01612006565b909650945060a08b01359150808211156120d857600080fd5b506120e58b828c01612006565b999c989b5096995094979396929594505050565b60006020828403121561210b57600080fd5b81356107d081611ff1565b6000806040838503121561212957600080fd5b82359150602083013561213b81611ff1565b809150509250929050565b6000806000806040858703121561215c57600080fd5b843567ffffffffffffffff8082111561217457600080fd5b61218088838901612006565b9096509450602087013591508082111561219957600080fd5b506121a687828801612006565b95989497509550505050565b634e487b7160e01b600052604160045260246000fd5b600080600080600080600080610100898b0312156121e557600080fd5b88356121f081611ff1565b97506020890135965060408901359550606089013594506080890135935060a0890135925060c0890135915060e089013567ffffffffffffffff8082111561223757600080fd5b818b0191508b601f83011261224b57600080fd5b81358181111561225d5761225d6121b2565b604051601f8201601f19908116603f01168101908382118183101715612285576122856121b2565b816040528281528e602084870101111561229e57600080fd5b8260208601602083013760006020848301015280955050505050509295985092959890939650565b600080600080608085870312156122dc57600080fd5b84356122e781611ff1565b935060208501356122f781611ff1565b93969395505050506040820135916060013590565b60006020828403121561231e57600080fd5b5035919050565b634e487b7160e01b600052602160045260246000fd5b6004811061235957634e487b7160e01b600052602160045260246000fd5b9052565b600060e082019050888252876020830152866040830152856060830152612387608083018661233b565b8360a083015263ffffffff831660c083015298975050505050505050565b60005b838110156123c05781810151838201526020016123a8565b838111156123cf576000848401525b50505050565b600081518084526123ed8160208601602086016123a5565b601f01601f19169290920160200192915050565b6020815260006107d060208301846123d5565b6000806020838503121561242757600080fd5b823567ffffffffffffffff8082111561243f57600080fd5b818501915085601f83011261245357600080fd5b81358181111561246257600080fd5b8660208260051b850101111561247757600080fd5b60209290920196919550909350505050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b828110156124de57603f198886030184526124cc8583516123d5565b945092850192908501906001016124b0565b5092979650505050505050565b600080604083850312156124fe57600080fd5b823561250981611ff1565b946020939093013593505050565b634e487b7160e01b600052601160045260246000fd5b6000821982111561254057612540612517565b500190565b6020808252602b908201527f736f7572636520616e642064657374696e6174696f6e206d757374206e6f742060408201526a6265207468652073616d6560a81b606082015260800190565b60208082526018908201527f736f75726365206d757374206e6f7420626520656d7074790000000000000000604082015260600190565b6020808252601d908201527f64657374696e6174696f6e206d757374206e6f7420626520656d707479000000604082015260600190565b81548152600182015460208201526002820154604082015260038201546060820152600482015460e082019060ff1661263a608084018261233b565b50600583015460a083015260069092015463ffffffff1660c09091015290565b60006020828403121561266c57600080fd5b815180151581146107d057600080fd5b8183823760009101908152919050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b6040815260006126c960408301868861268c565b82810360208401526126dc81858761268c565b979650505050505050565b6000828210156126f9576126f9612517565b500390565b8781528660208201528560408201528460608201528360808201528260a082015260e060c0820152600061273560e08301846123d5565b9998505050505050505050565b600181811c9082168061275657607f821691505b6020821081141561277757634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b6000808335601e198436030181126127aa57600080fd5b83018035915067ffffffffffffffff8211156127c557600080fd5b60200191503681900382131561194c57600080fd5b60006000198214156127ee576127ee612517565b5060010190565b600063ffffffff80831681851680830382111561281457612814612517565b01949350505050565b60208082526030908201527f496e76616c696420726573706f6e73652e2056616c7565206d7573742062652060408201526f1dda5d1a1a5b881d1a1948199a595b1960821b606082015260800190565b634e487b7160e01b600052601260045260246000fd5b600082516128958184602087016123a5565b919091019291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a564bc94452694932bff57ef0cc1e5c10e8a698bf56fb7623572236cb4a77b18a264697066735822122047f1aa7f5736b646f9e6f63addbf33bd6f8dce87f23b91f8c18e4263142ce0d064736f6c63430008090033'

export class HoprChannels__factory extends ContractFactory {
  constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0])
    } else {
      super(...args)
    }
  }

  deploy(
    _token: string,
    _secsClosure: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<HoprChannels> {
    return super.deploy(_token, _secsClosure, overrides || {}) as Promise<HoprChannels>
  }
  getDeployTransaction(
    _token: string,
    _secsClosure: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_token, _secsClosure, overrides || {})
  }
  attach(address: string): HoprChannels {
    return super.attach(address) as HoprChannels
  }
  connect(signer: Signer): HoprChannels__factory {
    return super.connect(signer) as HoprChannels__factory
  }
  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): HoprChannelsInterface {
    return new utils.Interface(_abi) as HoprChannelsInterface
  }
  static connect(address: string, signerOrProvider: Signer | Provider): HoprChannels {
    return new Contract(address, _abi, signerOrProvider) as HoprChannels
  }
}
