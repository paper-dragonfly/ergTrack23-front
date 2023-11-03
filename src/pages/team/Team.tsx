import React, {useState} from 'react'
import { useLoaderData, Link, redirect, useNavigate } from 'react-router-dom'
import { API_URL } from '../../config'
import { TypeTeamInfo, TypeTeamLoaded } from '../../utils/interfaces'


//load - get if user info includees team name 
export function loader(){
    console.log('hit Team')
    const userToken = sessionStorage.getItem('userToken')
    const teamId = sessionStorage.getItem('userTeamId')
    if(!teamId){
        return redirect('/team/add')
    }
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
            console.log(data)
            //line below redundant 
            if(!data['team_member']){
                return redirect('/team/add')
            }
            return {userToken: userToken, userTeamInfo:data}
        }) 
        .catch(error => console.log(error(error)))
}

export default function Team(){
    const loaderData = useLoaderData() as TypeTeamLoaded
    const teamInfo = loaderData.userTeamInfo.team_info as TypeTeamInfo
    const userToken = loaderData.userToken
    const admin = loaderData.userTeamInfo.team_admin 
    const navigate  = useNavigate()

    //TODO
    const [teamMeters, setTeamMeters] = useState<number>(0)

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
            if(data.status_code === 200){
                sessionStorage.setItem('userTeamId', JSON.stringify(null))
                navigate('/team/add')
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };


    return (
      <div className='flex flex-col ml-4 mr-4 mt-2 gap-4 '>
          <div className="flex justify-end items-center">
            {admin ? 
              <Link to='admin'>Admin Portal</Link>
              :
              <button onClick={handlePatchRequest} className="flex items-center pt-2 text-base"> 
                Leave Team
              </button>
            }
            </div>
           <h1 className='text-2xl my-6 text-black text-center md:text-5xl md:mt-10'>{teamInfo.team_name.toUpperCase()} </h1>
           <Link to='log' className='btn  self-center'>Team Log</Link>
           <br />
           
        </div>
    )
}


