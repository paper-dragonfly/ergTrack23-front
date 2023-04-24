import React, {useEffect, useState} from "react"
import { Outlet, Navigate, useOutletContext, useLoaderData } from 'react-router-dom'

type ContextType = {isLoggedIn : string | null, setIsLoggedIn: undefined}


export default function RootLayout(){
    // const [isLoggedIn, setIsLoggedIn] = useState <string|null> (null)

    // useEffect(()=> {
    //     console.log('RootLayout useEffect')
    //     const userToken = sessionStorage.getItem('userToken')
    //     if(userToken){
    //         setIsLoggedIn(userToken)
    //     }
    // },[])

    // if(loaderDataUserToken){
    //     return <Navigate to='/dashboad' />
    // }
    return(
        <>
            <Outlet />
        </>
    )
}

// {loaderDataUserToken && <Navigate to='/dashboard' />}
{/* <Outlet context={[isLoggedIn, setIsLoggedIn]}/>  */}
// export function useIsLoggedIn(){
//     return useOutletContext<ContextType>()
// }