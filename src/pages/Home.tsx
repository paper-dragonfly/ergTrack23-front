import React from 'react'
import { useOutletContext } from 'react-router-dom'


export default function Home(){
    console.log('useoutletContext', useOutletContext())
    // const {isLoggedIn} =  useOutletContext<LoggedInType>()
    // console.log(`Home isLogged in: ${isLoggedIn}`)
    return(
        <h1>Welcome to ergTrack </h1>
    )
}