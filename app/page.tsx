"use client";
import NavLogo from "@/components/NavLogo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/search");
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-gray-200 py-4 px-2 overflow-x-hidden">
      <h2 className="text-2xl text-green-300 text-center p-4 md:text-2xl lg:text-3xl md:p-6 lg:p-8 m-4">
        &quot;When you give blood, you give hope, strength, and a chance at
        life.&quot;
      </h2>
      <div className="max-w-sm mx-4 mt-4 p-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-xl border border-gray-700 md:max-w-md lg:max-w-lg md:mx-6 lg:mx-8 md:mt-6 lg:mt-8 md:p-6 lg:p-8">
        <h2 className="text-2xl font-semibold text-white text-center mb-4 md:text-3xl lg:text-4xl md:mb-6 lg:mb-8">
          FASHCARE-LifeLink
        </h2>
        <p className="text-gray-300 text-center mb-4 text-sm opacity-50 md:text-base lg:text-lg md:opacity-75 lg:opacity-80">
        FASHCARE-LifeLink is an open-source web application dedicated to
          simplifying blood donation. Register your blood group, search for
          donors, and check your eligibility to donate. Join us to connect
          donors and recipients, saving lives with ease.
        </p>
      </div>

      <div className="mt-6 grid text-center gap-4 md:gap-6 lg:gap-8">
        <div className="flex justify-center items-center group rounded-lg border-transparent px-4 py-4 transition-colors hover:opacity-100 hover:text-gray-400 border-2 duration-300 md:px-6 md:py-6 lg:px-8 lg:py-8">
          <a href="/register" rel="noopener noreferrer">
            <h2 className="mb-2 text-xl font-bold md:text-2xl lg:text-3xl">
              Register{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 text-sm opacity-50 md:text-base lg:text-lg md:opacity-75 lg:opacity-80">
              Register Your Blood Group
            </p>
          </a>
        </div>

        <div className="relative flex items-center justify-center flex-grow">
        <Image
          src="/assets/images/b10.png"
          height={500} // Adjust height as needed
          width={500} // Adjust width as needed
          alt="center-image"
          className="object-cover"
        />
        {/* Signature Styled Heading with Looping Animation */}
        <a href="/search" rel="noopener noreferrer">
        <h1 className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-6 text-xl font-bold pr-10 italic animate-slide-in-fade-in-loop"
            style={{ top: 'calc(50% - 30px)' }}
        >
          Search{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
        </h1></a>
        
      </div>

        <div className="flex justify-center items-center group rounded-lg border border-transparent px-4 py-4 transition-colors hover:text-gray-400 md:px-6 md:py-6 lg:px-8 lg:py-8">
          <a href="/eligible" rel="noopener noreferrer">
            <h2 className="mb-2 text-xl font-bold md:text-2xl lg:text-3xl">
              Eligibility{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 text-sm opacity-50 md:text-base lg:text-lg md:opacity-75 lg:opacity-80">
              Check if you are eligible to donate blood or not
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
