"use client"
import React, { useRef, useEffect } from 'react';
import Image from "next/image";
import Weather from "./components/Weather/page";
import clsx from "clsx"
import { useChat } from 'ai/react'
import { FaRegStopCircle } from "react-icons/fa";
import { HiOutlineRefresh } from "react-icons/hi";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop, reload } = useChat()

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleReload = (event: React.MouseEvent<HTMLButtonElement>) => {
    reload
  };

  return (
    <>
      <div>
        <Weather />
      </div>
      <div className="h-[100dvh] flex flex-col w-[80vw] mx-auto text-white p-10">
        {messages.length === 0 && (
          <div className='flex flex-col gap-6 items-center justify-center w-full h-full'>
            <Image src='/Images/luna.png' alt='Luna' width={40} height={0}/>
            <h1 className='text-4xl font-semibold text-[#5C5A62]'>How can I help you?</h1>
          </div>
        )}
        <div className="flex flex-col gap-10 max-h-[50vh]"  ref={messagesEndRef}>
          {messages.map(m => (
            <div className="flex gap-3" key={m.id}>
              <div className="w-fit">
                <Image src={m.role === "user" ? "/Images/user.png" : "/Images/luna.png"} alt='profile' width={30} height={0}/>
              </div>
              <div className="w-full items-start">
                <p className={clsx(m.role == "user" ? "font-medium" : "text-[#5B5962]")}>{m.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    
      {/* Input */}
      <div className="fixed bottom-0 w-full p-10 text-white">
        <form onSubmit={handleSubmit}>
          <div className="bg-[#1C1C1F] border-2 border-[#1E1E21] rounded-2xl p-5 shadow-md flex flex-col gap-4 items-center w-[80vw] mx-auto">
            <div className='w-full'>
              {isLoading ? (
                <button className="text-[#5F5D65] shadow p-2 rounded-md bg-[#202022]" onClick={stop}>
                  <FaRegStopCircle size={20}/>
                </button>
              ):null}

              {!isLoading && (
                <button className="text-[#5F5D65] shadow p-2 rounded-md bg-[#202022]" onClick={handleReload}>
                  <HiOutlineRefresh size={20}/>
                </button>
              )}
            </div>
            <div className='flex gap-3 w-full'>
              <div>
                <Image src='/Images/user.png' alt='user' width={30} height={0}/>
              </div>
              <input placeholder="Message Luna..." className="bg-transparent placeholder:text-[#9F9FA5] outline-none w-full" value={input} onChange={handleInputChange} disabled={isLoading}/>
            </div>
          </div>
        </form>
      </div>
      
    </>
  )
}

{/* {messages.map(m => (
              <div key={m.id} className={clsx("flex w-full p-5", m.role === "user" ? "justify-end" : "justify-start")}>
                <div className={clsx("shadow-lg border p-4 w-fit max-w-[600px]", m.role === "user" ? "rounded-t-xl rounded-l-xl" : "rounded-b-xl rounded-r-xl")}>
                  <h1 className={clsx("font-medium capitalize", m.role === "user" ? "text-[#F7A3DD]" : "text-[#429FF0]")}>{m.role === "user" ? "You" : "Luna"}</h1>
                  <p>{m.content}</p>
                </div>
              </div>
            ))} */}