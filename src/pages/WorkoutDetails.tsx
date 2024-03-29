import React, {useEffect, useCallback, useState, useMemo, useRef} from 'react'
import {useLocation, useLoaderData, Navigate} from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import {ColDef} from 'ag-grid-community'

import { TypeDetailsCols } from '../utils/interfaces'
import { API_URL } from '../config'
import BackBtn from '../components/BackBtn'
import { workerData } from 'worker_threads'


export async function loader(){
    const userToken = sessionStorage.getItem('userToken')
    return userToken
}

export default function WorkoutDetails(){
    const userToken = useLoaderData() 
    const location  = useLocation()
    const workoutDetails = location.state  
    console.log('Workout Details', workoutDetails)
    const gridRef = useRef<AgGridReact<TypeDetailsCols>>(null);
    const btnAutoSizeCols = useRef<HTMLButtonElement>(null)    

    const [editing, setEditing] = useState(false)
    const [deleted, setDeleted] = useState<boolean>(false)
    const [showWarning, setShowWarning] = useState<boolean>(false) 
    
    const summaryRow: TypeDetailsCols = {
        time: workoutDetails.time,
        meter: workoutDetails.meter,
        split: workoutDetails.split,
        rate: workoutDetails.stroke_rate,
        hr: workoutDetails.heart_rate
    }

    const detailTableData = [summaryRow, {}]
    const subworkouts = JSON.parse(workoutDetails.subworkouts)
    
    const restInfo = workoutDetails.var_ints_rest ? JSON.parse(workoutDetails.var_ints_rest) : null 
    

    for(let i=0; i<subworkouts.length; i++){
        const row = {
            time: subworkouts[i].time,
            meter: subworkouts[i].distance,
            split: subworkouts[i].split,
            rate: subworkouts[i].strokeRate,
            hr: subworkouts[i].heartRate
        }
        detailTableData.push(row)
        if(restInfo){
            const restRow= {
                time: restInfo[i].time,
                meter: restInfo[i].meter,
            }
            detailTableData.push(restRow)
        }
        console.log('detailTableData',detailTableData)
    }

    const [rowData, setRowData] = useState<TypeDetailsCols[]>(detailTableData)

    const cDefs = subworkouts[0].heartRate? [
        {field: 'time', cellClass: "text-bold"},
        {field: 'meter'},
        {field: 'split'},
        {field: 'rate', headerName:'S/M'},
        {field: 'hr', headerName:'♡'}
    ]: [
        {field: 'time', cellClass: "text-bold"},
        {field: 'meter'},
        {field: 'split'},
        {field: 'rate', headerName:'S/M'},
    ]

    const [columnDefs] = useState<ColDef[]>(cDefs)

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
    
    // const onCellEditingStopped = (params) => {
    //     const { data, colDef } = params;
    //     const newValue = params.api.getCellEditorInstances()[0].getValue();

    //     // Create a copy of the row data and update the cell value
    //     const updatedRowData = [...rowData];
    //     updatedRowData[data.index][colDef.field] = newValue;

    //     // Update the state with the new row data
    //     setRowData(updatedRowData);
    // };
   
    const onEditSaveClick = () => {
        return null
    }

    const onDeleteClick = () => {
        console.log('Running DELETE workout')
        //post data to API
        const url =  API_URL+`/workout/${workoutDetails.workout_id}`
        const delInfo = {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${userToken}`,
          "Content-Type": "application/json"
        },
        
        }
        return(
            fetch(url, delInfo)
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json()
                }else if(response.status >=400 && response.status <500) {
                    setShowWarning(true)
                }else{
                    console.error('Error code:', response.status)
                    return response.json().then((errorData) => {
                        console.error('Error details:', errorData);
                        throw new Error('Error on: POST ergImage');
                    })
            }})
            .then((data)=> {
                console.log(data)
                if(data.message === 'delete successful'){
                    setDeleted(true)
                }
            })
        )
    }


    return (
        <div className='wo-details-div px-6 md:px-20'>
            <BackBtn navTo='-1' btnText='Back to Log'/>
            <h1 className='text-2xl font-bold'>
                {workoutDetails.description}
            </h1>
            <h4>{workoutDetails.date}</h4>
            <div style={{height : 315, color:'red', paddingTop:'10px', paddingBottom:'10px'}}>
                <div className = "ag-theme-alpine" style={{height:'100%', width:'100%'}} >
                    <AgGridReact
                        ref = {gridRef}
                        rowData={rowData} animateRows={true}
                        columnDefs={columnDefs} defaultColDef={defaultColDef}
                        >
                    </AgGridReact>
                </div>
            </div>
            <button ref={btnAutoSizeCols} style = {{display:'none'}} onClick={() => autoSizeAll(false)} >auto-size-cols</button>

            
            {/* take out conditional in future, this is to accomodate old data that doesn't have watts and cals calculated*/}
            {workoutDetails.split_variance ? <h4>Split Variance: {workoutDetails.split_variance}</h4> : null}
            {workoutDetails.watts ? <h4>Average Watts: {workoutDetails.watts}</h4> : null}
            {workoutDetails.cal ? <h4>Total Calories: {workoutDetails.cal}</h4> : null}
            <p className='text-lg py-4'>Comment: {workoutDetails.comment}</p>
            <div className='space-x-4'>
                {/* <button onClick={onEditSaveClick} className='btn small'>  {editing ? 'Save': 'Edit'}</button> */}
                {showWarning ? <p>Unauthorized action: this is not your workout, you cannot delete other athletes workouts</p>: 
                <button onClick={onDeleteClick} className='btn small coral'>Delete  Workout</button>}
                {deleted ? <Navigate to='/log/deleted' /> : null }
            </div>
        </div>
    )
}