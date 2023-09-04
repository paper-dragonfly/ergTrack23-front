import React, { useState, useLayoutEffect, useRef, useCallback, useMemo, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import {ColDef, GetRowIdFunc, GetRowIdParams} from 'ag-grid-community'
import { BsArrowLeftShort } from "react-icons/bs"

import { TypeLogCols, TypeFilterableTeamWorkouts, TypeFetchedTeamWorkouts } from '../../utils/interfaces';


export default function TeamResults(){
    const location = useLocation()
    const teamResults:TypeFetchedTeamWorkouts[] = location.state
    console.log('TEAM RESULTS', teamResults)

    const navigate = useNavigate()
    const summaryData = new Array
    const [selectedRowId, setSelectedRowId] = useState<number| null>(null)
    const gridRef = useRef<AgGridReact<TypeLogCols>>(null);
    const btnWideDisplay = useRef<HTMLButtonElement>(null) 

    const initialVisible = teamResults.filter(workout => workout.sex === 'female')
    const [visibleWorkouts, setVisibleWorkouts] = useState<TypeFetchedTeamWorkouts[]>(initialVisible)

    const [filters, setFilters] = useState<{sex: string}>({
        'sex': 'women'
    }) 

    const handleFiltersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFilters(oldData => {
            return {
                ...oldData,
                [name] : value
            }
        })
    }

    useEffect(() => {

    })

    for(let i=0; i<teamResults.length; i++){
        const rowArray = {
            workoutId: teamResults[i]['workout_id'],
            date: teamResults[i]['date'],
            workout: teamResults[i]['description'],
            time: teamResults[i]['time'],
            meters: teamResults[i]['meter'],
            split: teamResults[i]['split'],
            rate: teamResults[i]['stroke_rate'],
            HR: teamResults[i]['heart_rate'],
            variance: teamResults[i]['split_variance'],
            watts: teamResults[i]['watts'],
            cal: teamResults[i]['cal'],
            comment: teamResults[i]['comment'],
            athlete: teamResults[i]['user_name'],
            sex: teamResults[i]['sex'],
            age: teamResults[i]['age']
        }
        summaryData.push(rowArray)
    }

    const [rowData, setRowData] = useState<any[]>(summaryData)
    const [columnDefs] = useState<ColDef[]>([
        // { headerName: 'Row ID', valueGetter: 'node.id' },
        {field: 'athlete', filter: true},
        {field: 'time', filter: true},
        {field: 'meters', filter: 'agNumberColumnFilter'},
        {field: 'split', filter: true, sortable: true},
        {field: 'variance', filter: true, sortable:true},
        {field: 'rate', headerName:'S/M', filter: 'agNumberColumnFilter'},
        {field: 'HR', headerName:"♡", filter: true},
        {field: 'watts', filter: true},
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
    
    const handleGoBack = useCallback(() => {
        navigate(-1);
      }, []);

    const navigateToDetails = () => {
        let selectedRowData
        for(let i=0;i<teamResults.length;i++){
            if(teamResults[i]['workout_id'] ===  selectedRowId){
                selectedRowData = teamResults[i]
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
            <div className="flex justify-end items-center">
                <button onClick={handleGoBack} className="flex items-center pt-2 text-base">
                    <BsArrowLeftShort size={25} className="mr-1" /> Back to Log
                </button>
            </div>
            <h2 className='text-2xl font-bold'>{teamResults[0]['description']}</h2>
            <h4>{teamResults[0]['date'].toLocaleString()}</h4>
            { selectedRowId ?
            <div className='text-xl py-4 space-x-4'>  
                <button onClick = {navigateToDetails} className='btn small'>View Details</button> 
                <button onClick={clearRowSelection} className='btn small coral'>Clear Selection</button>
            </div> : <br />
            }
            <div>
                <fieldset>
                    <legend>
                        Filters
                    </legend>
                    <label
                    style={filters.sex === 'women'? {backgroundColor: "#DDE691"}:{}}
                    >
                        Women
                        <input
                            type='radio'
                            id='women'
                            name='sex'
                            value='women'
                            checked = {filters.sex==='women'}
                            onChange={handleFiltersChange}
                        />
                    </label>
                    <label
                    style={filters.sex === 'men'? {backgroundColor: "#DDE691"}:{}}
                    >
                        Men
                        <input
                            type='radio'
                            id='men'
                            name='sex'
                            value = 'men'
                            checked={filters.sex === 'men'}
                            onChange={handleFiltersChange}
                        />
                    </label>
                    <br /> 
                </fieldset>
            </div>
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