import React, { useState, useRef, useCallback, useMemo } from 'react'
import {useLoaderData} from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

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
    console.log('allworkouts', allWorkouts)
    // make a new list of obj containing only the columns you want to display (move to helper file?)
    const summaryData = new Array
    for(let i=0; i<allWorkouts.length; i++){
        const rowArray = {
            date: allWorkouts[i]['date'],
            time: allWorkouts[i]['time'],
            meter: allWorkouts[i]['meter'],
            split: allWorkouts[i]['split'],
            strokeRate: allWorkouts[i]['stroke_rate'],
            interval: allWorkouts[i]['interval']
        }
        summaryData.push(rowArray)
    }

    const [rowData, setRowData] = useState(summaryData)
    const [columnDefs] = useState([
        {field: 'date', filter: true},
        {field: 'time', filter: true},
        {field: 'meter', filter: 'agNumberColumnFilter'},
        {field: 'split', filter: true},
        {field: 'strokeRate', filter: 'agNumberColumnFilter'},
        {field: 'interval', filter: true}
    ])

    const defaultColDef = useMemo( ()=> ( {
        floatingFilter: true,
        flex: 1,
        // filterParams: {
        //   buttons: ['apply','clear']
        // }
      }), []);

    const gridRef = useRef<AgGridReact<TypeLogCols>>(null);


    const autoSizeAll = useCallback((skipHeader: boolean) => {
        const allColumnIds: string[] = [];
        gridRef.current!.columnApi.getColumns()!.forEach((column) => {
          allColumnIds.push(column.getId());
        });
        gridRef.current!.columnApi.autoSizeColumns(allColumnIds, skipHeader);
      }, []);

    return(
        <div className='log-div'>
            <h3>workout log table</h3>
            <button onClick={() => autoSizeAll(true)}>
            Compact Display
            </button>
            <div style={{height : 800, color:'red'}}>
                <div className = "ag-theme-alpine" style={{height:'50%', width:'60%'}} >
                    <AgGridReact
                        ref = {gridRef}
                        rowData={rowData} animateRows={true}
                        columnDefs={columnDefs} defaultColDef={defaultColDef}>
                    </AgGridReact>
                </div>
            </div> 
        </div>
    )
}
