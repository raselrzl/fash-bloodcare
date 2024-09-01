"use client";
import { useParams } from "next/navigation";
import NavigationLink from "@/components/NavigationLink";
import Image from "next/image";
import React from "react";

const Success = () => {
  const params = useParams();

  // Decode URL parameters
  const username = Array.isArray(params.name)
    ? decodeURIComponent(params.name.join(" "))
    : decodeURIComponent(params.name);

  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen bg-black px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
      {/* Existing Content */}
      <div className="flex flex-col items-center justify-center mb-4">
        <Image
          src="/assets/images/success.gif"
          height={300}
          width={280}
          alt="success"
        />
        <h2 className="header mb-4 px-10 max-w-[600px] text-center text-white">
          Welcome <span className="text-green-500 uppercase bold">{username}. <br/> <br/></span> Your <span className="text-red-500">Blood Group</span> has been
          successfully registered. Thank you for being a part of
          this life-saving initiative! If you&apos;d like to make sure if your name in the
          list, please search and.
        </h2>
      </div>

      {/* Centered Image with Positioned Heading */}
      <div className="relative flex items-center justify-center flex-grow">
        <Image
          src="/assets/images/b10.png"
          height={500} // Adjust height as needed
          width={500} // Adjust width as needed
          alt="center-image"
          className="object-cover"
        />
        {/* Signature Styled Heading with Looping Animation */}
        <h1 className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-6 text-xl font-light pr-10 italic animate-slide-in-fade-in-loop"
            style={{ top: 'calc(50% - 30px)' }}
        >
          <span className="text-red-500 bold">{username}</span>
        </h1>
      </div>

      {/* Navigation Link */}
      <NavigationLink />
    </div>
  );
};

export default Success;
