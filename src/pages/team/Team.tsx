import React, {useState} from 'react'
import { useLoaderData } from 'react-router-dom'
import { API_URL } from '../../config'
import { TypeTeamLoaded } from '../../utils/interfaces'
import AddTeam from './AddTeam'
import TeamLog from './TeamLog'

//load - get if user info includees team name 
export function loader(){
    const userToken = sessionStorage.getItem('userToken')
    const url = API_URL+'/team'
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
            return {userToken: userToken, userTeamInfo:data['body']}
        }) 
        .catch(error => console.log(error(error)))
}

export default function Team(){
    const loadData = useLoaderData() as TypeTeamLoaded
    console.log('loaded data team', loadData)
    const [isTeamMember, setIsTeamMember] = useState<boolean>(loadData.userTeamInfo.team_member)
    
    const toggleIsTeamMember = () => {
        setIsTeamMember((oldVal) => !oldVal);
      }
        
    return(
        <div>
            <h2>Team Central</h2>
            {isTeamMember ? <TeamLog userToken={loadData.userToken} toggleTeamMember={toggleIsTeamMember} /> : <AddTeam userToken={loadData.userToken} toggleTeamMember={toggleIsTeamMember} />}
        </div>
    )
}
