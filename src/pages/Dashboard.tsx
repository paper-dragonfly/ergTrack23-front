import React from 'react'
import bgHero from "../assets/hero.png"

export default function Dashboard(){
    console.log('runningg Dashboard')

    // <h1 className='text-xl text-center font-bold mt-6'>Welcome to ergTrack {userName}</h1>
    const userName = ''
    return(
        <div> 
            <h1 className="text-xl font-bold text-center text-textWhite pt-6 h-72 md:h-96 "
                    style={{ 
                        backgroundImage: `url(${bgHero})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize:'cover'
                      }}>{userName} 
            </h1>
            <h2 className="text-center">Welcome to ergTrack</h2>
        </div>
    )
}