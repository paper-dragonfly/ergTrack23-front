import React, {useState, useRef, useCallback, useMemo, useEffect} from  'react'
import { useLoaderData } from 'react-router-dom'
import { API_URL } from '../../config'
import {useForm} from 'react-hook-form'
import { BiEditAlt } from 'react-icons/bi'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import {ColDef, GetRowIdFunc, GetRowIdParams} from 'ag-grid-community'

import { TypeTeamAdminLoaded, TypeTeamMemberCols } from '../../utils/interfaces'


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
            return {userToken: userToken, teamAdminInfo:data['body'], teamId: teamId}
        }) 
        .catch(error => console.log(error(error)))
} 

export default function TeamAdmin(){
    const loaderData = useLoaderData() as  TypeTeamAdminLoaded
    const teamInfoLoaded = loaderData.teamAdminInfo.team_info
    const userToken = loaderData.userToken
    const teamId = loaderData.teamId
    const teamMembers = loaderData.teamAdminInfo.team_members
    const gridRef = useRef<AgGridReact<TypeTeamMemberCols>>(null)
    const btnAutoSizeCols = useRef<HTMLButtonElement>(null)

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
    const teamMembersTableData = new Array

    
    const gridHeightMaybe = 50*teamMembers.length + 75
    const gridHeight = gridHeightMaybe < 500 ? gridHeightMaybe : 500
    

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
        {field: 'name', cellClass: "text-bold"},
        {field: 'sex'},
        {field: 'dob', headerName:'DOB'},
        {field: 'email'},
    ]

    const [columnDefs] = useState<ColDef[]>(cDefs)

    const getRowId = useMemo<GetRowIdFunc>(() => {
        return (params: GetRowIdParams) => params.data.workoutId;
      }, []);
    
    const onSelectionChanged = () => {
        const selectedRow = gridRef.current!.api.getSelectedRows();
        setSelectedRowId(selectedRow.length > 0 ? selectedRow[0].userId : null);
    };

    const defaultColDef = useMemo( ()=> ( {
        flex: 1,
        editable: true 
      }), []);
    
    //Column auto-resizing hack
    useEffect(()=>{
    // // only apply to small screens
    if(window.innerWidth < 768){ 
        setTimeout(()=>{
            console.log('useEffect running in workout details')
            if(btnAutoSizeCols.current && gridRef.current){
                btnAutoSizeCols.current.click()}
            },500)
        }
    },[])
            
            
    const autoSizeAll = useCallback((skipHeader: boolean) => {
        console.log('autosizeall is running')
        const allColumnIds: string[] = [];
        gridRef.current!.columnApi.getColumns()!.forEach((column) => {
            allColumnIds.push(column.getId());
        });
        gridRef.current!.columnApi.autoSizeColumns(allColumnIds, skipHeader);
        }, []);

    return(
        <div>
            <h1 className='text-2xl my-6 text-black text-center md:text-5xl md:mt-10'>{`${teamInfoLoaded.team_name} Admin`}</h1>

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
                        <button type='submit' className='btn my-10'>Save Changes</button>
                        <button className='btn coral my-10' onClick={escapeEdit}>Ignore Changes</button>
                    </fieldset>
                </form> 
                :
                <div> 
                    <p>Team Name: {`${teamInfo.teamName}`}</p>
                    <p>Team Code: {`${teamInfo.teamCode}`}</p>
                    <button onClick={() => setEditTeamInfo(true)}><BiEditAlt size={30} />Edit</button>
                </div>
            }

            <div style={{height : gridHeight}}>
                <div className = "ag-theme-alpine" style={{height:'90%', width:'100%'}} >
                    <AgGridReact
                        ref = {gridRef}
                        rowData={rowData} animateRows={true}
                        columnDefs={columnDefs} defaultColDef={defaultColDef}
                        getRowId={getRowId}
                        rowSelection={'single'}
                        onSelectionChanged={onSelectionChanged}
                        >
                    </AgGridReact>
                </div>
                <button ref={btnAutoSizeCols} style={{display:'none'}} onClick={() => autoSizeAll(false)} >
                wide-display
                </button>
            </div>
        </div>
    )
}