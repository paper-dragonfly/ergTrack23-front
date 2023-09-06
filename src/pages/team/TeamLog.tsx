import React, { useState, useLayoutEffect, useRef, useCallback, useMemo, useEffect } from 'react'
import { API_URL } from '../../config';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import {ColDef, GetRowIdFunc, GetRowIdParams} from 'ag-grid-community'


import { TypeFetchedTeamWorkouts, TypeLogCols } from '../../utils/interfaces';
import { filterResults, get_age_category } from '../../utils/helper';

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
    const summaryData = new Array
    const [selectedRowId, setSelectedRowId] = useState<number| null>(null)
    const gridRef = useRef<AgGridReact<TypeLogCols>>(null);
    const btnWideDisplay = useRef<HTMLButtonElement>(null) 
    const ageCategory = get_age_category(teamWorkouts)

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

    const getRowId = useMemo<GetRowIdFunc>(() => {
        return (params: GetRowIdParams) => params.data.workoutId;
      }, []);

    const defaultColDef = useMemo( ()=> ( {
        floatingFilter: true,
        flex: 1,
        // filterParams: {
        //   buttons: ['apply','clear']
        // }
      }), []);
    
    
    useEffect(()=>{
        if(window.innerWidth < 768){ 
            setTimeout(()=>{
                console.log('useEffect running')
                if(btnWideDisplay.current && gridRef.current){
                    btnWideDisplay.current.click()}
                },100)
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

    const onSelectionChanged = () => {
    const selectedRow = gridRef.current!.api.getSelectedRows();
    setSelectedRowId(selectedRow.length > 0 ? selectedRow[0].workoutId : null);
    };
    
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
        <div className='log-div px-6'>
            <h3 className='text-2xl font-bold pt-6 pb-3'>Workout Log</h3>
            { selectedRowId ?
            <div className='text-xl py-4 space-x-4'> 
                <button onClick= {navigateToTeamDetails} className='btn small'>View Team Results</button> 
                <button onClick = {navigateToDetails} className='btn small'>View Details</button> 
                <button onClick={clearRowSelection} className='btn small coral'>Clear Selection</button>
            </div> : <br />
            }
            <div style={{height : 500, color:'red'}}>
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
            </div>
            <button ref={btnWideDisplay} style={{display:'none'}} onClick={() => autoSizeAll(false)} className='btn small grey'>
            wide-display
            </button>
        </div>
    )
}
    
