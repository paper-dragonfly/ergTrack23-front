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


  
  