// // TeamLogGrid.tsx (Child component)
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, GetRowIdFunc, GetRowIdParams } from 'ag-grid-community';

// export default function demo(){
//   return null
// }
interface TeamLogGridProps {
  gridRef: React.RefObject<AgGridReact<any>>
  rowData: any[];
  columnDefs: ColDef[];
  setSelectedRowId?: (newVal:number) => void;
  rowIdTitle?: string
}

export default function TableTemplate({
  gridRef,
  rowData,
  columnDefs,
  setSelectedRowId,
  rowIdTitle
}: TeamLogGridProps) {
  
  const btnWideDisplay = useRef<HTMLButtonElement>(null) 


  useEffect(() => {
    if (window.innerWidth < 768) {
      setTimeout(() => {
        console.log('useEffect running');
        if (gridRef.current) {
          gridRef.current.columnApi.autoSizeAllColumns();
        }
      }, 100);
    }
  }, []);

  const autoSizeAll = useCallback((skipHeader: boolean) => {
    console.log('autosizeall is running')
    const allColumnIds: string[] = [];
    gridRef.current!.columnApi.getColumns()!.forEach((column) => {
        allColumnIds.push(column.getId());
    });
    gridRef.current!.columnApi.autoSizeColumns(allColumnIds, skipHeader);
    }, []);

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

    const onSelectionChanged = () => {
      if(!rowIdTitle || !setSelectedRowId){
        return null
      }
      const selectedRow = gridRef.current!.api.getSelectedRows();
      setSelectedRowId(selectedRow.length > 0 ? selectedRow[0][rowIdTitle] : null);
    };

    const tableHeight = 50 * rowData.length + 150

  return (
    <div>
      <div style={{ height: tableHeight, color: 'red' }}>
        <div className="ag-theme-alpine" style={{ height: '90%', width: '100%' }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            animateRows={true}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            getRowId={getRowId}
            rowSelection={'single'}
            onSelectionChanged={onSelectionChanged}
          ></AgGridReact>
        </div>
      </div>
      <button ref={btnWideDisplay} style={{display:'none'}} onClick={() => autoSizeAll(false)} className='btn small grey'>
      wide-display
      </button>
    </div>
  );
}
