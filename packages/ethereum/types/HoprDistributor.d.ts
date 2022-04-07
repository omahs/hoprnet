/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides
} from 'ethers'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'
import type { TypedEventFilter, TypedEvent, TypedListener } from './common'

interface HoprDistributorInterface extends ethers.utils.Interface {
  functions: {
    'MULTIPLIER()': FunctionFragment
    'addAllocations(address[],uint128[],string)': FunctionFragment
    'addSchedule(uint128[],uint128[],string)': FunctionFragment
    'allocations(address,string)': FunctionFragment
    'claim(string)': FunctionFragment
    'claimFor(address,string)': FunctionFragment
    'getClaimable(address,string)': FunctionFragment
    'getSchedule(string)': FunctionFragment
    'maxMintAmount()': FunctionFragment
    'owner()': FunctionFragment
    'renounceOwnership()': FunctionFragment
    'revokeAccount(address,string)': FunctionFragment
    'startTime()': FunctionFragment
    'token()': FunctionFragment
    'totalMinted()': FunctionFragment
    'totalToBeMinted()': FunctionFragment
    'transferOwnership(address)': FunctionFragment
    'updateStartTime(uint128)': FunctionFragment
  }

  encodeFunctionData(functionFragment: 'MULTIPLIER', values?: undefined): string
  encodeFunctionData(functionFragment: 'addAllocations', values: [string[], BigNumberish[], string]): string
  encodeFunctionData(functionFragment: 'addSchedule', values: [BigNumberish[], BigNumberish[], string]): string
  encodeFunctionData(functionFragment: 'allocations', values: [string, string]): string
  encodeFunctionData(functionFragment: 'claim', values: [string]): string
  encodeFunctionData(functionFragment: 'claimFor', values: [string, string]): string
  encodeFunctionData(functionFragment: 'getClaimable', values: [string, string]): string
  encodeFunctionData(functionFragment: 'getSchedule', values: [string]): string
  encodeFunctionData(functionFragment: 'maxMintAmount', values?: undefined): string
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string
  encodeFunctionData(functionFragment: 'renounceOwnership', values?: undefined): string
  encodeFunctionData(functionFragment: 'revokeAccount', values: [string, string]): string
  encodeFunctionData(functionFragment: 'startTime', values?: undefined): string
  encodeFunctionData(functionFragment: 'token', values?: undefined): string
  encodeFunctionData(functionFragment: 'totalMinted', values?: undefined): string
  encodeFunctionData(functionFragment: 'totalToBeMinted', values?: undefined): string
  encodeFunctionData(functionFragment: 'transferOwnership', values: [string]): string
  encodeFunctionData(functionFragment: 'updateStartTime', values: [BigNumberish]): string

  decodeFunctionResult(functionFragment: 'MULTIPLIER', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'addAllocations', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'addSchedule', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'allocations', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'claim', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'claimFor', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getClaimable', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getSchedule', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'maxMintAmount', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'renounceOwnership', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'revokeAccount', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'startTime', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'token', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'totalMinted', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'totalToBeMinted', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'transferOwnership', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'updateStartTime', data: BytesLike): Result

  events: {
    'AllocationAdded(address,uint128,string)': EventFragment
    'Claimed(address,uint128,string)': EventFragment
    'OwnershipTransferred(address,address)': EventFragment
    'ScheduleAdded(uint128[],uint128[],string)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'AllocationAdded'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'Claimed'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'OwnershipTransferred'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'ScheduleAdded'): EventFragment
}

export type AllocationAddedEvent = TypedEvent<
  [string, BigNumber, string] & {
    account: string
    amount: BigNumber
    scheduleName: string
  }
>

export type ClaimedEvent = TypedEvent<
  [string, BigNumber, string] & {
    account: string
    amount: BigNumber
    scheduleName: string
  }
>

export type OwnershipTransferredEvent = TypedEvent<[string, string] & { previousOwner: string; newOwner: string }>

export type ScheduleAddedEvent = TypedEvent<
  [BigNumber[], BigNumber[], string] & {
    durations: BigNumber[]
    percents: BigNumber[]
    name: string
  }
>

export class HoprDistributor extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this

