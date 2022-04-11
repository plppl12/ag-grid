// Type definitions for @ag-grid-community/core v27.2.0
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { BeanStub } from "../../../context/beanStub";
import { ColumnGroup } from "../../../entities/columnGroup";
import { IHeaderGroupCellComp } from "./headerGroupCellCtrl";
export declare class GroupResizeFeature extends BeanStub {
    private eResize;
    private columnGroup;
    private comp;
    private pinned;
    private resizeCols;
    private resizeStartWidth;
    private resizeRatios;
    private resizeTakeFromCols;
    private resizeTakeFromStartWidth;
    private resizeTakeFromRatios;
    private readonly horizontalResizeService;
    private readonly autoWidthCalculator;
    private readonly columnModel;
    constructor(comp: IHeaderGroupCellComp, eResize: HTMLElement, pinned: string | null, columnGroup: ColumnGroup);
    private postConstruct;
    onResizeStart(shiftKey: boolean): void;
    onResizing(finished: boolean, resizeAmount: any): void;
    resizeLeafColumnsToFit(): void;
    resizeColumns(totalWidth: number, finished?: boolean): void;
    private calculateInitialValues;
    private normaliseDragChange;
}
