import React from "react"
import { Outlet, Navigate, useOutletContext} from 'react-router-dom'
import NavHeader from './NavHeader'
import { useIsLoggedIn } from "./RootLayout"

export default function AuthRequired(){
    const {isLoggedIn} = useIsLoggedIn()

    if(!isLoggedIn){
        return <Navigate to='/' />
    }
    return(
        <>
            <NavHeader />
            <Outlet /> 
        </>
    )
}