  listeners(eventName?: string): Array<Listener>
  off(eventName: string, listener: Listener): this
  on(eventName: string, listener: Listener): this
  once(eventName: string, listener: Listener): this
  removeListener(eventName: string, listener: Listener): this
  removeAllListeners(eventName?: string): this

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>

  interface: HoprDistributorInterface

  functions: {
    MULTIPLIER(overrides?: CallOverrides): Promise<[BigNumber]>

    addAllocations(
      accounts: string[],
      amounts: BigNumberish[],
      scheduleName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    addSchedule(
      durations: BigNumberish[],
      percents: BigNumberish[],
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    allocations(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, boolean] & {
        amount: BigNumber
        claimed: BigNumber
        lastClaim: BigNumber
        revoked: boolean
      }
    >

    claim(
      scheduleName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    claimFor(
      account: string,
      scheduleName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    getClaimable(account: string, scheduleName: string, overrides?: CallOverrides): Promise<[BigNumber]>

    getSchedule(name: string, overrides?: CallOverrides): Promise<[BigNumber[], BigNumber[]]>

    maxMintAmount(overrides?: CallOverrides): Promise<[BigNumber]>

    owner(overrides?: CallOverrides): Promise<[string]>

    renounceOwnership(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>

    revokeAccount(
      account: string,
      scheduleName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    startTime(overrides?: CallOverrides): Promise<[BigNumber]>

    token(overrides?: CallOverrides): Promise<[string]>

    totalMinted(overrides?: CallOverrides): Promise<[BigNumber]>

    totalToBeMinted(overrides?: CallOverrides): Promise<[BigNumber]>

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>

    updateStartTime(
      _startTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>
  }

  MULTIPLIER(overrides?: CallOverrides): Promise<BigNumber>

  addAllocations(
    accounts: string[],
    amounts: BigNumberish[],
    scheduleName: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  addSchedule(
    durations: BigNumberish[],
    percents: BigNumberish[],
    name: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  allocations(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, boolean] & {
      amount: BigNumber
      claimed: BigNumber
      lastClaim: BigNumber
      revoked: boolean
    }
  >

  claim(scheduleName: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>

  claimFor(
    account: string,
    scheduleName: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  getClaimable(account: string, scheduleName: string, overrides?: CallOverrides): Promise<BigNumber>

  getSchedule(name: string, overrides?: CallOverrides): Promise<[BigNumber[], BigNumber[]]>

  maxMintAmount(overrides?: CallOverrides): Promise<BigNumber>

  owner(overrides?: CallOverrides): Promise<string>

  renounceOwnership(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>

  revokeAccount(
    account: string,
    scheduleName: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  startTime(overrides?: CallOverrides): Promise<BigNumber>

  token(overrides?: CallOverrides): Promise<string>

  totalMinted(overrides?: CallOverrides): Promise<BigNumber>

  totalToBeMinted(overrides?: CallOverrides): Promise<BigNumber>

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  updateStartTime(
    _startTime: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  callStatic: {
    MULTIPLIER(overrides?: CallOverrides): Promise<BigNumber>

    addAllocations(
      accounts: string[],
      amounts: BigNumberish[],
      scheduleName: string,
      overrides?: CallOverrides
    ): Promise<void>

    addSchedule(
      durations: BigNumberish[],
      percents: BigNumberish[],
      name: string,
      overrides?: CallOverrides
    ): Promise<void>

    allocations(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, boolean] & {
        amount: BigNumber
        claimed: BigNumber
        lastClaim: BigNumber
        revoked: boolean
      }
    >

    claim(scheduleName: string, overrides?: CallOverrides): Promise<void>

    claimFor(account: string, scheduleName: string, overrides?: CallOverrides): Promise<void>

    getClaimable(account: string, scheduleName: string, overrides?: CallOverrides): Promise<BigNumber>

    getSchedule(name: string, overrides?: CallOverrides): Promise<[BigNumber[], BigNumber[]]>

    maxMintAmount(overrides?: CallOverrides): Promise<BigNumber>

    owner(overrides?: CallOverrides): Promise<string>

    renounceOwnership(overrides?: CallOverrides): Promise<void>

    revokeAccount(account: string, scheduleName: string, overrides?: CallOverrides): Promise<void>

    startTime(overrides?: CallOverrides): Promise<BigNumber>

    token(overrides?: CallOverrides): Promise<string>

    totalMinted(overrides?: CallOverrides): Promise<BigNumber>

    totalToBeMinted(overrides?: CallOverrides): Promise<BigNumber>

    transferOwnership(newOwner: string, overrides?: CallOverrides): Promise<void>

    updateStartTime(_startTime: BigNumberish, overrides?: CallOverrides): Promise<void>
  }

  filters: {
    'AllocationAdded(address,uint128,string)'(
      account?: string | null,
      amount?: null,
      scheduleName?: null
    ): TypedEventFilter<[string, BigNumber, string], { account: string; amount: BigNumber; scheduleName: string }>

    AllocationAdded(
      account?: string | null,
      amount?: null,
      scheduleName?: null
    ): TypedEventFilter<[string, BigNumber, string], { account: string; amount: BigNumber; scheduleName: string }>

    'Claimed(address,uint128,string)'(
      account?: string | null,
      amount?: null,
      scheduleName?: null
    ): TypedEventFilter<[string, BigNumber, string], { account: string; amount: BigNumber; scheduleName: string }>

    Claimed(
      account?: string | null,
      amount?: null,
      scheduleName?: null
    ): TypedEventFilter<[string, BigNumber, string], { account: string; amount: BigNumber; scheduleName: string }>

    'OwnershipTransferred(address,address)'(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<[string, string], { previousOwner: string; newOwner: string }>

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<[string, string], { previousOwner: string; newOwner: string }>

    'ScheduleAdded(uint128[],uint128[],string)'(
      durations?: null,
      percents?: null,
      name?: null
    ): TypedEventFilter<
      [BigNumber[], BigNumber[], string],
      { durations: BigNumber[]; percents: BigNumber[]; name: string }
    >

    ScheduleAdded(
      durations?: null,
      percents?: null,
      name?: null
    ): TypedEventFilter<
      [BigNumber[], BigNumber[], string],
      { durations: BigNumber[]; percents: BigNumber[]; name: string }
    >
  }

  estimateGas: {
    MULTIPLIER(overrides?: CallOverrides): Promise<BigNumber>

    addAllocations(
      accounts: string[],
      amounts: BigNumberish[],
      scheduleName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    addSchedule(
      durations: BigNumberish[],
      percents: BigNumberish[],
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    allocations(arg0: string, arg1: string, overrides?: CallOverrides): Promise<BigNumber>

    claim(scheduleName: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>

    claimFor(
      account: string,
      scheduleName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    getClaimable(account: string, scheduleName: string, overrides?: CallOverrides): Promise<BigNumber>

    getSchedule(name: string, overrides?: CallOverrides): Promise<BigNumber>

    maxMintAmount(overrides?: CallOverrides): Promise<BigNumber>

    owner(overrides?: CallOverrides): Promise<BigNumber>

    renounceOwnership(overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>

    revokeAccount(
      account: string,
      scheduleName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>

    startTime(overrides?: CallOverrides): Promise<BigNumber>

    token(overrides?: CallOverrides): Promise<BigNumber>

    totalMinted(overrides?: CallOverrides): Promise<BigNumber>

    totalToBeMinted(overrides?: CallOverrides): Promise<BigNumber>

    transferOwnership(newOwner: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>

    updateStartTime(
      _startTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>
  }

  populateTransaction: {
    MULTIPLIER(overrides?: CallOverrides): Promise<PopulatedTransaction>

    addAllocations(
      accounts: string[],
      amounts: BigNumberish[],
      scheduleName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    addSchedule(
      durations: BigNumberish[],
      percents: BigNumberish[],
      name: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    allocations(arg0: string, arg1: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    claim(
      scheduleName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    claimFor(
      account: string,
      scheduleName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    getClaimable(account: string, scheduleName: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    getSchedule(name: string, overrides?: CallOverrides): Promise<PopulatedTransaction>

    maxMintAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>

    renounceOwnership(overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>

    revokeAccount(
      account: string,
      scheduleName: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    startTime(overrides?: CallOverrides): Promise<PopulatedTransaction>

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>

    totalMinted(overrides?: CallOverrides): Promise<PopulatedTransaction>

    totalToBeMinted(overrides?: CallOverrides): Promise<PopulatedTransaction>

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>

    updateStartTime(
      _startTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>
  }
}
