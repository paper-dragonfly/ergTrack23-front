import React, {useEffect, useState} from "react"
import { Outlet, Navigate, useOutletContext, useLoaderData, Params, LoaderFunctionArgs } from 'react-router-dom'
import { checkAuth } from "../utils/helper"



export default function RootLayout(){
    
    console.log('Running RootLayout')

    return(
        <>
            <Outlet />
        </>
    )
}
