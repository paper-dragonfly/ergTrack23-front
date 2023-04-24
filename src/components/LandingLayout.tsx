import React from "react"
import { Outlet } from 'react-router-dom'
import LandingHeader from "./LandingHeader"

export default function LandingLayout(){
    return(
        <>
            <LandingHeader />
            <Outlet /> 
        </>
    )
}