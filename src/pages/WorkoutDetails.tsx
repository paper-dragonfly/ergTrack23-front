import React, {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

export default function WorkoutDetails(){
    const location  = useLocation()
    const workoutDetails = location.state 
    console.log(workoutDetails)
    
    return (
        <div className='wo-details-div'>
            <h1>
                Workout Details 
            </h1>
            <p>{`${workoutDetails}`}</p>
        </div>
    )
}