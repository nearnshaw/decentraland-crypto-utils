import * as eth from '../../../eth-connect/eth-connect'
import { getUserAccount } from '@decentraland/EthereumController'
import { getContract } from '../contract'
import { isApprovedForAll, setApprovalForAll } from 'src/erc721'

/**
 * Create an order, price in MANA (1 = 1 MANA)
 *
 * @param nftAddress NFT smartcontract address
 * @param assetId ID of the asset
 * @param price Price of the order
 * @param expireAt Time of expiring (default 1 month)
 */
export async function createOrder(
  nftAddress: eth.Address,
  assetId: number,
  price: number,
  expireAt: number = +new Date() / 1000 + 30 * 24 * 3600
) {
  const { contract } = await getContract()
  const fromAddress = await getUserAccount()

  const approval = await isApprovedForAll(nftAddress, fromAddress, contract.address)
  if(!approval) await setApprovalForAll(nftAddress, contract.address, true)

  const res = await contract.createOrder(
    nftAddress,
    assetId,
    eth.toWei(price, 'ether').toString(),
    expireAt,
    {
      from: fromAddress
    }
  )
  return res
}
