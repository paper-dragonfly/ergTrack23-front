import React from "react"
import { Outlet, Navigate, useLoaderData,useOutletContext} from 'react-router-dom'
import NavHeader from './NavHeader'
// import { useIsLoggedIn } from "./RootLayout"


export default function AuthRequired(){
    console.log('running auth required')
    const loadedUserToken = useLoaderData()
    console.log(loadedUserToken)

    // const {isLoggedIn} = useIsLoggedIn()

    if(!loadedUserToken){
        console.log('navigating to slash')
        return <Navigate to='/' />
    }
    console.log('loggedin')
    return(
        <>
            <NavHeader />
            <Outlet /> 
        </>
    )
}