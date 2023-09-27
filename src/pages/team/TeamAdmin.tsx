import React, {useState} from  'react'
import { useLoaderData } from 'react-router-dom'
import { API_URL } from '../../config'
import {useForm} from 'react-hook-form'
import { BiEditAlt } from 'react-icons/bi'

import { TypeTeamAdminLoaded } from '../../utils/interfaces'


export function loader(){
    console.log('hit TeamAdmin')
    const userToken = sessionStorage.getItem('userToken')
    const teamId = sessionStorage.getItem('userTeamId')
    const url = API_URL+'/teamadmin'
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
            return {userToken: userToken, teamAdminInfo:data['body']}
        }) 
        .catch(error => console.log(error(error)))
} 

export default function TeamAdmin(){
    const loaderData = useLoaderData() as  TypeTeamAdminLoaded
    const teamInfoLoaded = loaderData.teamAdminInfo.team_info
    const userToken = loaderData.userToken

    const [editTeamInfo, setEditTeamInfo] = useState<boolean>(false)
    const [displayedError, setDisplayedError] = useState<string>("")
    const [teamInfo, setTeamInfo] = useState({
        teamName: teamInfoLoaded.team_name,
        teamCode: teamInfoLoaded.team_code
    })    
    
    const {handleSubmit, formState} = useForm()

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
        const url = API_URL+'/team'
        const postInfo = {
            method: 'PUT',
            headers: {
            'Authorization': `Bearer ${userToken}`,
            "Content-Type": "application/json"
            },
            body: JSON.stringify({teamName: teamInfo.teamName, teamCode: teamInfo.teamCode})
            }
            //BREAK FOR ROWING: continue working on this function when i  get back. PATCHor PUT? need to write API endpoint for  this AND for loadeer. Also need to add this component to the React  Routere system with loader
            return(
                fetch(url, postInfo)
                .then((response) => response.json())
                .then((data)=> {
                    console.log(data)
                    if(data.status_code === 200){
                        setEditTeamInfo(false)
                    }else{
                        console.log(data.error_message)
                        setDisplayedError(data.error_message) 
                    }
                })
            )
    }

    return(
        <div>
            {editTeamInfo ? 
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
                        <button type='submit' className='btn my-10'>Update</button>
                    </fieldset>
                </form> 
                :
                <div> 
                    <h1>{`${teamInfoLoaded.team_name} Admin`}</h1>
                    <p>Team Name: {`${teamInfoLoaded.team_name}`}</p>
                    <p>Team Code: {`${teamInfoLoaded.team_code}`}</p>
                    <button onClick={() => setEditTeamInfo(true)}><BiEditAlt size={30} />Edit</button>
                </div>
            }
        </div>
    )
}