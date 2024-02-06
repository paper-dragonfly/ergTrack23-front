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

function translate_month(date:string): string{
    // frentch, spanish, italian, german
    const months = {
        "Jan": ["Jan", "Ene", "Gen", "Jan"],
        "Feb": ["Fev", "Feb", "Feb", "Feb"],
        "Mar": ["Mar", "Mar", "Mar", "Mär"],
        "Apr": ["Avr", "Abr", "Apr", "Apr"],
        "May": ["Mai", "May", "Mag", "Mai"],
        "Jun": ["Jui", "Jun", "Giu", "Jun"],
        "Jul": ["Jui", "Jul", "Lug", "Jul"],
        "Aug": ["Aou", "Ago", "Ago", "Aug"],
        "Sep": ["Sep", "Sep", "Set", "Sep"],
        "Oct": ["Oct", "Oct", "Ott", "Okt"],
        "Nov": ["Nov", "Nov", "Nov", "Nov"],
        "Dec": ["Dec", "Dic", "Dic", "Dez"],
    };

    let cleanDate = date.trim() 
    let ergMonth = cleanDate.substring(0,3)
    if(!Object.keys(months).includes(ergMonth)){
        for (const [key,val] of Object.entries(months)){
            if(val.includes(ergMonth)){
                ergMonth = key
            }
        }
    }
    cleanDate = ergMonth + cleanDate.substring(3)  
    
    //if day and month merged, add space
    if(cleanDate.length === 10 && /^\d+$/.test(cleanDate.substring(4,10))){
        cleanDate = cleanDate.substring(0,6) + ' ' + cleanDate.substring(6)
    }
    return cleanDate
}

export function reformat_date(date:string) : string{
    // convert date from MMM DD YYYY format (Jan 03 2022)-> YYYY-MM-DD
    
    const cleanDate = new Date(translate_month(date))
    const dateFormatted = cleanDate.toISOString().substring(0,10)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    const isValidDate = dateRegex.test(dateFormatted);
    
    if(!isValidDate){
        console.log('INVALID DATE')
        throw new Error(`Invalid date: ${dateFormatted}`)
    }
    return dateFormatted 
}

export function getTodaysDate() {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = new Date().toLocaleDateString('en-US', options);
    console.log(formattedDate.toString());
    return formattedDate.toString()
}

