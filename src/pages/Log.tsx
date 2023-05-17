import React, { useState, useRef, useCallback, useMemo } from 'react'
import {useLoaderData, useNavigate} from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import {ColDef, GetRowIdFunc, GetRowIdParams} from 'ag-grid-community'

import { API_URL } from '../config' 
import { TypeFetchedWorkouts, TypeLogCols } from '../utils/interfaces'


export async function loader(){
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
        .catch(error => console.log(error(error)))
}


export default function Log() {
    const allWorkouts = useLoaderData() as TypeFetchedWorkouts[]
    const navigate = useNavigate()
    const summaryData = new Array
    const [selectedRowId, setSelectedRowId] = useState<number| null>(null)
    // const [selectedRowData, setSelectedRowData] = useState<TypeFetchedWorkouts|null>(null)
    const gridRef = useRef<AgGridReact<TypeLogCols>>(null);

    console.log('allworkouts', allWorkouts)
    // make a new list of obj containing only the columns you want to display (move to helper file?)
    for(let i=0; i<allWorkouts.length; i++){
        const rowArray = {
            workoutId: allWorkouts[i]['workout_id'],
            date: allWorkouts[i]['date'],
            workout: allWorkouts[i]['description'],
            time: allWorkouts[i]['time'],
            meter: allWorkouts[i]['meter'],
            split: allWorkouts[i]['split'],
            strokeRate: allWorkouts[i]['stroke_rate'],
            comment: allWorkouts[i]['comment']
        }
        summaryData.push(rowArray)
    }

    const [rowData, setRowData] = useState<any[]>(summaryData)
    const [columnDefs] = useState<ColDef[]>([
        // { headerName: 'Row ID', valueGetter: 'node.id' },
        {field: 'date', filter: true},
        {field: 'workout', filter: true},
        {field: 'time', filter: true},
        {field: 'meter', filter: 'agNumberColumnFilter'},
        {field: 'split', filter: true},
        {field: 'strokeRate', filter: 'agNumberColumnFilter'},
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

    const autoSizeAll = useCallback((skipHeader: boolean) => {
        const allColumnIds: string[] = [];
        gridRef.current!.columnApi.getColumns()!.forEach((column) => {
          allColumnIds.push(column.getId());
        });
        gridRef.current!.columnApi.autoSizeColumns(allColumnIds, skipHeader);
      }, []);

    //   const onSelectionChanged = useCallback(() => {
    //     const selectedrows = gridRef.currerent!.api.getSelectedrows()
    //   }, [])

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
        <div className='log-div'>
            <h3>workout log table</h3>
            <button onClick={() => autoSizeAll(false)}>
            Compact Display
            </button>
            { selectedRowId ?
            <div> 
                <button onClick = {navigateToDetails}>View Details {`${selectedRowId}`}</button> 
                <button onClick={clearRowSelection}>Clear Selection</button>
            </div> : 
            <p>Select workout to view details</p>
            }
            <div style={{height : 400, color:'red'}}>
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
        </div>
    )
}
