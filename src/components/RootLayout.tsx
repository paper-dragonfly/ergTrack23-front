import React, {useEffect, useState} from "react"
import { Outlet, Navigate, useOutletContext, useLoaderData, Params, LoaderFunctionArgs } from 'react-router-dom'
import { checkAuth } from "../utils/helper"


// export type LoggedInType = {isLoggedIn : string | null}
// // interface UserTokenType {userToken: string|null}

// type userTokenType = {userToken : string|null}

// export async function loader({ request }: {request : Request}){
//     const userToken = await checkAuth(request) INFINITE LOOP HEREE??/
//     return userToken }

// export function loader():userTokenType{
//     const userToken = sessionStorage.getItem('userToken') 
//     return {userToken: userToken}
//   }

export default function RootLayout(){
    // console.log('hello', useLoaderData())
    // const {userToken} = useLoaderData() as userTokenType
    // const [isLoggedIn, setIsLoggedIn] = useState(userToken)
    // console.log(`Rootlayout isLoggedIn ${isLoggedIn}`)
    console.log('Running RootLayout')

    return(
        <>
            <Outlet />
        </>
    )
}

// {loaderDataUserToken && <Navigate to='/dashboard' />}
{/* <Outlet context={[isLoggedIn, setIsLoggedIn]}/>  */}

// export function useIsLoggedIn(){
//     return useOutletContext<LoggedInType>()
// }