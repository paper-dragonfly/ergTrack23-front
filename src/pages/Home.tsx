import React from 'react'
import { useOutletContext } from 'react-router-dom'


export default function Home(){
    console.log('running Home')

    return(
        <h1 className='text-red-300'>Welcome to ergTrack </h1>
    )
}