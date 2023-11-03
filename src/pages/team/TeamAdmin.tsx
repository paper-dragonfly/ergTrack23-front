import React, {useState, useRef} from  'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { BiEditAlt } from 'react-icons/bi'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import {ColDef} from 'ag-grid-community'

import { API_URL } from '../../config'
import { TypeTeamAdminLoaded, TypeTeamMemberCols } from '../../utils/interfaces'
import BackBtn from '../../components/BackBtn'
import TableTemplate from '../../components/TableTemplate'


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
            console.log(data)
            return {userToken: userToken, teamAdminInfo:data, teamId: teamId}
        }) 
        .catch(error => console.log(error(error)))
} 

export default function TeamAdmin(){
    const loaderData = useLoaderData() as  TypeTeamAdminLoaded
    const navigate = useNavigate()
    const teamInfoLoaded = loaderData.teamAdminInfo.team_info
    const userToken = loaderData.userToken
    const teamId = loaderData.teamId
    const teamMembers = loaderData.teamAdminInfo.team_members
    const adminsId = loaderData.teamAdminInfo.admin_uid
    const gridRef = useRef<AgGridReact<TypeTeamMemberCols>>(null)

    //state  variables
    const [editTeamInfo, setEditTeamInfo] = useState<boolean>(false)
    const [displayedError, setDisplayedError] = useState<string>("")
    const [teamInfo, setTeamInfo] = useState({
        teamName: teamInfoLoaded.team_name,
        teamCode: teamInfoLoaded.team_code
    })    
    const [selectedRowId, setSelectedRowId] = useState<number| null>(null)

    
    // Change Team Info
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
        const url = API_URL+`/team/${teamId}`
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

    const escapeEdit = () => {
        setTeamInfo({
            teamName: teamInfoLoaded.team_name,
            teamCode: teamInfoLoaded.team_code
        })
        setEditTeamInfo(false)
    }

    // ************************************
    //Table of team members
    let teamMembersTableData = new Array()
    
    for(let i=0; i<teamMembers.length; i++){
        let shortSex = null 
        if(teamMembers[i].sex === 'male'){
            shortSex = 'M'
        }else if(teamMembers[i].sex === 'female'){
            shortSex= 'F'
        }
        const row = {
            userId: teamMembers[i].user_id,
            name: teamMembers[i].user_name,
            sex: shortSex,
            dob: teamMembers[i].dob,
            email: teamMembers[i].email,
        }
        teamMembersTableData.push(row)
        console.log('Team Members TableData',teamMembersTableData)
    }
    const [rowData, setRowData] = useState<any[]>(teamMembersTableData)

    const cDefs = [
        {field: 'name', cellClass: "text-bold", filter:true},
        {field: 'sex', filter:true},
        {field: 'dob', headerName:'DOB', filter:true},
        {field: 'email', filter:true},
    ]

    const [columnDefs] = useState<ColDef[]>(cDefs)

    const removeAthlete = () => { 
        if(selectedRowId===adminsId){
            setDisplayedError(`As admin cannot remove yourself from team. To leave the team transfer admin role to another team member then click 'Leave Team' on the ${teamInfo.teamName} home page`)
            return null
        }
        console.log('removing athlete')
        const url = API_URL+`/user?userId=${selectedRowId}`

        fetch(url, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team: null }), 
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.status_code === 200){
                teamMembersTableData = teamMembersTableData.filter((member) => member.userId !== selectedRowId);
                setRowData(teamMembersTableData)
                setDisplayedError('Athlete removed from team')
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const transferAdmin = () => {
        // patch user make admin true for new admin, and false  for current admin.  Redirect to team page. 
        if(selectedRowId===adminsId){
            setDisplayedError('You are aleady the admin')
            return null 
        }
        const url = API_URL+`/transferadmin/${selectedRowId}`
        fetch(url, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
        }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.status_code === 200){
                navigate('/team')
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const clearRowSelection = () => {
        setSelectedRowId(null)
        gridRef.current!.api.deselectAll() 
    }

    return(
        <div className='px-6 md:px-20'>
            <BackBtn navTo='/team' btnText='back'/>

            <h1 className='text-2xl my-6 text-black text-center md:text-5xl md:mt-10'>{`${teamInfoLoaded.team_name} Admin`}</h1>
            {/* Top Section */}
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
                        <button type='submit' className='btn small my-4 mr-4'>Save Changes</button>
                        <button className='btn small grey my-4' onClick={escapeEdit}>Ignore Changes</button>
                    </fieldset>
                </form> 
                :
                // Top when not editing
                <div> 
                    <button onClick={() => setEditTeamInfo(true)}><BiEditAlt size={30} />Edit</button>
                    <br /><br />
                    <p>Team Name: {`${teamInfo.teamName}`}</p>
                    <p>Team Code: {`${teamInfo.teamCode}`}</p>
                </div>
            }

            {/* Table and related buttons */}
            { editTeamInfo && selectedRowId ?
            <div className='text-xl py-4 space-x-4'> 
                <button onClick = {transferAdmin} className='btn small mt-4'>Transfer Admin Role</button> 
                <button onClick = {removeAthlete} className='btn small coral mt-4'>Remove Athlete from Team</button> 
                <button onClick={clearRowSelection} className='btn small grey mt-4'>Deselect</button>
            </div> : <br />
            }
            <TableTemplate 
                gridRef={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                setSelectedRowId={setSelectedRowId}
                rowIdTitle='userId'
            />
        </div>
    )
}