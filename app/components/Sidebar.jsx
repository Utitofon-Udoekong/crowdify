"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

import { logo, sun } from '@/app/assets';
import { navlinks } from '@/app/constants';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#2c2f32]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
    {!isActive ? (
      <Image src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <Image src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
    )}
  </div>
)

const Sidebar = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState('dashboard');
  const currentPath = usePathname()

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link href="/dashboard">
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((navLink) => (
            <Link href={navLink.link}>
              <Icon 
                key={navLink.name}
                {...navLink}
                isActive={isActive}
                handleClick={() => {
                  if(!navLink.disabled) {
                    setIsActive(navLink.name);
                    // router.push(navLink.link);
                  }
                }}
              />
            </Link>
          ))}
        </div>

        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  )
}

export default Sidebar