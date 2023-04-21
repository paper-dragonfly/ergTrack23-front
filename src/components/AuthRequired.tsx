import React from "react"
import { Outlet, Navigate} from 'react-router-dom'
import NavHeader from './NavHeader'

export default function AuthRequired(){
    const loggedIn = sessionStorage.getItem('userToken') ? true: false
    if(!loggedIn){
        return <Navigate to='/login' />
    }
    return(
        <>
            <NavHeader />
            <Outlet /> 
        </>
    )
}