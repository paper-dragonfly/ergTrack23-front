import React from 'react'

import {Link} from 'react-router-dom'

export default function Deleted(){
    return(
        <div className='deleted-pg flex flex-col justify-between text-center'>
            <h1 className='text-2xl font-bold py-6 gap-10'>Workout Deleted!</h1>
            <Link to="/log"
            className='btn self-center'>Back to Log</Link>
            <br/>
            <Link to="/addworkout"
            className='btn coral self-center'>Add Workout</Link>
        </div>
    )
}