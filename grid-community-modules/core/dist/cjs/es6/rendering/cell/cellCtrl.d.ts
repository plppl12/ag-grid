// Type definitions for @ag-grid-community/core v29.3.4
// Project: https://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { Beans } from "./../beans";
import { Column } from "../../entities/column";
import { CellStyle } from "../../entities/colDef";
import { RowNode } from "../../entities/rowNode";
import { CellChangedEvent } from "../../interfaces/iRowNode";
import { CellPosition } from "../../entities/cellPositionUtils";
import { CellEvent, CellFocusedEvent, FlashCellsEvent } from "../../events";
import { BeanStub } from "../../context/beanStub";
import { RowPosition } from "../../entities/rowPositionUtils";
import { RowCtrl } from "../row/rowCtrl";
import { ICellRenderer } from "../cellRenderers/iCellRenderer";
import { ICellEditor } from "../../interfaces/iCellEditor";
import { UserCompDetails } from "../../components/framework/userComponentFactory";
import { CheckboxSelectionComponent } from "../checkboxSelectionComponent";
import { DndSourceComp } from "../dndSourceComp";
import { RowDragComp } from "../row/rowDragComp";
export interface ICellComp {
    addOrRemoveCssClass(cssClassName: string, on: boolean): void;
    setUserStyles(styles: CellStyle): void;
    getFocusableElement(): HTMLElement;
    setTabIndex(tabIndex: number): void;
    setRole(role: string): void;
    setColId(colId: string): void;
    setTitle(title: string | undefined): void;
    setIncludeSelection(include: boolean): void;
    setIncludeRowDrag(include: boolean): void;
    setIncludeDndSource(include: boolean): void;
    getCellEditor(): ICellEditor | null;
    getCellRenderer(): ICellRenderer | null;
    getParentOfValue(): HTMLElement | null;
    setRenderDetails(compDetails: UserCompDetails | undefined, valueToDisplay: any, forceNewCellRendererInstance: boolean): void;
    setEditDetails(compDetails?: UserCompDetails, popup?: boolean, position?: 'over' | 'under'): void;
}
export declare class CellCtrl extends BeanStub {
    static DOM_DATA_KEY_CELL_CTRL: string;
    private instanceId;
    private eGui;
    private cellComp;
    private beans;
    private column;
    private rowNode;
    private rowCtrl;
    private printLayout;
    private value;
    private valueFormatted;
    private cellRangeFeature;
    private cellPositionFeature;
    private cellCustomStyleFeature;
    private tooltipFeature;
    private cellMouseListenerFeature;
    private cellKeyboardListenerFeature;
    private cellPosition;
    private editing;
    private includeSelection;
    private includeDndSource;
    private includeRowDrag;
    private suppressRefreshCell;
    private customRowDragComp;
    private onCellCompAttachedFuncs;
    constructor(column: Column, rowNode: RowNode, beans: Beans, rowCtrl: RowCtrl);
    private addFeatures;
    private addTooltipFeature;
    setComp(comp: ICellComp, eGui: HTMLElement, eCellWrapper: HTMLElement | undefined, printLayout: boolean, startEditing: boolean): void;
    private setupAutoHeight;
    getInstanceId(): string;
    private showValue;
    private setupControlComps;
    isForceWrapper(): boolean;
    private isIncludeControl;
    refreshShouldDestroy(): boolean;
    startEditing(key?: string | null, charPress?: string | null, cellStartedEdit?: boolean, event?: KeyboardEvent | MouseEvent | null): void;
    private setEditing;
    stopRowOrCellEdit(cancel?: boolean): void;
    onPopupEditorClosed(): void;
    private takeValueFromCellEditor;
    /**
     * @returns `True` if the value changes, otherwise `False`.
     */
    private saveNewValue;
    /**
     * Ends the Cell Editing
     * @param cancel `True` if the edit process is being canceled.
     * @returns `True` if the value of the `GridCell` has been updated, otherwise `False`.
     */
    stopEditing(cancel?: boolean): boolean;
    private dispatchEditingStoppedEvent;
    private createCellEditorParams;
    private createCellRendererParams;
    private parseValue;
    setFocusOutOnEditor(): void;
    setFocusInOnEditor(): void;
    onCellChanged(event: CellChangedEvent): void;
    refreshCell(params?: {
        suppressFlash?: boolean;
        newData?: boolean;
        forceRefresh?: boolean;
    }): void;
    stopEditingAndFocus(suppressNavigateAfterEdit?: boolean): void;
    private navigateAfterEdit;
    flashCell(delays?: {
        flashDelay?: number | null;
        fadeDelay?: number | null;
    }): void;
    private animateCell;
    onFlashCells(event: FlashCellsEvent): void;
    isCellEditable(): boolean;
    isSuppressFillHandle(): boolean;
    private formatValue;
    private callValueFormatter;
    private updateAndFormatValue;
    private valuesAreEqual;
    getComp(): ICellComp;
    getValue(): any;
    getValueFormatted(): string;
    private addDomData;
    createEvent(domEvent: Event | null, eventType: string): CellEvent;
    onKeyPress(event: KeyboardEvent): void;
    onKeyDown(event: KeyboardEvent): void;
    onMouseEvent(eventName: string, mouseEvent: MouseEvent): void;
    getGui(): HTMLElement;
    refreshToolTip(): void;
    getColSpanningList(): Column[];
    onLeftChanged(): void;
    onDisplayedColumnsChanged(): void;
    private setAriaColIndex;
    isSuppressNavigable(): boolean;
    onWidthChanged(): void;
    getColumn(): Column;
    getRowNode(): RowNode;
    getBeans(): Beans;
    isPrintLayout(): boolean;
    appendChild(htmlElement: HTMLElement): void;
    refreshHandle(): void;
    getCellPosition(): CellPosition;
    isEditing(): boolean;
    startRowOrCellEdit(key?: string | null, charPress?: string | null, event?: KeyboardEvent | MouseEvent | null): void;
    getRowCtrl(): RowCtrl;
    getRowPosition(): RowPosition;
    updateRangeBordersIfRangeCount(): void;
    onRangeSelectionChanged(): void;
    isRangeSelectionEnabled(): boolean;
    focusCell(forceBrowserFocus?: boolean): void;
    onRowIndexChanged(): void;
    onFirstRightPinnedChanged(): void;
    onLastLeftPinnedChanged(): void;
    onCellFocused(event?: CellFocusedEvent): void;
    private createCellPosition;
    private applyStaticCssClasses;
    onColumnHover(): void;
    onColDefChanged(): void;
    private setWrapText;
    dispatchCellContextMenuEvent(event: Event | null): void;
    getCellRenderer(): ICellRenderer | null;
    getCellEditor(): ICellEditor | null;
    destroy(): void;
    createSelectionCheckbox(): CheckboxSelectionComponent;
    createDndSource(): DndSourceComp;
    registerRowDragger(customElement: HTMLElement, dragStartPixels?: number, suppressVisibilityChange?: boolean): void;
    createRowDragComp(customElement?: HTMLElement, dragStartPixels?: number, suppressVisibilityChange?: boolean): RowDragComp | undefined;
}
