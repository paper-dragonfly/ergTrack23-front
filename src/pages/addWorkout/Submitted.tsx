import React from 'react'

import {Link} from 'react-router-dom'

export default function Submitted(){
    return(
        <div className='submitted-pg flex flex-col justify-between text-center'>
            <h1 className='text-2xl font-bold py-6 gap-10'>Workout Submitted!</h1>
            {/* self-center on buttons keeps them from expanding the whole width of page */}
            <Link to="/log" className='btn self-center'>View Log</Link>
            <br/>
            <Link to="/addworkout" className='btn coral self-center'>Add Another Workout</Link>
          
            
        </div>
    )
}