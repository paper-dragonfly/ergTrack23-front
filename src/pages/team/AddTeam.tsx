import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import { useLoaderData, redirect, useNavigate } from 'react-router-dom';

import { API_URL } from '../../config';
import { TypeAddTeamLoaded } from '../../utils/interfaces';

export async function loader(){
    console.log('hit addTeeam')

    //get user token 
    const userToken = sessionStorage.getItem('userToken')

    const url = API_URL+'/team'

    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json()
            }else{
                console.error('Error code:', response.status)
                return response.json().then((errorData) => {
                    console.error('Error details:', errorData);
                    throw new Error('error on: GET /team');
                })
          }})
        .then(data => {
            console.log(data)
            if(data['team_member']){
                return redirect('/team')
            }
            return {userToken: userToken}
        }) 
        .catch(error => console.error(error))
}
    // check if on team
    // if on team - redirect to team home page

export default function AddTeam( ){
    const loaderData = useLoaderData() as TypeAddTeamLoaded
    const userToken = loaderData.userToken
    const navigate = useNavigate()

    const [createOrJoin, setCreateOrJoin] = useState<string>('join');
    const [teamInfo, setTeamInfo] = useState({
        teamName: "",
        teamCode: ""
    })
    const [displayedError, setDisplayedError] = useState<string>('')


    const {handleSubmit, formState} = useForm()
    const {isSubmitting} = formState;

    const handleCreateOrJoinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDisplayedError("")
        const newValue = event.target.value;
        setCreateOrJoin(newValue);
    };

    const handleTeamInfoChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        const {name, value} = e.target
        setTeamInfo(oldData => {
            return{
                ...oldData,
                [name]: value
            }
        })
    }

    const submitForm = () => {
        console.log('form submitting with team info', teamInfo)
        setDisplayedError('')
        try{
            if(createOrJoin === 'create'){
                const url =  API_URL+'/team'
                const postInfo = {
                    method: 'POST',
                    headers: {
                    'Authorization': `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                    },
                    body: JSON.stringify({teamName: teamInfo.teamName, teamCode: teamInfo.teamCode})
                    }
                return(
                    fetch(url, postInfo)
                    .then((response) => {
                        if(response.status === 200){
                            return response.json()
                        } else {
                            setDisplayedError('The team you are trying to create already exists')
                            throw new Error('non-200 response')
                        }
                    })
                    .then((data)=> {
                        console.log(data)
                        const userTeamId = data.team_id
                        sessionStorage.setItem('userTeamId',userTeamId)
                        navigate('/team')
                    })
                )  
            }else{
                console.log('tried to join')
                const url =  API_URL+'/jointeam'
                const postInfo = {
                    method: 'PATCH',
                    headers: {
                    'Authorization': `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                    },
                    body: JSON.stringify({teamName: teamInfo.teamName, teamCode: teamInfo.teamCode})
                    }
                return(
                    fetch(url, postInfo)
                    .then((response) => response.json())
                    .then((data)=> {
                        console.log(data)
                        // same idea as: if(response.status_code === 200)
                        if(data.error_message){
                            setDisplayedError(data.error_message)
                        } else {
                            const userTeamId = data.team_id
                            console.log('userTeamId', userTeamId)
                            sessionStorage.setItem('userTeamId',userTeamId)
                            navigate('/team')
                        }
                    })
                )  
            }
        }catch (error){
            console.log(error)
          }
        }
        
        // send data to API

        //if join - get request - confirm name and code matches existing name and code then add team id to user info and make admin false
        //if creaete - post request - add name and code to team db, add team id to user_info and set admin to true
        // send back success message - redirect to team home page 

    return (
        <div className='flex flex-col p-10 gap-6 md:items-center md:p-14'>
            <h1 className='text-2xl font-bold'>Join Team</h1>
            <p>Looks like you're not on a team</p>
            <div className='flex gap-6'>
                <label 
                    className={createOrJoin === 'join'? 'btn selected-btn' : 'btn grey'}
                    >
                    <input
                        type="radio"
                        value="join"
                        checked={createOrJoin === 'join'}
                        onChange={handleCreateOrJoinChange}
                    />
                    Join Team
                </label>
                <label
                    className={createOrJoin === 'create'? 'btn selected-btn' : 'btn grey'}
                    >
                    <input
                        type="radio"
                        value="create"
                        checked={createOrJoin === 'create'}
                        onChange={handleCreateOrJoinChange}
                    />
                    Create Team
                </label>
            </div>
            <form onSubmit={handleSubmit(submitForm)}>
                <fieldset className='md:flex md:flex-col md:items-center'>
                    <label>
                        Team Name
                        <input
                            type="text"
                            name = 'teamName'
                            value={teamInfo.teamName}
                            onChange={handleTeamInfoChange}
                            className='team-input'
                        />
                    </label>
                    <br />
                    <label>
                        Team Code {'\u00A0'}
                        <input
                            type='text'
                            name='teamCode'
                            value = {teamInfo.teamCode}
                            onChange={handleTeamInfoChange}
                            className='team-input'
                        />
                    </label>
                    <br />
                    <p>{displayedError}</p>
                    <button disabled={isSubmitting} type='submit' className={isSubmitting?'btn grey my-6':'btn my-6'}>
                        {createOrJoin==='create'?'Create Team':'Join Team'}
                    </button>
                </fieldset>
            </form> 

        </div>
    );
}