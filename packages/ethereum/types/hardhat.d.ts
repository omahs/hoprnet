/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from 'ethers'
import { FactoryOptions, HardhatEthersHelpers as HardhatEthersHelpersBase } from '@nomiclabs/hardhat-ethers/types'

import * as Contracts from '.'

declare module 'hardhat/types/runtime' {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: 'AccessControl',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControl__factory>
    getContractFactory(
      name: 'Ownable',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>
    getContractFactory(
      name: 'ERC1820Implementer',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1820Implementer__factory>
    getContractFactory(
      name: 'IERC1820Implementer',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1820Implementer__factory>
    getContractFactory(
      name: 'IERC1820Registry',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1820Registry__factory>
    getContractFactory(
      name: 'IERC20',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>
    getContractFactory(
      name: 'ERC777',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC777__factory>
    getContractFactory(
      name: 'IERC777',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC777__factory>
    getContractFactory(
      name: 'IERC777Recipient',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC777Recipient__factory>
    getContractFactory(
      name: 'IERC777Sender',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC777Sender__factory>
    getContractFactory(
      name: 'ReentrancyGuard',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ReentrancyGuard__factory>
    getContractFactory(
      name: 'Ownable',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>
    getContractFactory(
      name: 'IERC20',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>
    getContractFactory(
      name: 'IERC777Recipient',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC777Recipient__factory>
    getContractFactory(
      name: 'ERC1820Implementer',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1820Implementer__factory>
    getContractFactory(
      name: 'IERC1820Implementer',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1820Implementer__factory>
    getContractFactory(
      name: 'IERC1820Registry',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1820Registry__factory>
    getContractFactory(
      name: 'Multicall',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Multicall__factory>
    getContractFactory(
      name: 'ERC777Snapshot',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC777Snapshot__factory>
    getContractFactory(
      name: 'HoprChannels',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.HoprChannels__factory>
    getContractFactory(
      name: 'HoprDistributor',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.HoprDistributor__factory>
    getContractFactory(
      name: 'HoprForwarder',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.HoprForwarder__factory>
    getContractFactory(
      name: 'HoprToken',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.HoprToken__factory>
    getContractFactory(
      name: 'HoprWrapper',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.HoprWrapper__factory>
    getContractFactory(
      name: 'HoprWrapperProxy',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.HoprWrapperProxy__factory>
    getContractFactory(
      name: 'IERC677',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC677__factory>
    getContractFactory(
      name: 'ChannelsMock',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ChannelsMock__factory>
    getContractFactory(
      name: 'ERC777Mock',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC777Mock__factory>
    getContractFactory(
      name: 'ERC777SenderRecipientMock',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC777SenderRecipientMock__factory>
    getContractFactory(
      name: 'ERC777SnapshotMock',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC777SnapshotMock__factory>
    getContractFactory(
      name: 'ERC777',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC777__factory>
    getContractFactory(
      name: 'BasicToken',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BasicToken__factory>
    getContractFactory(
      name: 'BurnableToken',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BurnableToken__factory>
    getContractFactory(
      name: 'DetailedERC20',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DetailedERC20__factory>
    getContractFactory(
      name: 'ERC20',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>
    getContractFactory(
      name: 'ERC20Basic',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Basic__factory>
    getContractFactory(
      name: 'ERC677',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC677__factory>
    getContractFactory(
      name: 'ERC677BridgeToken',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC677BridgeToken__factory>
    getContractFactory(
      name: 'IBurnableMintableERC677Token',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBurnableMintableERC677Token__factory>
    getContractFactory(
      name: 'LegacyERC20',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LegacyERC20__factory>
    getContractFactory(
      name: 'MintableToken',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MintableToken__factory>
    getContractFactory(
      name: 'Ownable',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>
    getContractFactory(
      name: 'PermittableToken',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PermittableToken__factory>
    getContractFactory(
      name: 'Sacrifice',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Sacrifice__factory>
    getContractFactory(
      name: 'StandardToken',
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StandardToken__factory>

    getContractAt(name: 'AccessControl', address: string, signer?: ethers.Signer): Promise<Contracts.AccessControl>
    getContractAt(name: 'Ownable', address: string, signer?: ethers.Signer): Promise<Contracts.Ownable>
    getContractAt(
      name: 'ERC1820Implementer',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1820Implementer>
    getContractAt(
      name: 'IERC1820Implementer',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1820Implementer>
    getContractAt(
      name: 'IERC1820Registry',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1820Registry>
    getContractAt(name: 'IERC20', address: string, signer?: ethers.Signer): Promise<Contracts.IERC20>
    getContractAt(name: 'ERC777', address: string, signer?: ethers.Signer): Promise<Contracts.ERC777>
    getContractAt(name: 'IERC777', address: string, signer?: ethers.Signer): Promise<Contracts.IERC777>
    getContractAt(
      name: 'IERC777Recipient',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC777Recipient>
    getContractAt(name: 'IERC777Sender', address: string, signer?: ethers.Signer): Promise<Contracts.IERC777Sender>
    getContractAt(name: 'ReentrancyGuard', address: string, signer?: ethers.Signer): Promise<Contracts.ReentrancyGuard>
    getContractAt(name: 'Ownable', address: string, signer?: ethers.Signer): Promise<Contracts.Ownable>
    getContractAt(name: 'IERC20', address: string, signer?: ethers.Signer): Promise<Contracts.IERC20>
    getContractAt(
      name: 'IERC777Recipient',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC777Recipient>
    getContractAt(
      name: 'ERC1820Implementer',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1820Implementer>
    getContractAt(
      name: 'IERC1820Implementer',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1820Implementer>
    getContractAt(
      name: 'IERC1820Registry',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1820Registry>
    getContractAt(name: 'Multicall', address: string, signer?: ethers.Signer): Promise<Contracts.Multicall>
    getContractAt(name: 'ERC777Snapshot', address: string, signer?: ethers.Signer): Promise<Contracts.ERC777Snapshot>
    getContractAt(name: 'HoprChannels', address: string, signer?: ethers.Signer): Promise<Contracts.HoprChannels>
    getContractAt(name: 'HoprDistributor', address: string, signer?: ethers.Signer): Promise<Contracts.HoprDistributor>
    getContractAt(name: 'HoprForwarder', address: string, signer?: ethers.Signer): Promise<Contracts.HoprForwarder>
    getContractAt(name: 'HoprToken', address: string, signer?: ethers.Signer): Promise<Contracts.HoprToken>
    getContractAt(name: 'HoprWrapper', address: string, signer?: ethers.Signer): Promise<Contracts.HoprWrapper>
    getContractAt(
      name: 'HoprWrapperProxy',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.HoprWrapperProxy>
    getContractAt(name: 'IERC677', address: string, signer?: ethers.Signer): Promise<Contracts.IERC677>
    getContractAt(name: 'ChannelsMock', address: string, signer?: ethers.Signer): Promise<Contracts.ChannelsMock>
    getContractAt(name: 'ERC777Mock', address: string, signer?: ethers.Signer): Promise<Contracts.ERC777Mock>
    getContractAt(
      name: 'ERC777SenderRecipientMock',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC777SenderRecipientMock>
    getContractAt(
      name: 'ERC777SnapshotMock',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC777SnapshotMock>
    getContractAt(name: 'ERC777', address: string, signer?: ethers.Signer): Promise<Contracts.ERC777>
    getContractAt(name: 'BasicToken', address: string, signer?: ethers.Signer): Promise<Contracts.BasicToken>
    getContractAt(name: 'BurnableToken', address: string, signer?: ethers.Signer): Promise<Contracts.BurnableToken>
    getContractAt(name: 'DetailedERC20', address: string, signer?: ethers.Signer): Promise<Contracts.DetailedERC20>
    getContractAt(name: 'ERC20', address: string, signer?: ethers.Signer): Promise<Contracts.ERC20>
    getContractAt(name: 'ERC20Basic', address: string, signer?: ethers.Signer): Promise<Contracts.ERC20Basic>
    getContractAt(name: 'ERC677', address: string, signer?: ethers.Signer): Promise<Contracts.ERC677>
    getContractAt(
      name: 'ERC677BridgeToken',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC677BridgeToken>
    getContractAt(
      name: 'IBurnableMintableERC677Token',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IBurnableMintableERC677Token>
    getContractAt(name: 'LegacyERC20', address: string, signer?: ethers.Signer): Promise<Contracts.LegacyERC20>
    getContractAt(name: 'MintableToken', address: string, signer?: ethers.Signer): Promise<Contracts.MintableToken>
    getContractAt(name: 'Ownable', address: string, signer?: ethers.Signer): Promise<Contracts.Ownable>
    getContractAt(
      name: 'PermittableToken',
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PermittableToken>
    getContractAt(name: 'Sacrifice', address: string, signer?: ethers.Signer): Promise<Contracts.Sacrifice>
    getContractAt(name: 'StandardToken', address: string, signer?: ethers.Signer): Promise<Contracts.StandardToken>

    // default types
    getContractFactory(name: string, signerOrOptions?: ethers.Signer | FactoryOptions): Promise<ethers.ContractFactory>
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>
    getContractAt(nameOrAbi: string | any[], address: string, signer?: ethers.Signer): Promise<ethers.Contract>
  }
}
