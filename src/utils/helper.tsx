import React from 'react'
import { redirect } from 'react-router-dom'
import { TypeFetchedTeamWorkouts } from './interfaces'

export async function checkAuth(request: Request){
    console.log('running checkAuth')

    const pathname = new URL(request.url).pathname
    const userToken = sessionStorage.getItem("userToken")
    console.log('checkAuth', userToken)
    // const userToken = 'fakeToken'

    if(!userToken){
        console.log('checkAuth, not logged in, redirect')
        throw redirect(`/login?redirectTo=${pathname}`)
    }
    return userToken
}

export function filterResults(teamWorkouts: TypeFetchedTeamWorkouts[], selected:TypeFetchedTeamWorkouts){
    const teamWoData = new Array()
    for(let i=0;i<teamWorkouts.length;i++){
        if(teamWorkouts[i].date === selected.date && teamWorkouts[i].description === selected.description){
            teamWoData.push(teamWorkouts[i])
        }
    }
    return teamWoData
}

export function get_age_category(workouts: TypeFetchedTeamWorkouts[]){
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const ageCategories: String[] = new Array()

    for(let i=0; i<workouts.length; i++){
        const dob = workouts[i].dob? workouts[i].dob : null
        if(!dob){
            continue 
        }else{
            const dobParts = dob.split('-')
            const birthYear = parseInt(dobParts[0], 10)
            const rowingAge = currentYear - birthYear
        
            const ageCats: {[key: string] : number[]} = {
                U15 : [0, 14],
                U16: [15,15],
                U17 : [16,16], 
                U19 : [17,18], 
                U21 : [19, 20], 
                U23 : [21,22], 
                AA: [23,26],
                A: [27,35],
                B : [36,42],
                C : [43,49],
                D : [50,54],
                E : [55,59],
                F : [60,64],
                G : [65,69],
                H : [70,74],
                I : [73,79],
                J : [80,84],
                K : [85,150]
            }
        
            for(const key in ageCats){
                const [min, max] = ageCats[key]
                if(min <= rowingAge && rowingAge <= max){
                    ageCategories.push(key)
                    break
                }
            }
        }    
    }
    return ageCategories 
}


export function get_filtered_results(fullTeamResults: TypeFetchedTeamWorkouts[], ageCategories: String[], filters: {sex:String, ageCat:String }){
    const result = new Array()
    for(let i=0; i<fullTeamResults.length; i++){
        if(
            (filters.sex === 'all' || fullTeamResults[i].sex === filters.sex) && 
            (filters.ageCat === 'all' || ageCategories[i] === filters.ageCat)
        ){
            const rowArray = {
                workoutId: fullTeamResults[i]['workout_id'],
                date: fullTeamResults[i]['date'],
                workout: fullTeamResults[i]['description'],
                time: fullTeamResults[i]['time'],
                meters: fullTeamResults[i]['meter'],
                split: fullTeamResults[i]['split'],
                rate: fullTeamResults[i]['stroke_rate'],
                HR: fullTeamResults[i]['heart_rate'],
                variance: fullTeamResults[i]['split_variance'],
                watts: fullTeamResults[i]['watts'],
                cal: fullTeamResults[i]['cal'],
                comment: fullTeamResults[i]['comment'],
                athlete: fullTeamResults[i]['user_name'],
                sex: fullTeamResults[i]['sex'],
                dob: fullTeamResults[i]['dob']
            }
            result.push(rowArray)
        }
    }
    return result 
}


  