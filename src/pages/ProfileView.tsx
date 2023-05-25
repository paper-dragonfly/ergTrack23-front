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
        <div className='profile-info flex flex-col pl-8 pt-10 gap-6 '>
            <h1 className='profile-header text-2xl font-bold pb-2 pt-8 mt-10'>Profile</h1>
            <p>Name: {userInfo.user_name}</p>
            <p>Email: {userInfo.email}</p>
            <p>Age: {userInfo.age?userInfo.age:null}</p>
            <p>Sex: {userInfo.sex?userInfo.sex:null}</p>
            <p>Country: {userInfo.country?userInfo.country:null}</p>
            <p>Weight Class: {userInfo.weight_class?userInfo.weight_class:null}</p>
            <p className='mb-6'>Para Class: {userInfo.para_class?userInfo.para_class:null}</p>
            <Link to='edit' state={{userToken:userToken, userInfo:userInfo}} className='btn grey self-center'>Edit</Link>
        </div>
    )
}