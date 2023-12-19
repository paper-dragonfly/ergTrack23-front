import React, { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import {ColDef} from 'ag-grid-community'

import { TypeLogCols, TypeFetchedTeamWorkouts } from '../../utils/interfaces';
import { getFilteredResults } from '../../utils/helper';
import BackBtn from '../../components/BackBtn';
import TableTemplate from '../../components/TableTemplate';


export default function TeamResults(){
    const location = useLocation()
    const navigate = useNavigate()
    const fullTeamResults:TypeFetchedTeamWorkouts[] = location.state.teamResults 
    const ageCategories: String[] = location.state.ageCats
    
    const gridRef = useRef<AgGridReact<TypeLogCols>>(null);
    
    const [selectedRowId, setSelectedRowId] = useState<number| null>(null)
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
        const visibleResults = getFilteredResults(fullTeamResults, ageCategories, filters)
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
        <div className='log-div px-6 md:px-20'>
            <BackBtn navTo='/team/log' btnText='back to Log'/>
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