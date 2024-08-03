"use client"

import { prepareContractCall, ThirdwebContract } from "thirdweb"
import { useSendTransaction, useActiveAccount } from "thirdweb/react";
import { ethers } from 'ethers';
import { createContext, useContext } from 'react'

import { contract } from '@/app/constants'
import { Campaign } from "@/app/utils";
import { useGetCampaigns, useGetDonations } from "./readCalls";

interface ICryptoContext {
  address: string | undefined;
  contract: ThirdwebContract<any>;
  createCampaign: Function;
  getCampaigns: Campaign[];
  getUserCampaigns: Function;
  donate: Function;
  getDonations: Function;
  getCampaignByTitle: Function;
}
const CryptoContext = createContext<ICryptoContext | undefined>(undefined)

const CryptoContextProvider = ({ children }: { children: React.ReactNode }) => {

  const account = useActiveAccount()
  const { mutate: sendTransaction } = useSendTransaction();


  const publishCampaign = async (form: any) => {
    try {
      const transaction: any = prepareContractCall({
        contract,
        method: "createCampaign",
        params: [
          account?.address!, // owner
          form.title, // title
          form.description, // description
          form.target,
          BigInt(new Date(form.deadline).getTime()), // deadline,
          form.image,]
      });
      sendTransaction(transaction);

      // console.log("contract call success", transaction.data)
    } catch (error) {
      // console.log("contract call failure", error)
    }
  }

  const getCampaigns: Campaign[] = useGetCampaigns()

  const getCampaignByTitle = (title: string): Campaign => {
    const campaign = getCampaigns?.filter((cam) => cam.title === title);
    return campaign![0];
  }


  const getUserCampaigns = (): Campaign[] => {
    const allCampaigns = getCampaigns!;

    const filteredCampaigns = allCampaigns?.filter((campaign) => campaign.owner === account?.address);

    return filteredCampaigns;
  }


  const donate = async (pId: number, amount: string) => {
    try {
      const transaction: any = prepareContractCall({
        contract,
        method: "donateToCampaign",
        params: [BigInt(pId)],
        value: ethers.parseEther(amount)
      });
      sendTransaction(transaction);
      return transaction.data;
    } catch (error) {

    }

  }

  const getDonations = async (pId: number | bigint) => useGetDonations(pId)

  return (
    <CryptoContext.Provider
      value={{
        address: account?.address,
        contract,
        getCampaigns,
        createCampaign: publishCampaign,
        getUserCampaigns,
        donate,
        getDonations,
        getCampaignByTitle
      }}
    >
      {children}
    </CryptoContext.Provider>
  )
}

export const useCryptoContext = () => useContext(CryptoContext)

export default CryptoContextProvider