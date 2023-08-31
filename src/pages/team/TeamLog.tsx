import React from 'react'

import { API_URL } from '../../config';
import { TeamChildProps } from '../../utils/interfaces';


export default function TeamLog(props: TeamChildProps){
    const handlePatchRequest = () => {
        const url = API_URL+'/user'
    
        fetch(url, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${props.userToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ team: null, team_admin: false }), 
        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            if(data.status_code == 200){
                props.toggleTeamMember()
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };
    
      return (
        <div>
            <h2>Team Log</h2>
            <button onClick={handlePatchRequest} className='btn self-start my-10'>Leave Team - Send PATCH Request</button>
        </div>
      );
    }
    
