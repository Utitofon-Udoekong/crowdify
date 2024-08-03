"use client"
import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, } from 'next/navigation';
import { ethers } from "ethers";
import FundCard from './FundCard';
import { loader } from '@/app/assets';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const router = useRouter();

  const handleNavigate = (campaign) => {
    router.push(`/dashboard/campaign-details/${campaign.title}`)
  }
  
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <Image src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => 
          <Link href={`/dashboard/campaign-details/${campaign.title}`}>
            <FundCard 
              key={ethers.uuidV4(ethers.toUtf8Bytes("ALLMAGAFORMERAH"))}
              {...campaign}
              // handleClick={() => handleNavigate(campaign)}
            />
          </Link>
        )}
      </div>
    </div>
  )
}

export default DisplayCampaigns