import { SelectCellEditor } from 'ag-grid-community';
import React, {useState} from 'react'
import {Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'

import { API_URL } from '../../config';
import { TeamChildProps } from '../../utils/interfaces';



export default function AddTeam(props:TeamChildProps ){
    const userToken = props.userToken

    const [createOrJoin, setCreateOrJoin] = useState<string>('join');
    const [teamInfo, setTeamInfo] = useState({
        teamName: "",
        teamCode: ""
    })
    const [displayedError, setDisplayedError] = useState<string>('')


    const {handleSubmit, formState} = useForm()
    const {isSubmitting} = formState;

    const handleCreateOrJoinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                    .then((response) => response.json())
                    .then((data)=> {
                        console.log(data)
                        if(data.status_code == 200){
                            props.toggleTeamMember()
                        }
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
                        if(data.status_code == 200){
                            props.toggleTeamMember()
                        }else if(data.status_code == 404){
                            setDisplayedError(data.error_message)
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
        <div>
            <h1> Team</h1>
            <p>Looks like you're not on a team</p>
            <label style={createOrJoin === 'join'? {backgroundColor: "#DDE691"}:{}}>
                <input
                    type="radio"
                    value="join"
                    checked={createOrJoin === 'join'}
                    onChange={handleCreateOrJoinChange}
                />
                Join Team
            </label>
            <label style={createOrJoin === 'create'? {backgroundColor: "#DDE691"}:{}}>
                <input
                    type="radio"
                    value="create"
                    checked={createOrJoin === 'create'}
                    onChange={handleCreateOrJoinChange}
                />
                Create Team
            </label>
            <form onSubmit={handleSubmit(submitForm)}>
                <fieldset>
                    <label>
                        Team Name
                        <input
                            type="text"
                            name = 'teamName'
                            value={teamInfo.teamName}
                            onChange={handleTeamInfoChange}
                        />
                    </label>
                    <br />
                    <label>
                        Team Code 
                        <input
                            type='text'
                            name='teamCode'
                            value = {teamInfo.teamCode}
                            onChange={handleTeamInfoChange}
                        />
                    </label>
                    <br />
                    <p>{displayedError}</p>
                    <button type='submit' className='btn self-start my-10'>{createOrJoin==='create'?'Create Team':'Join Team'}</button>
                </fieldset>
            </form> 

        </div>
    );
}