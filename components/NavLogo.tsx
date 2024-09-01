"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const NavLogo = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };
  return (
    <div className="flex justify-center mb-2 ">
      <Image
        src="/assets/images/logo-BG.png"
        alt="Logo"
        height={40}
        width={40}
        className="mt-10 cursor-pointer"
        onClick={handleClick}
      />
    </div>
  );
};

export default NavLogo;
