import React from 'react'

import {Link} from 'react-router-dom'

export default function Submitted(){
    return(
        <div className='submitted-pg text-center'>
            <h1 className='text-2xl font-bold py-6'>Workout Submitted!</h1>
            <Link to="/addworkout" className='add-workout-btn'>Add Another Workout</Link>
            <br/>
            <Link to="/log" className='view-log-btn'>View Log</Link>
        </div>
    )
}