import React from 'react'

import {Link} from 'react-router-dom'

export default function FailFdbk(){
    return(
        <div className='submitted-pg flex flex-col justify-between text-center'>
            <h1 className='text-2xl font-bold py-6 gap-10'>Feedback submission Failed</h1>
            {/* self-center on buttons keeps them from expanding the whole width of page */}
            <Link to="/feedback" className='btn gray self-center'>Feedback</Link>
            <Link to="/log" className='btn self-center'>View Log</Link>
            <br/>
            <Link to="/addworkout" className='btn coral self-center'>Add Workout</Link>   
        </div>
    )
}