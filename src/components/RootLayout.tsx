import React from "react"
import { Outlet } from 'react-router-dom'


export default function RootLayout(){
    
    console.log('Running RootLayout')

    return(
        <>
            <Outlet />
        </>
    )
}
