// Type definitions for @ag-grid-community/core v27.2.0
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { IRowModel } from "./iRowModel";
import { IDatasource } from "./iDatasource";
export interface IInfiniteRowModel extends IRowModel {
    setDatasource(datasource: IDatasource | undefined): void;
    refreshCache(): void;
    purgeCache(): void;
    setRowCount(rowCount: number, maxRowFound?: boolean): void;
}
