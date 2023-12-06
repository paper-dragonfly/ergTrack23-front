import React, {useState} from 'react'
import { TypeWorkoutDTM } from '../utils/interfaces'
import { sumOfMeters, sumOfTime } from '../utils/helper'

export default function InfoCard(props: {metric: string, team: boolean, data:TypeWorkoutDTM[]}){
    
    const totalMeters = sumOfMeters(props.data)
    const totalTime = sumOfTime(props.data)

    return (
        <div>
            <h2>Total Meters</h2>
            <h3>{totalMeters}</h3>
            <br /> 
            <h2>Total Time</h2>
            <h3>{totalTime}</h3>
        </div>
    )
}