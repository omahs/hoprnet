/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from 'ethers'
import { Provider } from '@ethersproject/providers'
import type { LegacyERC20, LegacyERC20Interface } from '../LegacyERC20'

const _abi = [
  {
    constant: false,
    inputs: [
      {
        name: '_owner',
        type: 'address'
      },
      {
        name: '_spender',
        type: 'address'
      },
      {
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'transferFrom',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address'
      },
      {
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'transfer',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

export class LegacyERC20__factory {
  static readonly abi = _abi
  static createInterface(): LegacyERC20Interface {
    return new utils.Interface(_abi) as LegacyERC20Interface
  }
  static connect(address: string, signerOrProvider: Signer | Provider): LegacyERC20 {
    return new Contract(address, _abi, signerOrProvider) as LegacyERC20
  }
}
