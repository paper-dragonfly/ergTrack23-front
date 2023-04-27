import React from "react"
import { Outlet } from 'react-router-dom'
import LandingHeader from "./LandingHeader"

export default function PublicLayout(){
    console.log('runningg PublicLayout')

    return(
        <>
            <LandingHeader />
            <Outlet /> 
        </>
    )
}