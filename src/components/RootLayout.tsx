import React, {useEffect, useState} from "react"
import { Outlet, Navigate, useOutletContext } from 'react-router-dom'

type ContextType = {isLoggedIn : string | null, setIsLoggedIn: undefined}

export default function RootLayout(){
    const [isLoggedIn, setIsLoggedIn] = useState <string|null> (null)

    useEffect(()=> {
        const userToken = sessionStorage.getItem('userToken')
        if(userToken){
            setIsLoggedIn(userToken)
        }
    },[])

    if(isLoggedIn){
        return <Navigate to='/dashboad' />
    }
    return(
        <>
            <Outlet context={[isLoggedIn, setIsLoggedIn]}/> 
        </>
    )
}

export function useIsLoggedIn(){
    return useOutletContext<ContextType>()
}