import React from "react"
import { Outlet, Navigate, useLoaderData, redirect } from 'react-router-dom'
import NavHeader from './NavHeader'
import { checkAuth } from "../utils/helper"

export async function loader({request} : {request: Request}){
    console.log('running AuthLoader')
    const userToken = await checkAuth(request)
    return userToken 
}

export default function AuthRequiredLayout(){
    console.log('running auth required layout')
    const userToken = useLoaderData()
    console.log(userToken)

    console.log('loggedin')
    return(
        <>
            <NavHeader />
            <Outlet /> 
        </>
    )
}