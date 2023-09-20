import React, {useEffect, useCallback, useState, useMemo, useRef} from 'react'
import {useLocation, useLoaderData, Navigate, NavLink, useNavigate} from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import {ColDef, GetRowIdFunc, GetRowIdParams} from 'ag-grid-community'

import { TypeDetailsCols } from '../utils/interfaces'
import { API_URL } from '../config'
import { BsArrowLeftShort } from "react-icons/bs"


export async function loader(){
    const userToken = sessionStorage.getItem('userToken')
    return userToken
}

export default function WorkoutDetails(){
    const userToken = useLoaderData() 
    const location  = useLocation()
    const workoutDetails = location.state  
    console.log(workoutDetails)
    const gridRef = useRef<AgGridReact<TypeDetailsCols>>(null);
    const btnAutoSizeCols = useRef<HTMLButtonElement>(null)
    const navigate = useNavigate()

    const [goingBack, setGoingBack] = useState<boolean>(false)
    const [editing, setEditing] = useState(false)
    const [deleted, setDeleted] = useState<boolean>(false)
    
    const summaryRow: TypeDetailsCols = {
        time: workoutDetails.time,
        meter: workoutDetails.meter,
        split: workoutDetails.split,
        rate: workoutDetails.stroke_rate,
        hr: workoutDetails.heart_rate
    }

    const detailTableData = [summaryRow, {}]
    const subworkouts = JSON.parse(workoutDetails.subworkouts)

    for(let i=0; i<subworkouts.length; i++){
        const row = {
            time: subworkouts[i].time,
            meter: subworkouts[i].distance,
            split: subworkouts[i].split,
            rate: subworkouts[i].strokeRate,
            hr: subworkouts[i].heartRate
        }
        detailTableData.push(row)
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
            .then((response) => response.json())
            .then((data)=> {
                console.log(data)
                if(data.body.message === 'delete successful'){
                    setDeleted(true)
                }
            })
        )
    }

    // const handleGoBack = useCallback(() => {
    //     navigate(-1);
    //   }, []);
    const handleGoBack = () => {
        setGoingBack(true)
        navigate(-1)
        return null 
    }

    return (
        <div className='wo-details-div px-6'>
            <div className="flex justify-end items-center">
            <button onClick={handleGoBack} className="flex items-center pt-2 text-base">
                    {goingBack ? "Loading..." : 
                    <>
                    <BsArrowLeftShort size={25} className="mr-1" /> Back to Log
                    </>
                    }           
                </button>
            </div>
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
                <button onClick={onEditSaveClick} className='btn small'>  {editing ? 'Save': 'Edit'}</button>
                <button onClick={onDeleteClick} className='btn small coral'>Delete  Workout</button>
                {deleted ? <Navigate to='/log/deleted' /> : null }
            </div>
        </div>
    )
}