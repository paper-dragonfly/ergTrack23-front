import React from "react"
import { Outlet } from 'react-router-dom'
import NavHeader from './NavHeader'

export default function RootLayout(){
    return(
        <>
            <NavHeader />
            <Outlet /> 
        </>
    )
}