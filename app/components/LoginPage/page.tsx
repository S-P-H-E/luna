"use client"
import Image from 'next/image'
import { FaGoogle } from 'react-icons/fa'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { message } from 'antd';

export default function LoginPage(){
    return(
        <div className="h-[100dvh] flex justify-center items-center">
            <div className="flex justify-center items-center h-screen w-full">
            <div
              className="p-8 rounded-lg flex flex-col justify-center items-center m-5 shadow-xl bg-white border text-black w-[400px]"
            >
              <Image src='/Images/luna.png' alt='Luna' width={40} height={0}/>
              <h1 className="text-4xl font-medium my-5">LUNA</h1>
              <p className="mb-5 text-[#777777] text-center">Sign in to begin chatting</p>
              <button
                className="bg-black transition-all duration-300 hover:shadow-xl rounded-lg px-4 py-2 text-white font-medium flex justify-center items-center gap-1"
                
              >
                <FaGoogle />
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
    )
}