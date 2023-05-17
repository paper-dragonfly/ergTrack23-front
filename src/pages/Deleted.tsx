import React from 'react'

import {Link} from 'react-router-dom'

export default function Deleted(){
    return(
        <div className='deleted-pg'>
            <h1>Workout Deleted!</h1>
            <Link to="/addworkout">Add Workout</Link>
            <br/>
            <Link to="/log">Back to Log</Link>
        </div>
    )
}