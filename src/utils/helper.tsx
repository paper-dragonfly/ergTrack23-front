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
    const teamWoData = new Array
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
    const ageCategories: String[] = new Array

    for(let i=0; i<workouts.length; i++){
        const dob = workouts[i].dob? workouts[i].dob : null
        if(!dob){
            continue 
        }else{
            const dobParts = dob.split('-')
            const birthYear = parseInt(dobParts[0], 10)
            const rowingAge = currentYear - birthYear
        
            const ageCats: {[key: string] : number[]} = {
                U15 : [0, 15],
                U17 : [16,17], 
                U19 : [18,19], 
                U21 : [20, 21], 
                U23 : [22,23], 
                AA: [24,26],
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
                if(min <= rowingAge && rowingAge < max){
                    ageCategories.push(key)
                    break
                }
            }
        }    
    }
    return ageCategories 
}

  
  