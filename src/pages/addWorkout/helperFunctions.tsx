import { stringify } from 'querystring';
import React from 'react'
import { TypesWorkoutInfo, TypesWorkoutMetrics } from './interfaces';


const d = {
    workoutName: "",
    workoutDate: "",
    time: [],
    meter: [],
    split:  [],
    sr: [],
    hr: [], 
}

const  info ={
    entryMethod: "manual",
    workoutType:"singleDist",
    workoutLength:"2000m",
    customLength:"",
    subWorkouts: "",
    ergImg: null, 
}

export function generateWorkoutName(workoutInfo: TypesWorkoutInfo): string{
    let workoutName = "";
    if(workoutInfo.workoutType === 'singleDist'){
        workoutName = workoutInfo.customLength ? workoutInfo.customLength.toString() +'m' : workoutInfo.workoutLength
    } else if(workoutInfo.workoutType === 'singleTime'){
        workoutName = workoutInfo.customLength ? workoutInfo.customLength.toString()+' min': workoutInfo.workoutLength
    } else if(workoutInfo.workoutType === 'intervalDist'){
        workoutName = workoutInfo.customLength ? 
            workoutInfo.subWorkouts.toString() +'x' + workoutInfo.customLength.toString() +'m' : 
            workoutInfo.subWorkouts.toString() +'x' + workoutInfo.workoutLength
    }else if(workoutInfo.workoutType  === 'intervalTime'){
        workoutName = workoutInfo.customLength ? 
            workoutInfo.subWorkouts.toString() +'x' + workoutInfo.customLength.toString() : 
            workoutInfo.subWorkouts.toString() +'x' + workoutInfo.workoutLength
    }

    
    return workoutName
}

