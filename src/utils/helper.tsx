import React from 'react'
import { redirect } from 'react-router-dom'

export async function checkAuth(request: Request){
    console.log('running checkAuth')

    const pathname = new URL(request.url).pathname
    const userToken = sessionStorage.getItem("userToken")
    console.log('checkAuth', userToken)
    // const userToken = 'fakeToken'

    if(!userToken){
        console.log('checkAuth, not logged in, redirect')
        throw redirect(`/login?redirectTo=${pathname}`)
    }
    return userToken
}