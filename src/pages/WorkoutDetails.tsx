import React, {useState, useMemo, useRef} from 'react'
import {useLocation, useLoaderData, Navigate, NavLink} from 'react-router-dom'
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
    const [editing, setEditing] = useState(false)
    const [deleted, setDeleted] = useState<boolean>(false)
    
    const summaryRow: TypeDetailsCols = {
        time: workoutDetails.time,
        meter: workoutDetails.meter,
        split: workoutDetails.split,
        strokeRate: workoutDetails.stroke_rate
    }

    const detailTableData = [summaryRow, {}]
    const subworkouts = JSON.parse(workoutDetails.subworkouts)

    for(let i=0; i<subworkouts.length; i++){
        const row = {
            time: subworkouts[i].time,
            meter: subworkouts[i].distance,
            split: subworkouts[i].split,
            strokeRate: subworkouts[i].strokeRate
        }
        detailTableData.push(row)
        console.log(detailTableData)
    }



    const [rowData, setRowData] = useState<TypeDetailsCols[]>(detailTableData)
    const [columnDefs] = useState<ColDef[]>([
        {field: 'time'},
        {field: 'meter'},
        {field: 'split'},
        {field: 'strokeRate'}
    ])

    const defaultColDef = useMemo( ()=> ( {
        flex: 1,
        editable: true 
      }), []);
    
    
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

    return (
        <div className='wo-details-div px-6'>
            <NavLink to='/log' className='flex justify-end pt-2 text-base'><BsArrowLeftShort size={25}/>Back to Log</NavLink>
            <h1 className='text-2xl font-bold'>
                Workout Details 
            </h1>
            <h2 className='text-lg pt-6 pb-1'>Date: {workoutDetails.date}</h2>
            <h2 className='text-lg pb-6'>Workout: {workoutDetails.description}</h2>
            <div style={{height : 300, color:'red'}}>
                <div className = "ag-theme-alpine" style={{height:'100%', width:'90%'}} >
                    <AgGridReact
                        rowData={rowData} animateRows={true}
                        columnDefs={columnDefs} defaultColDef={defaultColDef}
                        >
                    </AgGridReact>
                </div>
            </div>
           
            <p className='text-lg py-4'>Comment: {workoutDetails.comment}</p>
            <div className='space-x-4'>
                <button onClick={onEditSaveClick} className='btn small'>  {editing ? 'Save': 'Edit'}</button>
                <button onClick={onDeleteClick} className='btn small coral'>Delete  Workout</button>
                {deleted ? <Navigate to='/log/deleted' /> : null }
            </div>
        </div>
    )
}