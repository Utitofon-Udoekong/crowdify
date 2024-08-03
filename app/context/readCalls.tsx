import { ethers } from "ethers";
import { useReadContract } from "thirdweb/react";
import { contract } from "../constants";

export const useGetCampaigns = () => {

  const { data: campaigns, error } = useReadContract({
    contract,
    method: "getCampaigns",
    params: [],
  });


  if (error) {
    // console.error("contract call failure", error);
    return [];
  }

  const parsedCampaigns = campaigns?.map((campaign, i) => ({
    owner: campaign.owner,
    title: campaign.title,
    description: campaign.description,
    target: ethers.formatEther(campaign.target.toString()),
    deadline: Number(campaign.deadline),
    amountCollected: ethers.formatEther(campaign.amountCollected.toString()),
    image: campaign.image,
    pId: i
  }));


  return parsedCampaigns ?? [];
};

export const useGetDonations = (pId: number | bigint) => {
  const { data: donations } = useReadContract({
    contract,
    method: "getDonators",
    params: [BigInt(pId)]
  });

  const numberOfDonations = donations![0].length;

  const parsedDonations = [];

  for (let i = 0; i < numberOfDonations; i++) {
    parsedDonations.push({
      donator: donations![0][i],
      donation: ethers.formatEther(donations![1][i].toString())
    })
  }

  return parsedDonations;
}