"use client"; // Ensure this line is present if you're using client-side features

import NavigationLink from '@/components/NavigationLink';
import Image from 'next/image';
import React from 'react';
import { FaTint, FaHeartbeat, FaSyringe, FaHandHoldingHeart } from 'react-icons/fa';

const Eligible: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center text-gray-200 py-8 px-2">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-red-500 mb-4">
            Am I Eligible to Donate Blood?
          </h1>
          <p className="text-lg text-gray-400">
            Discover if you`&apos;re eligible to donate blood and learn about the requirements for different types of donations.
          </p>
        </header>

        <section className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">
            Requirements by Donation Type
          </h2>
          <p className="text-md text-gray-400">
            To ensure the safety of both patients and donors, here are the requirements for different types of blood donations.
          </p>
        </section>

        <div className="flex flex-col gap-12 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {/* Whole Blood Donation */}
          <div className="p-6 space-y-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-xl border border-gray-700">
            <div className="flex items-center mb-4">
              <FaTint className="text-red-500 text-4xl mr-4" />
              <div>
                <h3 className="text-xl font-bold">Whole Blood Donation</h3>
              </div>
            </div>
            <img
              src="/assets/images/b1.webp"
              alt="Whole Blood Donation"
              className="w-full h-40 object-cover mb-4"
            />
            <ul className="list-disc list-inside text-sm space-y-2">
              <li>Donation frequency: Every 56 days, up to 6 times a year*</li>
              <li>You must be in good health and feeling well**</li>
              <li>You must be at least 16 years old in most states</li>
              <li>You must weigh at least 110 lbs</li>
            </ul>
          </div>

          {/* Power Red Donation */}
          <div className="p-6 space-y-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-xl border border-gray-700">
            <div className="flex items-center mb-4">
              <FaHeartbeat className="text-red-500 text-4xl mr-4" />
              <div>
                <h3 className="text-xl font-bold">Power Red Donation</h3>
              </div>
            </div>
            <img
              src="/assets/images/h11.png" 
              alt="Power Red Donation"
              className="w-full h-40 object-cover mb-4"
            />
            <ul className="list-disc list-inside text-sm space-y-2">
              <li>Donation frequency: Every 112 days, up to 3 times/year*</li>
              <li>You must be in good health and feeling well**</li>
              <li>Male donors+ must be at least 17 years old, at least 5&apos;1&apos;&apos; tall, and weigh at least 130 lbs</li>
              <li>Female donors+ must be at least 19 years old, at least 5&apos;3&apos;&apos; tall, and weigh at least 150 lbs</li>
            </ul>
          </div>

          {/* Platelet Donation */}
          <div className="p-6 space-y-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-xl border border-gray-700">
            <div className="flex items-center mb-4">
              <FaSyringe className="text-red-500 text-4xl mr-4" />
              <div>
                <h3 className="text-xl font-bold">Platelet Donation</h3>
              </div>
            </div>
            <img
              src="/assets/images/f2.jpg"
              alt="Platelet Donation"
              className="w-full h-40 object-cover mb-4"
            />
            <ul className="list-disc list-inside text-sm space-y-2">
              <li>Donation frequency: Every 7 days, up to 24 times/year*</li>
              <li>You must be in good health and feeling well**</li>
              <li>You must be at least 17 years old in most states</li>
              <li>You must weigh at least 110 lbs</li>
            </ul>
          </div>

          {/* AB Elite Plasma Donation */}
          <div className="p-6 space-y-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-xl border border-gray-700">
            <div className="flex items-center mb-4">
              <FaHandHoldingHeart className="text-red-500 text-4xl mr-4" />
              <div>
                <h3 className="text-xl font-bold">AB Elite Plasma Donation</h3>
              </div>
            </div>
            <img
              src="/assets/images/p2.webp"
              alt="AB Elite Plasma Donation"
              className="w-full h-40 object-cover mb-4"
            />
            <ul className="list-disc list-inside text-sm space-y-2">
              <li>Donation frequency: Every 28 days, up to 13 times/year*</li>
              <li>You must have type AB blood</li>
              <li>You must be in good health and feeling well**</li>
              <li>You must be at least 17 years old</li>
              <li>You must weigh at least 110 lbs</li>
            </ul>
          </div>
        </div>
      </div>
      <NavigationLink />
    </div>
  );
};

export default Eligible;
