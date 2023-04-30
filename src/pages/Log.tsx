import React from 'react'
import {useLoaderData} from 'react-router-dom'

import { API_URL } from '../config' 
import { TypeFetchedWorkouts } from '../utils/interfaces'


export async function loader(){
    const userToken = sessionStorage.getItem('userToken')
    const url = API_URL+'/workout'
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
        },
    })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            console.log(data['body']['workouts'])
            return data['body']['workouts']}) 
        .catch(error => console.log(error(error)))
}


export default function Log() {
    const allWorkouts = useLoaderData() as TypeFetchedWorkouts[]
    console.log('allworkouts', allWorkouts)
    return(
        <div className='log-div'>
            <h3>workout log table</h3>
            <p>{`${allWorkouts[0].date}`}</p>
        </div>
    )
}
