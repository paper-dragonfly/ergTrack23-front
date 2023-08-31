import React, {useState} from 'react'
import { useLoaderData } from 'react-router-dom'
import { API_URL } from '../../config'
import { TypeTeamInfo, TypeTeamLoaded } from '../../utils/interfaces'
import AddTeam from './AddTeam'
import TeamLog from './TeamLog'
import { Outlet, redirect, Link, useNavigate } from 'react-router-dom'


//load - get if user info includees team name 
export function loader(){
    console.log('hit Team')
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
            if(!data['body']['team_member']){
                return redirect('/team/add')
            }
            return {userToken: userToken, userTeamInfo:data['body']}
        }) 
        .catch(error => console.log(error(error)))
}

export default function Team(){
    const loaderData = useLoaderData() as TypeTeamLoaded
    const teamInfo = loaderData.userTeamInfo.team_info as TypeTeamInfo
    const userToken = loaderData.userToken

    const handlePatchRequest = () => {
        const url = API_URL+'/user'
    
        fetch(url, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ team: null, team_admin: false }), 
        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            if(data.status_code == 200){
                throw redirect('/team/add')
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };

    return (
        <>
           <h1>TEAM CENTRAL</h1>
           <h2>You are on team {teamInfo.team_name} </h2>
           <Link to='log'>Team Log</Link>
           <br />
           <button onClick={handlePatchRequest} className='btn self-start my-10'>Leave Team - Send PATCH Request</button>
        </>
    )
}

// export default function Team(){
//     const loadData = useLoaderData() as TypeTeamLoaded
//     console.log('loaded data team', loadData)
//     const [isTeamMember, setIsTeamMember] = useState<boolean>(loadData.userTeamInfo.team_member)
    
//     const toggleIsTeamMember = () => {
//         setIsTeamMember((oldVal) => !oldVal);
//       }
        
//     return(
//         <div>
//             <h2>Team Central</h2>
//             {isTeamMember ? <TeamLog userToken={loadData.userToken} toggleTeamMember={toggleIsTeamMember} /> : <AddTeam userToken={loadData.userToken} toggleTeamMember={toggleIsTeamMember} />}
//         </div>
//     )
// }
