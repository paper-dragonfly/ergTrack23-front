import React from 'react'
import { redirect } from 'react-router-dom'

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

export function durationToSeconds(duration: string): number {
    const timeComponents: number[] = duration.split(':').map(parseFloat);
    let seconds: number = 0;
  
    // Extract seconds (last element)
    seconds = timeComponents.pop()!;
  
    // If there are more components, extract minutes (if any)
    if (timeComponents.length > 0) {
      const minutes: number = timeComponents.pop()!;
      seconds += minutes * 60;
    }
  
    // If there are more components, extract hours (if any)
    if (timeComponents.length > 0) {
      const hours: number = timeComponents.pop()!;
      seconds += hours * 3600;
    }
  
    return seconds;
  }
  
  