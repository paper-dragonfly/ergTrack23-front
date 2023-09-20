import React, { useState, useLayoutEffect, useRef, useCallback, useMemo, useEffect } from 'react'
import {useLoaderData, useNavigate} from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import {ColDef, GetRowIdFunc, GetRowIdParams} from 'ag-grid-community'

import { API_URL } from '../config' 
import { TypeFetchedWorkouts, TypeLogCols } from '../utils/interfaces'


export async function loader(){
    console.log('running log loader')
    const userToken = sessionStorage.getItem('userToken')
    const url = API_URL+'/workout'
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
            console.log(data['body']['workouts'])
            return data['body']['workouts']}) 
        .catch(error => console.error(error))
}


export default function Log() {
    const allWorkouts = useLoaderData() as TypeFetchedWorkouts[]
    const navigate = useNavigate()
    const summaryData = new Array
    const [selectedRowId, setSelectedRowId] = useState<number| null>(null)
    // const [selectedRowData, setSelectedRowData] = useState<TypeFetchedWorkouts|null>(null)
    const gridRef = useRef<AgGridReact<TypeLogCols>>(null);
    const btnWideDisplay = useRef<HTMLButtonElement>(null) 

    console.log('allworkouts', allWorkouts)
    // make a new list of obj containing only the columns you want to display (move to helper file?)
    for(let i=0; i<allWorkouts.length; i++){
        const rowArray = {
            workoutId: allWorkouts[i]['workout_id'],
            date: allWorkouts[i]['date'],
            workout: allWorkouts[i]['description'],
            time: allWorkouts[i]['time'],
            meters: allWorkouts[i]['meter'],
            split: allWorkouts[i]['split'],
            rate: allWorkouts[i]['stroke_rate'],
            HR: allWorkouts[i]['heart_rate'],
            variance: allWorkouts[i]['split_variance'],
            watts: allWorkouts[i]['watts'],
            cal: allWorkouts[i]['cal'],
            comment: allWorkouts[i]['comment']
        }
        summaryData.push(rowArray)
    }

    const [rowData, setRowData] = useState<any[]>(summaryData)
    const [columnDefs] = useState<ColDef[]>([
        // { headerName: 'Row ID', valueGetter: 'node.id' },
        {field: 'date', filter: true, sortable: true},
        {field: 'workout', filter: true},
        {field: 'time', filter: true},
        {field: 'meters', filter: 'agNumberColumnFilter'},
        {field: 'split', filter: true, sortable: true},
        {field: 'variance', filter: true, sortable:true},
        {field: 'rate', headerName:'S/M', filter: 'agNumberColumnFilter'},
        {field: 'HR', headerName:"♡", filter: true},
        {field: 'watts', filter: true},
        {field: 'cal', filter: true},
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

      
    // TODO: Find a better solution, this is a hack
    // Auto sizes the column width to show full cell content for small screens rather than fitting table to screen width
    // does this by clicking an invisible button after 0.05 seconds.  
    // Timeout was neccessary to allow grid to render before autoSizeAll is called
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

    
    const navigateToDetails = () => {
        let selectedRowData
        for(let i=0;i<allWorkouts.length;i++){
            if(allWorkouts[i]['workout_id'] ===  selectedRowId){
                selectedRowData = allWorkouts[i]
                break;
            }
        }
        navigate('details', {state: selectedRowData})
    }
    
    const clearRowSelection = () => {
        setSelectedRowId(null)
        gridRef.current!.api.deselectAll() 
    }

    return(
        <div className='log-div px-6'>
            <h3 className='text-2xl font-bold pt-6 pb-3'>Workout Log</h3>
            { selectedRowId ?
            <div className='text-xl py-4 space-x-4'> 
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
