import React, { useState, useRef } from 'react'
import { API_URL } from '../../config';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import {ColDef} from 'ag-grid-community'


import { TypeFetchedTeamWorkouts, TypeLogCols } from '../../utils/interfaces';
import { filterResults, get_age_category } from '../../utils/helper';
import BackBtn from '../../components/BackBtn';
import TableTemplate from '../../components/TableTemplate';

export async function loader(){
    console.log('hit teamlog')

    const userToken = sessionStorage.getItem('userToken')
    const url = API_URL+'/teamlog'
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
            console.log(data['body']['team_workouts'])
            return data['body']['team_workouts']}) 
        .catch(error => console.error(error(error)))
}

export default function TeamLog(){
    const teamWorkouts = useLoaderData() as TypeFetchedTeamWorkouts[]
    const navigate = useNavigate()
    const ageCategory = get_age_category(teamWorkouts)
    const summaryData = new Array()
    const [selectedRowId, setSelectedRowId] = useState<number| null>(null)
    const gridRef = useRef<AgGridReact<TypeLogCols>>(null);

    for(let i=0; i<teamWorkouts.length; i++){
        const rowArray = {
            workoutId: teamWorkouts[i]['workout_id'],
            date: teamWorkouts[i]['date'],
            workout: teamWorkouts[i]['description'],
            time: teamWorkouts[i]['time'],
            meters: teamWorkouts[i]['meter'],
            split: teamWorkouts[i]['split'],
            rate: teamWorkouts[i]['stroke_rate'],
            HR: teamWorkouts[i]['heart_rate'],
            variance: teamWorkouts[i]['split_variance'],
            watts: teamWorkouts[i]['watts'],
            cal: teamWorkouts[i]['cal'],
            comment: teamWorkouts[i]['comment'],
            athlete: teamWorkouts[i]['user_name'],
            sex: teamWorkouts[i]['sex'],
            ageCat: ageCategory[i]
        }
        summaryData.push(rowArray)
    }

    const [rowData, setRowData] = useState<any[]>(summaryData)
    const [columnDefs] = useState<ColDef[]>([
        // { headerName: 'Row ID', valueGetter: 'node.id' },
        {field: 'date', filter: true, sortable: true},
        {field: 'workout', filter: true},
        {field: 'athlete', filter: true},
        {field: 'sex', filter: true},
        {field: 'ageCat', headerName:'Age Class', filter: true},
        {field: 'time', filter: true},
        {field: 'meters', filter: 'agNumberColumnFilter'},
        {field: 'split', filter: true, sortable: true},
        {field: 'variance', filter: true, sortable:true},
        {field: 'rate', headerName:'S/M', filter: 'agNumberColumnFilter'},
        // {field: 'HR', headerName:"♡", filter: true},
        {field: 'watts', filter: true},
        // {field: 'cal', filter: true},
        {field: 'comment', filter: true},
    ])

    
    const navigateToTeamDetails = () => {
        for(let i=0;i<teamWorkouts.length;i++){
            if(teamWorkouts[i]['workout_id'] ===  selectedRowId){
                const selectedRowData = teamWorkouts[i]
                const teamResults = filterResults(teamWorkouts, selectedRowData)
                navigate('/team/results', {state : {teamResults: teamResults, ageCats: ageCategory}})
            }
        }
    }

    const navigateToDetails = () => {
        let selectedRowData
        for(let i=0;i<teamWorkouts.length;i++){
            if(teamWorkouts[i]['workout_id'] ===  selectedRowId){
                selectedRowData = teamWorkouts[i]
                break;
            }
        }
        navigate('../../log/details', {state: selectedRowData})
    }

    const clearRowSelection = () => {
        setSelectedRowId(null)
        gridRef.current!.api.deselectAll() 
    }
    
    return (
        <div className='log-div px-6 md:px-20'>  
            <BackBtn navTo='/team' btnText='back' />
            <h3 className='text-2xl font-bold pt-8 pb-3'>Team Log</h3>
            { selectedRowId ?
            <div className='text-xl py-4'> 
                <button onClick= {navigateToTeamDetails} className='btn small mr-4'>View Team Results</button> 
                <button onClick = {navigateToDetails} className='btn small mr-4 mt-2 md:mt-0'>View Details</button> 
                <button onClick={clearRowSelection} className='btn small coral mt-2 md:pt-0'>Clear Selection</button>
            </div> : <br />
            }
            <TableTemplate 
                gridRef={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                setSelectedRowId={setSelectedRowId}
                rowIdTitle='workoutId'
            />
        </div>
    )
}
    
