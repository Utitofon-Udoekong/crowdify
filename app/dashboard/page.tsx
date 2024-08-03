"use client"

import { useState, useEffect } from "react";
import { DisplayCampaigns } from "@/app/components";
import { Campaign } from "@/app/utils";
import { useCryptoContext } from "@/app/context";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const {getCampaigns, address, contract} = useCryptoContext()!
  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = getCampaigns;
    setIsLoading(false);
    setCampaigns(data);
  }

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);
  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}
