"use client"

import { useState, useEffect } from 'react'

import { DisplayCampaigns } from '@/app/components';
import { useCryptoContext } from '@/app/context';
import { Campaign,  } from '@/app/utils'
import React from 'react';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const { address, contract, getUserCampaigns } = useCryptoContext()!;

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data!);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Profile