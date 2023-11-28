import React, { useState, useRef } from 'react'
import {useLoaderData, useNavigate} from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import {ColDef} from 'ag-grid-community'
import { BiCloudDownload } from 'react-icons/bi'


import { API_URL } from '../config' 
import { TypeFetchedWorkouts, TypeLogCols } from '../utils/interfaces'
import TableTemplate from '../components/TableTemplate'

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
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json()
            }else{
                console.error('Error code:', response.status)
                return response.json().then((errorData) => {
                    console.error('Error details:', errorData);
                    throw new Error('Error on: GET /workout');
                })
          }})
        .then(data => {
            console.log(data)
            console.log(data['workouts'])
            return data['workouts']}) 
        .catch(error => console.error(error.message))
}


export default function WorkoutLog() {
    const allWorkouts = useLoaderData() as TypeFetchedWorkouts[]
    const navigate = useNavigate()
    const summaryData = []
    const [selectedRowId, setSelectedRowId] = useState<number| null>(null)
    const gridRef = useRef<AgGridReact<TypeLogCols>>(null);

    console.log('allworkouts', allWorkouts)

    //DOWNLOAD CSV 

    //get todays date
    const getTodaysDate = () => {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}_${month}_${year}`
        return currentDate
    }

    //download csv
    const handleDownloadCSV = () => { 
        const csvString = convertToCSV(allWorkouts)
        const todaysDate = getTodaysDate()
        triggerDownload(csvString, `workoutlog_${todaysDate}.csv`)
    }

    // convert log data to csv format
    const convertToCSV = (data: any[]): string => {
        if (data.length === 0) return '';
        const keysToExclude = ['subworkouts', 'var_ints_rest', 'image_hash', 'post_to_team', 'user_id', 'workout_id']
        const headers = Object.keys(data[0]).filter(key => !keysToExclude.includes(key)).join(',')
        const rows = data.map(obj => {
            return Object.entries(obj)
                         .filter(([key, _]) => !keysToExclude.includes(key))
                         .map(([_, value]) => value)
                         .join(',');
        }).join('\n');

        return headers + '\n' + rows;
    };

    // download file
    const triggerDownload = (csvString: string, filename: string) => {
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    //CREATE WORKOUT LOG TABLE + FEATURES

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
        <div className='log-div md:px-20 '>
            <h1 className='text-2xl font-bold pt-8'>Workout Log</h1> 
            <button onClick={handleDownloadCSV}><BiCloudDownload size={25} /></button>
            { selectedRowId ?
            <div className='text-xl py-4 space-x-4'> 
                <button onClick = {navigateToDetails} className='btn small'>View Details</button> 
                <button onClick={clearRowSelection} className='btn small coral'>Clear Selection</button>
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
