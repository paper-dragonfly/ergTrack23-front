import React from 'react'
import { TypesWorkoutInfo } from '../../utils/interfaces';


export function generateWorkoutName(workoutInfo: TypesWorkoutInfo): string{
    let workoutName = "";
    if(workoutInfo.workoutType === 'singleDist'){
        workoutName = workoutInfo.customLength ? workoutInfo.customLength.toString() +'m' : workoutInfo.workoutLength
    } else if(workoutInfo.workoutType === 'singleTime'){
        workoutName = workoutInfo.customLength ? workoutInfo.customLength.toString()+' min': workoutInfo.workoutLength
    } else if(workoutInfo.workoutType === 'intervalDist'){
        workoutName = workoutInfo.customLength ? 
            workoutInfo.subWorkouts.toString() +'x' + workoutInfo.customLength.toString() +'m' + '/' + workoutInfo.rest + 'r' : 
            workoutInfo.subWorkouts.toString() +'x' + workoutInfo.workoutLength + '/' + workoutInfo.rest + 'r'
    }else if(workoutInfo.workoutType  === 'intervalTime'){
        workoutName = workoutInfo.customLength ? 
            workoutInfo.subWorkouts.toString() +'x' + workoutInfo.customLength.toString() + '/' + workoutInfo.rest + 'r' : 
            workoutInfo.subWorkouts.toString() +'x' + workoutInfo.workoutLength + '/' + workoutInfo.rest + 'r'
    }

    
    return workoutName
}

export function reformat_date(date:string) : string{
    // convert date from MMM DD YYYY format (jan 03 2022)-> YYYY-MM-DD
    const dateTrimmed = new Date(date.trim())
    const dateFormatted = dateTrimmed.toISOString().substring(0,10)
    return dateFormatted 

}

export function getTodaysDate() {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = new Date().toLocaleDateString('en-US', options);
    console.log(formattedDate.toString());
    return formattedDate.toString()
}

