/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { IERC1820Registry, IERC1820RegistryInterface } from '../IERC1820Registry'

const _abi = [
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
        indexed: true,
        internalType: 'bytes32',
        name: 'interfaceHash',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'implementer',
        type: 'address'
      }
    ],
    name: 'InterfaceImplementerSet',
    type: 'event'
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
        indexed: true,
        internalType: 'address',
        name: 'newManager',
        type: 'address'
      }
    ],
    name: 'ManagerChanged',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: '_interfaceHash',
        type: 'bytes32'
      }
    ],
    name: 'getInterfaceImplementer',
    outputs: [
      {
        internalType: 'address',
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
        name: 'account',
        type: 'address'
      }
    ],
    name: 'getManager',
    outputs: [
      {
        internalType: 'address',
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
        name: 'account',
        type: 'address'
      },
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4'
      }
    ],
    name: 'implementsERC165Interface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4'
      }
    ],
    name: 'implementsERC165InterfaceNoCache',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'interfaceName',
        type: 'string'
      }
    ],
    name: 'interfaceHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: '_interfaceHash',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'implementer',
        type: 'address'
      }
    ],
    name: 'setInterfaceImplementer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'newManager',
        type: 'address'
      }
    ],
    name: 'setManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4'
      }
    ],
    name: 'updateERC165Cache',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

export class IERC1820Registry__factory {
  static readonly abi = _abi
  static createInterface(): IERC1820RegistryInterface {
    return new utils.Interface(_abi) as IERC1820RegistryInterface
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IERC1820Registry {
    return new Contract(address, _abi, signerOrProvider) as IERC1820Registry
  }
}
