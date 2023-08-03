import React, { useCallback, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  GetRowIdFunc,
  GetRowIdParams,
  Grid,
  GridOptions,
} from "ag-grid-community";

export default function YourBorrows() {
  const containerStyle = useMemo(() => ({ width: "500px", height: "500px" }), []);
  const gridStyle = useMemo(() => ({ height: "500px", width: "500px" }), []);
  const [rowData, setRowData] = useState<any[]>([
    { id: "c1", make: "Toyota", model: "Celica", price: 35000 },
    { id: "c2", make: "Ford", model: "Mondeo", price: 32000 },
    { id: "c8", make: "Porsche", model: "Boxster", price: 72000 },
    { id: "c4", make: "BMW", model: "M50", price: 60000 },
    { id: "c14", make: "Aston Martin", model: "DBX", price: 190000 },
  ]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { headerName: "Row ID", valueGetter: "node.id" },
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ]);
  const getRowId = useMemo<GetRowIdFunc>(() => {
    return (params: GetRowIdParams) => params.data.id;
  }, []);

  return (
    <div className="mt-20 bg-green-300" style={containerStyle}>
      <div style={gridStyle} className="bg-gray-400">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          getRowId={getRowId}
        />
      </div>
    </div>
  );
}
