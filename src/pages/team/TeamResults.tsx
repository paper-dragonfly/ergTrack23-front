import React, { useState, useLayoutEffect, useRef, useCallback, useMemo, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import {ColDef, GetRowIdFunc, GetRowIdParams} from 'ag-grid-community'
import { BsArrowLeftShort } from "react-icons/bs"

import { TypeLogCols, TypeFilterableTeamWorkouts, TypeFetchedTeamWorkouts, TypeSummaryData } from '../../utils/interfaces';
import { get_filtered_results } from '../../utils/helper';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';


export default function TeamResults(){
    const location = useLocation()
    const navigate = useNavigate()
    const fullTeamResults:TypeFetchedTeamWorkouts[] = location.state.teamResults 
    const ageCategories: String[] = location.state.ageCats
    
    const gridRef = useRef<AgGridReact<TypeLogCols>>(null);
    const btnWideDisplay = useRef<HTMLButtonElement>(null) 
    
    const [goingBack, setGoingBack] = useState<boolean>(false)
    const [selectedRowId, setSelectedRowId] = useState<number| null>(null)
    const [teamResults, setTeamResults] = useState<TypeFetchedTeamWorkouts[]>([])
    const [filters, setFilters] = useState<{sex: string, ageCat:string}>({
        'sex': 'all',
        'ageCat' : 'all'
    }) 
    console.log('FILTERS', filters)
    const [rowData, setRowData] = useState<any[]>([])
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
    
    useEffect(() => {
        const visibleResults = get_filtered_results(fullTeamResults, ageCategories, filters)
        console.log('VISIBLE', visibleResults)
        setRowData(visibleResults)
    }, [filters])

    
    const handleFiltersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFilters(oldData => {
            return {
                ...oldData,
                [name] : value
            }
        })
    }

    

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
    
    // const handleGoBack = useCallback(() => {
    //     setGoingBack(true)
    //     navigate(-1);
    //   }, []);
    const handleGoBack = () => {
        setGoingBack(true)
        navigate('/team/log')
    }

    const navigateToDetails = () => {
        let selectedRowData
        for(let i=0;i<fullTeamResults.length;i++){
            if(fullTeamResults[i]['workout_id'] ===  selectedRowId){
                selectedRowData = fullTeamResults[i]
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
                    {goingBack ? "Loading..." : 
                    <>
                    <BsArrowLeftShort size={25} className="mr-1" /> Back to Log
                    </>
                    }
                </button>
            </div>
            <h2 className='text-2xl font-bold'>{fullTeamResults[0]['description']}</h2>
            <h4>{fullTeamResults[0]['date'].toLocaleString()}</h4>
            { selectedRowId ?
            <div className='text-xl py-4 space-x-4'>  
                <button onClick = {navigateToDetails} className='btn small'>View Details</button> 
                <button onClick={clearRowSelection} className='btn small coral'>Clear Selection</button>
            </div> : <br />
            }
            <div>
                <fieldset>
                    <legend className='text-xl mb-4'>
                        Filters
                    </legend>
                    <div>
                    <label
                    className={`${filters.sex === 'all'? 'filter-selected' : ''} filter-btn`}                  
                    >
                        All
                        <input
                            type='radio'
                            id='allsexes'
                            name='sex'
                            value='all'
                            checked = {filters.sex==='all'}
                            onChange={handleFiltersChange}
                        />
                    </label>
                    <label
                    className={`${filters.sex === 'female'? 'filter-selected' : ''} filter-btn`}                   >
                        Women
                        <input
                            type='radio'
                            id='female'
                            name='sex'
                            value='female'
                            checked = {filters.sex==='female'}
                            onChange={handleFiltersChange}
                        />
                    </label>
                    <label
                    className={`${filters.sex === 'male'? 'filter-selected' : ''} filter-btn`}
                   >
                        Men
                        <input
                            type='radio'
                            id='male'
                            name='sex'
                            value = 'male'
                            checked={filters.sex === 'male'}
                            onChange={handleFiltersChange}
                        />
                    </label>
                    </div>
                    <br />
                    <div className='-mt-2 mb-4'>
                    <label
                    className={`${filters.ageCat === 'all'? 'filter-selected' : ''} filter-btn`}
                    >
                        All
                        <input
                            type='radio'
                            id='allAges'
                            name='ageCat'
                            value = 'all'
                            checked={filters.ageCat === 'all'}
                            onChange={handleFiltersChange}
                        />
                    </label>
                    <label     
                       className={`${filters.ageCat === 'U15'? 'filter-selected' : ''} filter-btn`}
                    >
                        U15
                        <input
                            type='radio'
                            id='U15'
                            name='ageCat'
                            value = 'U15'
                            checked={filters.ageCat === 'U15'}
                            onChange={handleFiltersChange}
                        />
                    </label>
                    <label                 
                    className={`${filters.ageCat === 'U16'? 'filter-selected' : ''} filter-btn`}
                    >
                        U16
                        <input
                            type='radio'
                            id='U16'
                            name='ageCat'
                            value = 'U16'
                            checked={filters.ageCat === 'U16'}
                            onChange={handleFiltersChange}
                        />
                    </label>
                    <label                  
                    className={`${filters.ageCat === 'U17'? 'filter-selected' : ''} filter-btn`}
                    >
                        U17
                        <input
                            type='radio'
                            id='U17'
                            name='ageCat'
                            value = 'U17'
                            checked={filters.ageCat === 'U17'}
                            onChange={handleFiltersChange}
                        />
                    </label>
                    
</div>
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