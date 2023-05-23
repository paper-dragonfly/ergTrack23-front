import React from 'react'
import ergWelcome from '../assets/ergWelcome.png'


export default function Dashboard(){
    console.log('runningg Dashboard')

    // <h1 className='text-xl text-center font-bold mt-6'>Welcome to ergTrack {userName}</h1>
    const userName = ''
    return(
        <div>
            <img src={ergWelcome} alt="Two people on ergs next to water" />
            <h1 className='text-2xl mt-6 text-green text-center md:text-5xl md:mt-10'>Welcome {userName}</h1>
        </div>
    )
}