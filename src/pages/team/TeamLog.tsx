import React from 'react'

import { API_URL } from '../../config';
import { TypeFetchedWorkouts } from '../../utils/interfaces';
import { useLoaderData } from 'react-router-dom';

export async function loader(){
    console.log('hit teamlog')

    const userToken = sessionStorage.getItem('userToken')
    const url = API_URL+'/teamlog'
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
            console.log(data['body']['team_workouts'])
            return data['body']['team_workouts']}) 
        .catch(error => console.error(error(error)))
}

export default function TeamLog(){
    const teamWorkouts = useLoaderData() as TypeFetchedWorkouts 

    
    return (
    <div>
        <h2>Team Log</h2>
        
    </div>
    );
}
    
