"use client"
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Weather(){
    const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [cloudDescription, setCloudDescription] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLatitude(position.coords.latitude.toFixed(2)); // Convert latitude to 2 decimal places
        setLongitude(position.coords.longitude.toFixed(2)); // Convert longitude to 2 decimal places
      });
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      // Make an API request with the obtained latitude and longitude
      const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {
          q: `${latitude},${longitude}`
        },
        headers: {
          'X-RapidAPI-Key': '5bfba08a28msh8e644956c9503c5p1eafc6jsnac429ee7861f',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };

      axios.request(options)
        .then(response => {
          setWeatherData(response.data);

          // Determine cloud description based on cloud percentage
          const cloudPercentage = response.data.current.cloud;
          if (cloudPercentage >= 30 && cloudPercentage < 60) {
            setCloudDescription("Partly cloudy");
          } else if (cloudPercentage >= 60 && cloudPercentage < 70) {
            setCloudDescription("Partly sunny");
          } else if (cloudPercentage >= 70 && cloudPercentage < 90) {
            setCloudDescription("Mostly cloudy");
          } else if (cloudPercentage >= 90 && cloudPercentage <= 100) {
            setCloudDescription("Overcast");
          } else {
            setCloudDescription("Unknown");
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [latitude, longitude]);

    return(
        <>
            {weatherData ? (
                <div className="border-b border-[#E9EEF9] py-7 px-10 flex items-center gap-3 text-[#09324D]">
                    <Image src={`/Images/${cloudDescription}.svg`} alt='Luna' width={50} height={0} className="md:w-[3vw]"/>
                    <h1 className="text-4xl font-semibold">{weatherData.current.feelslike_c}<sup>°</sup></h1>
                    <div>
                    <h1 className="font-semibold md:text-lg">{cloudDescription}</h1>
                    <p className="text-[#A1AFBB] text-sm md:text-base">{new Date(weatherData.location.localtime_epoch * 1000).toLocaleString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'})}</p>
                    </div>
                </div>
                ) : (
                <div className="border-b border-[#E9EEF9] py-7 px-10 flex items-center gap-3 text-[#09324D]">
                    <div className="bg-[#e0e0e0] rounded-full animate-pulse h-[50px] aspect-square"/>
                    <div className="flex flex-col gap-2">
                    <div className="bg-[#e0e0e0] rounded-full animate-pulse h-[10px] w-[60px]"/>
                    <div className="bg-[#e0e0e0] rounded-full animate-pulse h-[10px] w-[90px]"/>
                    </div>
                </div>
            )}
        </>
    )
}