import React, {useState} from 'react'
import { useLoaderData, Link } from 'react-router-dom'
import { API_URL } from '../config'
import { TypeUserInfo, TypeProfileInfo, TypeProfileLoaded } from '../utils/interfaces'

//add loader that gets info from user table 
export function loader(){
    const userToken = sessionStorage.getItem('userToken')
    const url = API_URL+'/user'
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
        },
    })
        .then(resp => resp.json())
        .then(data => {
            console.log(data['body'])
            return {userToken: userToken, userInfo:data['body']}
        }) 
        .catch(error => console.log(error(error)))
}

export default function ProfileView(){
    const loadData = useLoaderData() as TypeProfileLoaded
    const userInfo = loadData.userInfo
    const userToken = loadData.userToken

    return(
        <div className='profile-info flex flex-col ml-8 mt-10 gap-6 md:ml-40'>
            <h1 className='profile-header text-2xl font-bold'>Profile</h1>
            <p><b>Name:</b> {userInfo.user_name}</p>
            {userInfo.email? <p><b>Email:</b> {userInfo.email}</p>:null}
            {userInfo.age? <p><b>Age:</b> {userInfo.age}</p>:null}
            {userInfo.sex? <p><b>Sex:</b> {userInfo.sex}</p>:null}
            {userInfo.country? <p><b>Country:</b> {userInfo.country}</p>:null}
            {userInfo.weight_class? <p><b>Weight Class:</b> {userInfo.weight_class}</p>:null}
            {userInfo.para_class? <p><b>Para Class:</b> {userInfo.para_class}</p>:null}
            <Link to='edit' state={{userToken:userToken, userInfo:userInfo}} className='btn coral self-start'>Edit</Link>
        </div>
    )
}