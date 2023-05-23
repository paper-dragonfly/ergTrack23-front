import React from 'react'
import { useOutletContext } from 'react-router-dom'
import bgHero from "../assets/hero.png"
import { BsCamera, BsUpload, BsPencil, BsCheck2 } from "react-icons/bs"
import { GrTable } from "react-icons/gr"


export default function Home(){
    console.log('running Home')
    return(
        <div>
            <h1 className="text-xl font-bold text-center text-textWhite pt-6 h-72 md:h-96 "
                style={{ 
                    backgroundImage: `url(${bgHero})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize:'cover'
                  }}>Welcome to ergTrack </h1>
            {/* <img src={bgHero} alt="" className="w-full"/> */}
            <h2 className="text-xl text-center pt-6">How it Works</h2>
            <ul className="flex justify-between flex-wrap p-4">
                <li className="flex flex-col items-center text-center gap-2 w-20  pb-6"><BsCamera size={50} />Snap a photo</li>
                <li className="flex flex-col items-center text-center gap-2 w-20  pb-6"><BsUpload size={50} />Upload to ergTrack</li>
                <li className="flex flex-col items-center text-center gap-2 w-20  pb-6"><BsPencil size={50} />Touch up</li>
                <li className="flex flex-col items-center text-center gap-2 w-20  pb-6"><BsCheck2 size={50} />Save</li>
                <li className="flex flex-col items-center text-center gap-2"><GrTable size=   {50} />View, filter, and compare workouts in your ergTrack Log</li>
            </ul>
        </div>
    )
}