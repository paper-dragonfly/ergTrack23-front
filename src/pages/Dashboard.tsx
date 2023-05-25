import React from 'react'
import {Link} from 'react-router-dom'
import ergWelcome from '../assets/ergWelcome.png'


export default function Dashboard(){
    console.log('runningg Dashboard')

    // <h1 className='text-xl text-center font-bold mt-6'>Welcome to ergTrack {userName}</h1>
    const userName = sessionStorage.getItem('userName')
    return(
        <div className='dashboard-pg flex flex-col justify-between text-center'>
            <img src={ergWelcome} alt="Two people on ergs next to water" />
            <h1 className='text-2xl mt-6 text-green text-center md:text-5xl md:mt-10'>Welcome {userName}</h1>
            <div className='flex flex-row justify-around align-center text-center '>
                {/* self-center on buttons keeps them from expanding the whole width of page */}
                <Link to="/addworkout" className='btn coral self-center'>Add Workout</Link>
                <Link to="/log" className='btn self-center'>View Log</Link>
            </div>   
        </div>
    )
}
