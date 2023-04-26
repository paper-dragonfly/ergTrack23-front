import React from 'react'
import { redirect } from 'react-router-dom'

export async function checkAuth(request: Request){
    const pathname = new URL(request.url).pathname
    const userToken = sessionStorage.getItem("userToken")

    if(!userToken){
        throw redirect(`/login?redirectTo=${pathname}`)
    }
    return userToken
}