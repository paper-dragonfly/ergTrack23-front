import React from 'react'
import desktopHero from "../assets/heroDesktop2.jpg"
import fmJosh from '../assets/fmJosh.jpg'
import { BsCamera, BsUpload, BsPencil, BsCheck2 } from "react-icons/bs"
import { GrTable } from "react-icons/gr"


export default function Home(){
    console.log('running Home')
    const screenWidth = window.innerWidth
    return(
        <div>
        {/* <section style={{ 
                    backgroundImage: `url(${bgHero})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    width:'100vw',
                    height:'auto'
                  }}> */}
            {screenWidth <= 768? <img src={fmJosh} alt="woman on erg machine" className='w-full max-h-screen '/> :<img src={desktopHero} alt="woman on erg machine" className='w-full max-h-screen '/>}
            {/* <h1 className="text-xl font-bold text-center text-textWhite pt-6 md:text-2xl"
                >Welcome to ergTrack </h1> */}
             {/* </section> */}
            <h2 className="text-2xl font-bold text-center pt-6">How it Works</h2>
            <ul className="flex justify-between flex-wrap p-4 md:justify-center md:space-x-10">
                <li className="flex flex-col items-center text-center gap-2 w-20  pb-6"><BsCamera size={50} />Snap a photo</li>
                <li className="flex flex-col items-center text-center gap-2 w-20  pb-6"><BsUpload size={50} />Upload to ergTrack</li>
                <li className="flex flex-col items-center text-center gap-2 w-20  pb-6"><BsPencil size={50} />Touch up</li>
                <li className="flex flex-col items-center text-center gap-2 w-20  pb-6"><BsCheck2 size={50} />Save</li>
                <li className="flex flex-col items-center text-center gap-2 w-full"><GrTable size=   {50} />View, filter, and compare workouts <br /> in your ergTrack Log</li>
            </ul>
        
        </div>
    )
}