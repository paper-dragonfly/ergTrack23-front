import React, {useState, useMemo, useRef} from 'react'
import {useLocation} from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import {ColDef, GetRowIdFunc, GetRowIdParams} from 'ag-grid-community'
import { TypeDetailsCols } from '../utils/interfaces'


export default function WorkoutDetails(){
    const location  = useLocation()
    const workoutDetails = location.state 
    console.log(workoutDetails)
    const gridRef = useRef<AgGridReact<TypeDetailsCols>>(null);
    const [editing, setEditing] = useState(false)
    
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

    return (
        <div className='wo-details-div'>
            <h1>
                Workout Details 
            </h1>
            <h2>Date: {workoutDetails.date}</h2>
            <h2>Workout: {workoutDetails.description}</h2>
            <div style={{height : 300, color:'red'}}>
                <div className = "ag-theme-alpine" style={{height:'100%', width:'90%'}} >
                    <AgGridReact
                        rowData={rowData} animateRows={true}
                        columnDefs={columnDefs} defaultColDef={defaultColDef}
                        >
                    </AgGridReact>
                </div>
            </div>
            <p>Comment: {workoutDetails.comment}</p>
            <button onClick={onEditSaveClick}>{editing ? 'Save': 'Edit'}</button>
        </div>
    )
}