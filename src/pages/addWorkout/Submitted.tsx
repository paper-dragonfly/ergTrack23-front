import React from 'react'

import {Link} from 'react-router-dom'

export default function Submitted(){
    return(
        <div className='submitted-pg'>
            <h1>Workout Submitted</h1>
            <Link to="/addworkout">Add Another Workout</Link>
            <br/>
            <Link to="/log">View Log</Link>
        </div>
    )
}