import React from 'react'
import {Link} from 'react-router-dom'


export default function Dashboard(){
    console.log('runningg Dashboard')

    // <h1 className='text-xl text-center font-bold mt-6'>Welcome to ergTrack {userName}</h1>
    const userName = sessionStorage.getItem('userName')
    return(
        <div className='dashboard-pg flex flex-col justify-between text-center'>
            <h1 className='text-2xl my-6 text-black text-center md:text-5xl md:mt-10'>Welcome {userName}</h1>
            <div className='flex justify-center gap-8'>
                {/* self-center on buttons keeps them from expanding the whole width of page */}
                <Link to="/addworkout" className='btn  self-center'>Add Workout</Link>
                <Link to="/log" className='btn self-center'>View Log</Link>
            </div>  
            {/* <img src={erg_cartoon} alt="Two people on ergs next to water" /> */}
        </div>
    )
}
