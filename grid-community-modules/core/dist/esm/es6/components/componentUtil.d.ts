// Type definitions for @ag-grid-community/core v29.3.4
// Project: https://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { GridOptions } from '../entities/gridOptions';
import { GridApi } from '../gridApi';
export declare class ComponentUtil {
    static EVENTS: string[];
    /** Exclude the following internal events from code generation to prevent exposing these events via framework components */
    static EXCLUDED_INTERNAL_EVENTS: string[];
    /** EVENTS that should be exposed via code generation for the framework components.  */
    static PUBLIC_EVENTS: string[];
    static getCallbackForEvent(eventName: string): string;
    static EVENT_CALLBACKS: string[];
    static STRING_PROPERTIES: ("sideBar" | "clipboardDeliminator" | "clipboardDelimiter" | "colResizeDefault" | "editType" | "quickFilterText" | "chartThemeOverrides" | "overlayLoadingTemplate" | "overlayNoRowsTemplate" | "pivotPanelShow" | "pivotColumnGroupTotals" | "pivotRowTotals" | "domLayout" | "groupDisplayType" | "rowGroupPanelShow" | "rowModelType" | "serverSideStoreType" | "rowSelection" | "fillHandleDirection" | "multiSortKey" | "rowClass" | "treeDataDisplayType")[];
    static OBJECT_PROPERTIES: ("icons" | "onCellValueChanged" | "onCellClicked" | "onCellDoubleClicked" | "onCellContextMenu" | "rowDragText" | "sortingOrder" | "context" | "statusBar" | "sideBar" | "popupParent" | "defaultColDef" | "defaultColGroupDef" | "columnTypes" | "components" | "frameworkComponents" | "defaultCsvExportParams" | "defaultExcelExportParams" | "excelStyles" | "chartThemes" | "customChartThemes" | "chartThemeOverrides" | "chartToolPanelsDef" | "loadingCellRenderer" | "loadingCellRendererFramework" | "loadingCellRendererParams" | "loadingCellRendererSelector" | "localeText" | "detailCellRenderer" | "detailCellRendererFramework" | "detailCellRendererParams" | "alignedGrids" | "loadingOverlayComponent" | "loadingOverlayComponentFramework" | "loadingOverlayComponentParams" | "noRowsOverlayComponent" | "noRowsOverlayComponentFramework" | "noRowsOverlayComponentParams" | "aggFuncs" | "fullWidthCellRenderer" | "fullWidthCellRendererFramework" | "fullWidthCellRendererParams" | "autoGroupColumnDef" | "groupRowRenderer" | "groupRowRendererFramework" | "groupRowRendererParams" | "pinnedTopRowData" | "pinnedBottomRowData" | "datasource" | "serverSideDatasource" | "viewportDatasource" | "rowStyle" | "rowClassRules" | "getContextMenuItems" | "getMainMenuItems" | "postProcessPopup" | "processCellForClipboard" | "processHeaderForClipboard" | "processGroupHeaderForClipboard" | "processCellFromClipboard" | "sendToClipboard" | "processDataFromClipboard" | "isExternalFilterPresent" | "doesExternalFilterPass" | "getChartToolbarItems" | "createChartContainer" | "navigateToNextHeader" | "tabToNextHeader" | "navigateToNextCell" | "tabToNextCell" | "localeTextFunc" | "getLocaleText" | "getDocument" | "paginationNumberFormatter" | "groupRowAggNodes" | "getGroupRowAgg" | "isGroupOpenByDefault" | "initialGroupOrderComparator" | "defaultGroupOrderComparator" | "processSecondaryColDef" | "processSecondaryColGroupDef" | "processPivotResultColDef" | "processPivotResultColGroupDef" | "getDataPath" | "getChildCount" | "getServerSideGroupLevelParams" | "getServerSideStoreParams" | "isServerSideGroupOpenByDefault" | "isApplyServerSideTransaction" | "isServerSideGroup" | "getServerSideGroupKey" | "getBusinessKeyForNode" | "getRowNodeId" | "getRowId" | "processRowPostCreate" | "isRowSelectable" | "isRowMaster" | "fillOperation" | "postSort" | "postSortRows" | "getRowStyle" | "getRowClass" | "getRowHeight" | "isFullWidthCell" | "isFullWidthRow" | "onToolPanelVisibleChanged" | "onToolPanelSizeChanged" | "onPasteStart" | "onPasteEnd" | "onColumnVisible" | "onColumnPinned" | "onColumnResized" | "onColumnMoved" | "onColumnValueChanged" | "onColumnPivotModeChanged" | "onColumnPivotChanged" | "onColumnGroupOpened" | "onNewColumnsLoaded" | "onGridColumnsChanged" | "onDisplayedColumnsChanged" | "onVirtualColumnsChanged" | "onColumnEverythingChanged" | "onComponentStateChanged" | "onCellEditRequest" | "onRowValueChanged" | "onCellEditingStarted" | "onCellEditingStopped" | "onRowEditingStarted" | "onRowEditingStopped" | "onUndoStarted" | "onUndoEnded" | "onRedoStarted" | "onRedoEnded" | "onFilterOpened" | "onFilterChanged" | "onFilterModified" | "onChartCreated" | "onChartRangeSelectionChanged" | "onChartOptionsChanged" | "onChartDestroyed" | "onCellKeyDown" | "onCellKeyPress" | "onGridReady" | "onFirstDataRendered" | "onGridSizeChanged" | "onModelUpdated" | "onVirtualRowRemoved" | "onViewportChanged" | "onBodyScroll" | "onBodyScrollEnd" | "onDragStarted" | "onDragStopped" | "onPaginationChanged" | "onRowDragEnter" | "onRowDragMove" | "onRowDragLeave" | "onRowDragEnd" | "onColumnRowGroupChanged" | "onRowGroupOpened" | "onExpandOrCollapseAll" | "onPinnedRowDataChanged" | "onRowDataChanged" | "onRowDataUpdated" | "onAsyncTransactionsFlushed" | "onStoreRefreshed" | "onCellFocused" | "onCellMouseOver" | "onCellMouseOut" | "onCellMouseDown" | "onRowClicked" | "onRowDoubleClicked" | "onRowSelected" | "onSelectionChanged" | "onRangeSelectionChanged" | "onSortChanged" | "onColumnRowGroupChangeRequest" | "onColumnPivotChangeRequest" | "onColumnValueChangeRequest" | "onColumnAggFuncChangeRequest")[];
    static ARRAY_PROPERTIES: ("sortingOrder" | "sideBar" | "columnDefs" | "components" | "excelStyles" | "chartThemes" | "chartThemeOverrides" | "alignedGrids" | "pinnedTopRowData" | "pinnedBottomRowData" | "rowData" | "rowClass")[];
    static NUMBER_PROPERTIES: ("tabIndex" | "tooltipShowDelay" | "tooltipHideDelay" | "headerHeight" | "groupHeaderHeight" | "floatingFiltersHeight" | "pivotHeaderHeight" | "pivotGroupHeaderHeight" | "autoSizePadding" | "undoRedoCellEditingLimit" | "chartThemeOverrides" | "keepDetailRowsCount" | "detailRowHeight" | "rowBuffer" | "paginationPageSize" | "cellFlashDelay" | "cellFadeDelay" | "groupDefaultExpanded" | "asyncTransactionWaitMillis" | "cacheOverflowSize" | "infiniteInitialRowCount" | "serverSideInitialRowCount" | "cacheBlockSize" | "maxBlocksInCache" | "maxConcurrentDatasourceRequests" | "blockLoadDebounceMillis" | "viewportRowModelPageSize" | "viewportRowModelBufferSize" | "scrollbarWidth" | "rowHeight")[];
    static BOOLEAN_PROPERTIES: ("singleClickEdit" | "enableCellChangeFlash" | "unSortIcon" | "suppressAutoSize" | "sideBar" | "suppressContextMenu" | "preventDefaultOnContextMenu" | "allowContextMenuWithControlKey" | "suppressMenuHide" | "enableBrowserTooltips" | "tooltipMouseTrack" | "copyHeadersToClipboard" | "copyGroupHeadersToClipboard" | "suppressCopyRowsToClipboard" | "suppressCopySingleCellRanges" | "suppressLastEmptyLineOnPaste" | "suppressClipboardPaste" | "suppressClipboardApi" | "suppressCutToClipboard" | "maintainColumnOrder" | "suppressFieldDotNotation" | "allowDragFromColumnsToolPanel" | "suppressMovableColumns" | "suppressColumnMoveAnimation" | "suppressDragLeaveHidesColumns" | "suppressRowGroupHidesColumns" | "skipHeaderOnAutoSize" | "reactUi" | "suppressReactUi" | "suppressClickEdit" | "readOnlyEdit" | "stopEditingWhenCellsLoseFocus" | "enterMovesDown" | "enterMovesDownAfterEdit" | "enableCellEditingOnBackspace" | "undoRedoCellEditing" | "suppressCsvExport" | "suppressExcelExport" | "cacheQuickFilter" | "excludeHiddenColumnsFromQuickFilter" | "excludeChildrenWhenTreeDataFiltering" | "enableCharts" | "chartThemeOverrides" | "enableChartToolPanelsButton" | "suppressChartToolPanelsButton" | "masterDetail" | "keepDetailRows" | "detailRowAutoHeight" | "valueCache" | "valueCacheNeverExpires" | "enableCellExpressions" | "suppressParentsInRowNodes" | "suppressTouch" | "suppressFocusAfterRefresh" | "suppressAsyncEvents" | "suppressBrowserResizeObserver" | "suppressPropertyNamesCheck" | "suppressChangeDetection" | "debug" | "suppressLoadingOverlay" | "suppressNoRowsOverlay" | "pagination" | "paginationAutoPageSize" | "paginateChildRows" | "suppressPaginationPanel" | "pivotMode" | "pivotSuppressAutoColumn" | "suppressExpandablePivotGroups" | "functionsReadOnly" | "suppressAggFuncInHeader" | "suppressAggAtRootLevel" | "aggregateOnlyChangedColumns" | "suppressAggFilteredOnly" | "removePivotHeaderRowWhenSingleValueColumn" | "animateRows" | "allowShowChangeAfterFilter" | "ensureDomOrder" | "enableRtl" | "suppressColumnVirtualisation" | "suppressMaxRenderedRowRestriction" | "suppressRowVirtualisation" | "rowDragManaged" | "suppressRowDrag" | "suppressMoveWhenRowDragging" | "rowDragEntireRow" | "rowDragMultiRow" | "embedFullWidthRows" | "groupMaintainOrder" | "groupSelectsChildren" | "groupAggFiltering" | "groupIncludeFooter" | "groupIncludeTotalFooter" | "groupSuppressBlankHeader" | "groupSelectsFiltered" | "showOpenedGroup" | "groupRemoveSingleChildren" | "groupRemoveLowestSingleChildren" | "groupHideOpenParents" | "groupAllowUnbalanced" | "suppressMakeColumnVisibleAfterUnGroup" | "treeData" | "rowGroupPanelSuppressSort" | "groupRowsSticky" | "rememberGroupStateWhenNewData" | "immutableData" | "suppressModelUpdateAfterUpdateTransaction" | "suppressServerSideInfiniteScroll" | "purgeClosedRowNodes" | "serverSideSortAllLevels" | "serverSideFilterAllLevels" | "serverSideSortOnServer" | "serverSideFilterOnServer" | "serverSideSortingAlwaysResets" | "serverSideFilteringAlwaysResets" | "alwaysShowHorizontalScroll" | "alwaysShowVerticalScroll" | "debounceVerticalScrollbar" | "suppressHorizontalScroll" | "suppressScrollOnNewData" | "suppressScrollWhenPopupsAreOpen" | "suppressAnimationFrame" | "suppressMiddleClickScrolls" | "suppressPreventDefaultOnMouseWheel" | "rowMultiSelectWithClick" | "suppressRowDeselection" | "suppressRowClickSelection" | "suppressCellSelection" | "suppressCellFocus" | "suppressMultiRangeSelection" | "enableCellTextSelection" | "enableRangeSelection" | "enableRangeHandle" | "enableFillHandle" | "suppressClearOnFillReduction" | "accentedSort" | "suppressMultiSort" | "alwaysMultiSort" | "suppressMaintainUnsortedOrder" | "suppressRowHoverHighlight" | "suppressRowTransform" | "columnHoverHighlight" | "deltaSort" | "functionsPassive" | "enableGroupEdit" | "resetRowDataOnUpdate")[];
    static FUNCTION_PROPERTIES: ("tabIndex" | "icons" | "singleClickEdit" | "onCellValueChanged" | "onCellClicked" | "onCellDoubleClicked" | "onCellContextMenu" | "enableCellChangeFlash" | "rowDragText" | "sortingOrder" | "unSortIcon" | "suppressAutoSize" | "api" | "columnApi" | "context" | "statusBar" | "sideBar" | "suppressContextMenu" | "preventDefaultOnContextMenu" | "allowContextMenuWithControlKey" | "suppressMenuHide" | "enableBrowserTooltips" | "tooltipShowDelay" | "tooltipHideDelay" | "tooltipMouseTrack" | "popupParent" | "copyHeadersToClipboard" | "copyGroupHeadersToClipboard" | "clipboardDeliminator" | "clipboardDelimiter" | "suppressCopyRowsToClipboard" | "suppressCopySingleCellRanges" | "suppressLastEmptyLineOnPaste" | "suppressClipboardPaste" | "suppressClipboardApi" | "suppressCutToClipboard" | "columnDefs" | "defaultColDef" | "defaultColGroupDef" | "columnTypes" | "maintainColumnOrder" | "suppressFieldDotNotation" | "headerHeight" | "groupHeaderHeight" | "floatingFiltersHeight" | "pivotHeaderHeight" | "pivotGroupHeaderHeight" | "allowDragFromColumnsToolPanel" | "suppressMovableColumns" | "suppressColumnMoveAnimation" | "suppressDragLeaveHidesColumns" | "suppressRowGroupHidesColumns" | "colResizeDefault" | "autoSizePadding" | "skipHeaderOnAutoSize" | "components" | "frameworkComponents" | "reactUi" | "suppressReactUi" | "editType" | "suppressClickEdit" | "readOnlyEdit" | "stopEditingWhenCellsLoseFocus" | "enterMovesDown" | "enterMovesDownAfterEdit" | "enableCellEditingOnBackspace" | "undoRedoCellEditing" | "undoRedoCellEditingLimit" | "defaultCsvExportParams" | "suppressCsvExport" | "defaultExcelExportParams" | "suppressExcelExport" | "excelStyles" | "quickFilterText" | "cacheQuickFilter" | "excludeHiddenColumnsFromQuickFilter" | "excludeChildrenWhenTreeDataFiltering" | "enableCharts" | "chartThemes" | "customChartThemes" | "chartThemeOverrides" | "enableChartToolPanelsButton" | "suppressChartToolPanelsButton" | "chartToolPanelsDef" | "loadingCellRenderer" | "loadingCellRendererFramework" | "loadingCellRendererParams" | "loadingCellRendererSelector" | "localeText" | "masterDetail" | "keepDetailRows" | "keepDetailRowsCount" | "detailCellRenderer" | "detailCellRendererFramework" | "detailCellRendererParams" | "detailRowHeight" | "detailRowAutoHeight" | "alignedGrids" | "rowBuffer" | "valueCache" | "valueCacheNeverExpires" | "enableCellExpressions" | "suppressParentsInRowNodes" | "suppressTouch" | "suppressFocusAfterRefresh" | "suppressAsyncEvents" | "suppressBrowserResizeObserver" | "suppressPropertyNamesCheck" | "suppressChangeDetection" | "debug" | "overlayLoadingTemplate" | "loadingOverlayComponent" | "loadingOverlayComponentFramework" | "loadingOverlayComponentParams" | "suppressLoadingOverlay" | "overlayNoRowsTemplate" | "noRowsOverlayComponent" | "noRowsOverlayComponentFramework" | "noRowsOverlayComponentParams" | "suppressNoRowsOverlay" | "pagination" | "paginationPageSize" | "paginationAutoPageSize" | "paginateChildRows" | "suppressPaginationPanel" | "pivotMode" | "pivotPanelShow" | "pivotColumnGroupTotals" | "pivotRowTotals" | "pivotSuppressAutoColumn" | "suppressExpandablePivotGroups" | "functionsReadOnly" | "aggFuncs" | "suppressAggFuncInHeader" | "suppressAggAtRootLevel" | "aggregateOnlyChangedColumns" | "suppressAggFilteredOnly" | "removePivotHeaderRowWhenSingleValueColumn" | "animateRows" | "cellFlashDelay" | "cellFadeDelay" | "allowShowChangeAfterFilter" | "domLayout" | "ensureDomOrder" | "enableRtl" | "suppressColumnVirtualisation" | "suppressMaxRenderedRowRestriction" | "suppressRowVirtualisation" | "rowDragManaged" | "suppressRowDrag" | "suppressMoveWhenRowDragging" | "rowDragEntireRow" | "rowDragMultiRow" | "fullWidthCellRenderer" | "fullWidthCellRendererFramework" | "fullWidthCellRendererParams" | "embedFullWidthRows" | "groupDisplayType" | "groupDefaultExpanded" | "autoGroupColumnDef" | "groupMaintainOrder" | "groupSelectsChildren" | "groupAggFiltering" | "groupIncludeFooter" | "groupIncludeTotalFooter" | "groupSuppressBlankHeader" | "groupSelectsFiltered" | "showOpenedGroup" | "groupRemoveSingleChildren" | "groupRemoveLowestSingleChildren" | "groupHideOpenParents" | "groupAllowUnbalanced" | "rowGroupPanelShow" | "groupRowRenderer" | "groupRowRendererFramework" | "groupRowRendererParams" | "suppressMakeColumnVisibleAfterUnGroup" | "treeData" | "rowGroupPanelSuppressSort" | "groupRowsSticky" | "rememberGroupStateWhenNewData" | "pinnedTopRowData" | "pinnedBottomRowData" | "rowModelType" | "rowData" | "immutableData" | "asyncTransactionWaitMillis" | "suppressModelUpdateAfterUpdateTransaction" | "datasource" | "cacheOverflowSize" | "infiniteInitialRowCount" | "serverSideInitialRowCount" | "serverSideStoreType" | "suppressServerSideInfiniteScroll" | "cacheBlockSize" | "maxBlocksInCache" | "maxConcurrentDatasourceRequests" | "blockLoadDebounceMillis" | "purgeClosedRowNodes" | "serverSideDatasource" | "serverSideSortAllLevels" | "serverSideFilterAllLevels" | "serverSideSortOnServer" | "serverSideFilterOnServer" | "serverSideSortingAlwaysResets" | "serverSideFilteringAlwaysResets" | "viewportDatasource" | "viewportRowModelPageSize" | "viewportRowModelBufferSize" | "alwaysShowHorizontalScroll" | "alwaysShowVerticalScroll" | "debounceVerticalScrollbar" | "suppressHorizontalScroll" | "suppressScrollOnNewData" | "suppressScrollWhenPopupsAreOpen" | "suppressAnimationFrame" | "suppressMiddleClickScrolls" | "suppressPreventDefaultOnMouseWheel" | "scrollbarWidth" | "rowSelection" | "rowMultiSelectWithClick" | "suppressRowDeselection" | "suppressRowClickSelection" | "suppressCellSelection" | "suppressCellFocus" | "suppressMultiRangeSelection" | "enableCellTextSelection" | "enableRangeSelection" | "enableRangeHandle" | "enableFillHandle" | "fillHandleDirection" | "suppressClearOnFillReduction" | "accentedSort" | "suppressMultiSort" | "alwaysMultiSort" | "multiSortKey" | "suppressMaintainUnsortedOrder" | "rowHeight" | "rowStyle" | "rowClass" | "rowClassRules" | "suppressRowHoverHighlight" | "suppressRowTransform" | "columnHoverHighlight" | "deltaSort" | "treeDataDisplayType" | "functionsPassive" | "enableGroupEdit" | "getContextMenuItems" | "getMainMenuItems" | "postProcessPopup" | "processCellForClipboard" | "processHeaderForClipboard" | "processGroupHeaderForClipboard" | "processCellFromClipboard" | "sendToClipboard" | "processDataFromClipboard" | "isExternalFilterPresent" | "doesExternalFilterPass" | "getChartToolbarItems" | "createChartContainer" | "navigateToNextHeader" | "tabToNextHeader" | "navigateToNextCell" | "tabToNextCell" | "localeTextFunc" | "getLocaleText" | "getDocument" | "paginationNumberFormatter" | "groupRowAggNodes" | "getGroupRowAgg" | "isGroupOpenByDefault" | "initialGroupOrderComparator" | "defaultGroupOrderComparator" | "processSecondaryColDef" | "processSecondaryColGroupDef" | "processPivotResultColDef" | "processPivotResultColGroupDef" | "getDataPath" | "getChildCount" | "getServerSideGroupLevelParams" | "getServerSideStoreParams" | "isServerSideGroupOpenByDefault" | "isApplyServerSideTransaction" | "isServerSideGroup" | "getServerSideGroupKey" | "getBusinessKeyForNode" | "getRowNodeId" | "getRowId" | "resetRowDataOnUpdate" | "processRowPostCreate" | "isRowSelectable" | "isRowMaster" | "fillOperation" | "postSort" | "postSortRows" | "getRowStyle" | "getRowClass" | "getRowHeight" | "isFullWidthCell" | "isFullWidthRow" | "onToolPanelVisibleChanged" | "onToolPanelSizeChanged" | "onPasteStart" | "onPasteEnd" | "onColumnVisible" | "onColumnPinned" | "onColumnResized" | "onColumnMoved" | "onColumnValueChanged" | "onColumnPivotModeChanged" | "onColumnPivotChanged" | "onColumnGroupOpened" | "onNewColumnsLoaded" | "onGridColumnsChanged" | "onDisplayedColumnsChanged" | "onVirtualColumnsChanged" | "onColumnEverythingChanged" | "onComponentStateChanged" | "onCellEditRequest" | "onRowValueChanged" | "onCellEditingStarted" | "onCellEditingStopped" | "onRowEditingStarted" | "onRowEditingStopped" | "onUndoStarted" | "onUndoEnded" | "onRedoStarted" | "onRedoEnded" | "onFilterOpened" | "onFilterChanged" | "onFilterModified" | "onChartCreated" | "onChartRangeSelectionChanged" | "onChartOptionsChanged" | "onChartDestroyed" | "onCellKeyDown" | "onCellKeyPress" | "onGridReady" | "onFirstDataRendered" | "onGridSizeChanged" | "onModelUpdated" | "onVirtualRowRemoved" | "onViewportChanged" | "onBodyScroll" | "onBodyScrollEnd" | "onDragStarted" | "onDragStopped" | "onPaginationChanged" | "onRowDragEnter" | "onRowDragMove" | "onRowDragLeave" | "onRowDragEnd" | "onColumnRowGroupChanged" | "onRowGroupOpened" | "onExpandOrCollapseAll" | "onPinnedRowDataChanged" | "onRowDataChanged" | "onRowDataUpdated" | "onAsyncTransactionsFlushed" | "onStoreRefreshed" | "onCellFocused" | "onCellMouseOver" | "onCellMouseOut" | "onCellMouseDown" | "onRowClicked" | "onRowDoubleClicked" | "onRowSelected" | "onSelectionChanged" | "onRangeSelectionChanged" | "onSortChanged" | "onColumnRowGroupChangeRequest" | "onColumnPivotChangeRequest" | "onColumnValueChangeRequest" | "onColumnAggFuncChangeRequest")[];
    static ALL_PROPERTIES: ("tabIndex" | "icons" | "singleClickEdit" | "onCellValueChanged" | "onCellClicked" | "onCellDoubleClicked" | "onCellContextMenu" | "enableCellChangeFlash" | "rowDragText" | "sortingOrder" | "unSortIcon" | "suppressAutoSize" | "api" | "columnApi" | "context" | "statusBar" | "sideBar" | "suppressContextMenu" | "preventDefaultOnContextMenu" | "allowContextMenuWithControlKey" | "suppressMenuHide" | "enableBrowserTooltips" | "tooltipShowDelay" | "tooltipHideDelay" | "tooltipMouseTrack" | "popupParent" | "copyHeadersToClipboard" | "copyGroupHeadersToClipboard" | "clipboardDeliminator" | "clipboardDelimiter" | "suppressCopyRowsToClipboard" | "suppressCopySingleCellRanges" | "suppressLastEmptyLineOnPaste" | "suppressClipboardPaste" | "suppressClipboardApi" | "suppressCutToClipboard" | "columnDefs" | "defaultColDef" | "defaultColGroupDef" | "columnTypes" | "maintainColumnOrder" | "suppressFieldDotNotation" | "headerHeight" | "groupHeaderHeight" | "floatingFiltersHeight" | "pivotHeaderHeight" | "pivotGroupHeaderHeight" | "allowDragFromColumnsToolPanel" | "suppressMovableColumns" | "suppressColumnMoveAnimation" | "suppressDragLeaveHidesColumns" | "suppressRowGroupHidesColumns" | "colResizeDefault" | "autoSizePadding" | "skipHeaderOnAutoSize" | "components" | "frameworkComponents" | "reactUi" | "suppressReactUi" | "editType" | "suppressClickEdit" | "readOnlyEdit" | "stopEditingWhenCellsLoseFocus" | "enterMovesDown" | "enterMovesDownAfterEdit" | "enableCellEditingOnBackspace" | "undoRedoCellEditing" | "undoRedoCellEditingLimit" | "defaultCsvExportParams" | "suppressCsvExport" | "defaultExcelExportParams" | "suppressExcelExport" | "excelStyles" | "quickFilterText" | "cacheQuickFilter" | "excludeHiddenColumnsFromQuickFilter" | "excludeChildrenWhenTreeDataFiltering" | "enableCharts" | "chartThemes" | "customChartThemes" | "chartThemeOverrides" | "enableChartToolPanelsButton" | "suppressChartToolPanelsButton" | "chartToolPanelsDef" | "loadingCellRenderer" | "loadingCellRendererFramework" | "loadingCellRendererParams" | "loadingCellRendererSelector" | "localeText" | "masterDetail" | "keepDetailRows" | "keepDetailRowsCount" | "detailCellRenderer" | "detailCellRendererFramework" | "detailCellRendererParams" | "detailRowHeight" | "detailRowAutoHeight" | "alignedGrids" | "rowBuffer" | "valueCache" | "valueCacheNeverExpires" | "enableCellExpressions" | "suppressParentsInRowNodes" | "suppressTouch" | "suppressFocusAfterRefresh" | "suppressAsyncEvents" | "suppressBrowserResizeObserver" | "suppressPropertyNamesCheck" | "suppressChangeDetection" | "debug" | "overlayLoadingTemplate" | "loadingOverlayComponent" | "loadingOverlayComponentFramework" | "loadingOverlayComponentParams" | "suppressLoadingOverlay" | "overlayNoRowsTemplate" | "noRowsOverlayComponent" | "noRowsOverlayComponentFramework" | "noRowsOverlayComponentParams" | "suppressNoRowsOverlay" | "pagination" | "paginationPageSize" | "paginationAutoPageSize" | "paginateChildRows" | "suppressPaginationPanel" | "pivotMode" | "pivotPanelShow" | "pivotColumnGroupTotals" | "pivotRowTotals" | "pivotSuppressAutoColumn" | "suppressExpandablePivotGroups" | "functionsReadOnly" | "aggFuncs" | "suppressAggFuncInHeader" | "suppressAggAtRootLevel" | "aggregateOnlyChangedColumns" | "suppressAggFilteredOnly" | "removePivotHeaderRowWhenSingleValueColumn" | "animateRows" | "cellFlashDelay" | "cellFadeDelay" | "allowShowChangeAfterFilter" | "domLayout" | "ensureDomOrder" | "enableRtl" | "suppressColumnVirtualisation" | "suppressMaxRenderedRowRestriction" | "suppressRowVirtualisation" | "rowDragManaged" | "suppressRowDrag" | "suppressMoveWhenRowDragging" | "rowDragEntireRow" | "rowDragMultiRow" | "fullWidthCellRenderer" | "fullWidthCellRendererFramework" | "fullWidthCellRendererParams" | "embedFullWidthRows" | "groupDisplayType" | "groupDefaultExpanded" | "autoGroupColumnDef" | "groupMaintainOrder" | "groupSelectsChildren" | "groupAggFiltering" | "groupIncludeFooter" | "groupIncludeTotalFooter" | "groupSuppressBlankHeader" | "groupSelectsFiltered" | "showOpenedGroup" | "groupRemoveSingleChildren" | "groupRemoveLowestSingleChildren" | "groupHideOpenParents" | "groupAllowUnbalanced" | "rowGroupPanelShow" | "groupRowRenderer" | "groupRowRendererFramework" | "groupRowRendererParams" | "suppressMakeColumnVisibleAfterUnGroup" | "treeData" | "rowGroupPanelSuppressSort" | "groupRowsSticky" | "rememberGroupStateWhenNewData" | "pinnedTopRowData" | "pinnedBottomRowData" | "rowModelType" | "rowData" | "immutableData" | "asyncTransactionWaitMillis" | "suppressModelUpdateAfterUpdateTransaction" | "datasource" | "cacheOverflowSize" | "infiniteInitialRowCount" | "serverSideInitialRowCount" | "serverSideStoreType" | "suppressServerSideInfiniteScroll" | "cacheBlockSize" | "maxBlocksInCache" | "maxConcurrentDatasourceRequests" | "blockLoadDebounceMillis" | "purgeClosedRowNodes" | "serverSideDatasource" | "serverSideSortAllLevels" | "serverSideFilterAllLevels" | "serverSideSortOnServer" | "serverSideFilterOnServer" | "serverSideSortingAlwaysResets" | "serverSideFilteringAlwaysResets" | "viewportDatasource" | "viewportRowModelPageSize" | "viewportRowModelBufferSize" | "alwaysShowHorizontalScroll" | "alwaysShowVerticalScroll" | "debounceVerticalScrollbar" | "suppressHorizontalScroll" | "suppressScrollOnNewData" | "suppressScrollWhenPopupsAreOpen" | "suppressAnimationFrame" | "suppressMiddleClickScrolls" | "suppressPreventDefaultOnMouseWheel" | "scrollbarWidth" | "rowSelection" | "rowMultiSelectWithClick" | "suppressRowDeselection" | "suppressRowClickSelection" | "suppressCellSelection" | "suppressCellFocus" | "suppressMultiRangeSelection" | "enableCellTextSelection" | "enableRangeSelection" | "enableRangeHandle" | "enableFillHandle" | "fillHandleDirection" | "suppressClearOnFillReduction" | "accentedSort" | "suppressMultiSort" | "alwaysMultiSort" | "multiSortKey" | "suppressMaintainUnsortedOrder" | "rowHeight" | "rowStyle" | "rowClass" | "rowClassRules" | "suppressRowHoverHighlight" | "suppressRowTransform" | "columnHoverHighlight" | "deltaSort" | "treeDataDisplayType" | "functionsPassive" | "enableGroupEdit" | "getContextMenuItems" | "getMainMenuItems" | "postProcessPopup" | "processCellForClipboard" | "processHeaderForClipboard" | "processGroupHeaderForClipboard" | "processCellFromClipboard" | "sendToClipboard" | "processDataFromClipboard" | "isExternalFilterPresent" | "doesExternalFilterPass" | "getChartToolbarItems" | "createChartContainer" | "navigateToNextHeader" | "tabToNextHeader" | "navigateToNextCell" | "tabToNextCell" | "localeTextFunc" | "getLocaleText" | "getDocument" | "paginationNumberFormatter" | "groupRowAggNodes" | "getGroupRowAgg" | "isGroupOpenByDefault" | "initialGroupOrderComparator" | "defaultGroupOrderComparator" | "processSecondaryColDef" | "processSecondaryColGroupDef" | "processPivotResultColDef" | "processPivotResultColGroupDef" | "getDataPath" | "getChildCount" | "getServerSideGroupLevelParams" | "getServerSideStoreParams" | "isServerSideGroupOpenByDefault" | "isApplyServerSideTransaction" | "isServerSideGroup" | "getServerSideGroupKey" | "getBusinessKeyForNode" | "getRowNodeId" | "getRowId" | "resetRowDataOnUpdate" | "processRowPostCreate" | "isRowSelectable" | "isRowMaster" | "fillOperation" | "postSort" | "postSortRows" | "getRowStyle" | "getRowClass" | "getRowHeight" | "isFullWidthCell" | "isFullWidthRow" | "onToolPanelVisibleChanged" | "onToolPanelSizeChanged" | "onPasteStart" | "onPasteEnd" | "onColumnVisible" | "onColumnPinned" | "onColumnResized" | "onColumnMoved" | "onColumnValueChanged" | "onColumnPivotModeChanged" | "onColumnPivotChanged" | "onColumnGroupOpened" | "onNewColumnsLoaded" | "onGridColumnsChanged" | "onDisplayedColumnsChanged" | "onVirtualColumnsChanged" | "onColumnEverythingChanged" | "onComponentStateChanged" | "onCellEditRequest" | "onRowValueChanged" | "onCellEditingStarted" | "onCellEditingStopped" | "onRowEditingStarted" | "onRowEditingStopped" | "onUndoStarted" | "onUndoEnded" | "onRedoStarted" | "onRedoEnded" | "onFilterOpened" | "onFilterChanged" | "onFilterModified" | "onChartCreated" | "onChartRangeSelectionChanged" | "onChartOptionsChanged" | "onChartDestroyed" | "onCellKeyDown" | "onCellKeyPress" | "onGridReady" | "onFirstDataRendered" | "onGridSizeChanged" | "onModelUpdated" | "onVirtualRowRemoved" | "onViewportChanged" | "onBodyScroll" | "onBodyScrollEnd" | "onDragStarted" | "onDragStopped" | "onPaginationChanged" | "onRowDragEnter" | "onRowDragMove" | "onRowDragLeave" | "onRowDragEnd" | "onColumnRowGroupChanged" | "onRowGroupOpened" | "onExpandOrCollapseAll" | "onPinnedRowDataChanged" | "onRowDataChanged" | "onRowDataUpdated" | "onAsyncTransactionsFlushed" | "onStoreRefreshed" | "onCellFocused" | "onCellMouseOver" | "onCellMouseOut" | "onCellMouseDown" | "onRowClicked" | "onRowDoubleClicked" | "onRowSelected" | "onSelectionChanged" | "onRangeSelectionChanged" | "onSortChanged" | "onColumnRowGroupChangeRequest" | "onColumnPivotChangeRequest" | "onColumnValueChangeRequest" | "onColumnAggFuncChangeRequest")[];
    static ALL_PROPERTIES_SET: Set<"tabIndex" | "icons" | "singleClickEdit" | "onCellValueChanged" | "onCellClicked" | "onCellDoubleClicked" | "onCellContextMenu" | "enableCellChangeFlash" | "rowDragText" | "sortingOrder" | "unSortIcon" | "suppressAutoSize" | "api" | "columnApi" | "context" | "statusBar" | "sideBar" | "suppressContextMenu" | "preventDefaultOnContextMenu" | "allowContextMenuWithControlKey" | "suppressMenuHide" | "enableBrowserTooltips" | "tooltipShowDelay" | "tooltipHideDelay" | "tooltipMouseTrack" | "popupParent" | "copyHeadersToClipboard" | "copyGroupHeadersToClipboard" | "clipboardDeliminator" | "clipboardDelimiter" | "suppressCopyRowsToClipboard" | "suppressCopySingleCellRanges" | "suppressLastEmptyLineOnPaste" | "suppressClipboardPaste" | "suppressClipboardApi" | "suppressCutToClipboard" | "columnDefs" | "defaultColDef" | "defaultColGroupDef" | "columnTypes" | "maintainColumnOrder" | "suppressFieldDotNotation" | "headerHeight" | "groupHeaderHeight" | "floatingFiltersHeight" | "pivotHeaderHeight" | "pivotGroupHeaderHeight" | "allowDragFromColumnsToolPanel" | "suppressMovableColumns" | "suppressColumnMoveAnimation" | "suppressDragLeaveHidesColumns" | "suppressRowGroupHidesColumns" | "colResizeDefault" | "autoSizePadding" | "skipHeaderOnAutoSize" | "components" | "frameworkComponents" | "reactUi" | "suppressReactUi" | "editType" | "suppressClickEdit" | "readOnlyEdit" | "stopEditingWhenCellsLoseFocus" | "enterMovesDown" | "enterMovesDownAfterEdit" | "enableCellEditingOnBackspace" | "undoRedoCellEditing" | "undoRedoCellEditingLimit" | "defaultCsvExportParams" | "suppressCsvExport" | "defaultExcelExportParams" | "suppressExcelExport" | "excelStyles" | "quickFilterText" | "cacheQuickFilter" | "excludeHiddenColumnsFromQuickFilter" | "excludeChildrenWhenTreeDataFiltering" | "enableCharts" | "chartThemes" | "customChartThemes" | "chartThemeOverrides" | "enableChartToolPanelsButton" | "suppressChartToolPanelsButton" | "chartToolPanelsDef" | "loadingCellRenderer" | "loadingCellRendererFramework" | "loadingCellRendererParams" | "loadingCellRendererSelector" | "localeText" | "masterDetail" | "keepDetailRows" | "keepDetailRowsCount" | "detailCellRenderer" | "detailCellRendererFramework" | "detailCellRendererParams" | "detailRowHeight" | "detailRowAutoHeight" | "alignedGrids" | "rowBuffer" | "valueCache" | "valueCacheNeverExpires" | "enableCellExpressions" | "suppressParentsInRowNodes" | "suppressTouch" | "suppressFocusAfterRefresh" | "suppressAsyncEvents" | "suppressBrowserResizeObserver" | "suppressPropertyNamesCheck" | "suppressChangeDetection" | "debug" | "overlayLoadingTemplate" | "loadingOverlayComponent" | "loadingOverlayComponentFramework" | "loadingOverlayComponentParams" | "suppressLoadingOverlay" | "overlayNoRowsTemplate" | "noRowsOverlayComponent" | "noRowsOverlayComponentFramework" | "noRowsOverlayComponentParams" | "suppressNoRowsOverlay" | "pagination" | "paginationPageSize" | "paginationAutoPageSize" | "paginateChildRows" | "suppressPaginationPanel" | "pivotMode" | "pivotPanelShow" | "pivotColumnGroupTotals" | "pivotRowTotals" | "pivotSuppressAutoColumn" | "suppressExpandablePivotGroups" | "functionsReadOnly" | "aggFuncs" | "suppressAggFuncInHeader" | "suppressAggAtRootLevel" | "aggregateOnlyChangedColumns" | "suppressAggFilteredOnly" | "removePivotHeaderRowWhenSingleValueColumn" | "animateRows" | "cellFlashDelay" | "cellFadeDelay" | "allowShowChangeAfterFilter" | "domLayout" | "ensureDomOrder" | "enableRtl" | "suppressColumnVirtualisation" | "suppressMaxRenderedRowRestriction" | "suppressRowVirtualisation" | "rowDragManaged" | "suppressRowDrag" | "suppressMoveWhenRowDragging" | "rowDragEntireRow" | "rowDragMultiRow" | "fullWidthCellRenderer" | "fullWidthCellRendererFramework" | "fullWidthCellRendererParams" | "embedFullWidthRows" | "groupDisplayType" | "groupDefaultExpanded" | "autoGroupColumnDef" | "groupMaintainOrder" | "groupSelectsChildren" | "groupAggFiltering" | "groupIncludeFooter" | "groupIncludeTotalFooter" | "groupSuppressBlankHeader" | "groupSelectsFiltered" | "showOpenedGroup" | "groupRemoveSingleChildren" | "groupRemoveLowestSingleChildren" | "groupHideOpenParents" | "groupAllowUnbalanced" | "rowGroupPanelShow" | "groupRowRenderer" | "groupRowRendererFramework" | "groupRowRendererParams" | "suppressMakeColumnVisibleAfterUnGroup" | "treeData" | "rowGroupPanelSuppressSort" | "groupRowsSticky" | "rememberGroupStateWhenNewData" | "pinnedTopRowData" | "pinnedBottomRowData" | "rowModelType" | "rowData" | "immutableData" | "asyncTransactionWaitMillis" | "suppressModelUpdateAfterUpdateTransaction" | "datasource" | "cacheOverflowSize" | "infiniteInitialRowCount" | "serverSideInitialRowCount" | "serverSideStoreType" | "suppressServerSideInfiniteScroll" | "cacheBlockSize" | "maxBlocksInCache" | "maxConcurrentDatasourceRequests" | "blockLoadDebounceMillis" | "purgeClosedRowNodes" | "serverSideDatasource" | "serverSideSortAllLevels" | "serverSideFilterAllLevels" | "serverSideSortOnServer" | "serverSideFilterOnServer" | "serverSideSortingAlwaysResets" | "serverSideFilteringAlwaysResets" | "viewportDatasource" | "viewportRowModelPageSize" | "viewportRowModelBufferSize" | "alwaysShowHorizontalScroll" | "alwaysShowVerticalScroll" | "debounceVerticalScrollbar" | "suppressHorizontalScroll" | "suppressScrollOnNewData" | "suppressScrollWhenPopupsAreOpen" | "suppressAnimationFrame" | "suppressMiddleClickScrolls" | "suppressPreventDefaultOnMouseWheel" | "scrollbarWidth" | "rowSelection" | "rowMultiSelectWithClick" | "suppressRowDeselection" | "suppressRowClickSelection" | "suppressCellSelection" | "suppressCellFocus" | "suppressMultiRangeSelection" | "enableCellTextSelection" | "enableRangeSelection" | "enableRangeHandle" | "enableFillHandle" | "fillHandleDirection" | "suppressClearOnFillReduction" | "accentedSort" | "suppressMultiSort" | "alwaysMultiSort" | "multiSortKey" | "suppressMaintainUnsortedOrder" | "rowHeight" | "rowStyle" | "rowClass" | "rowClassRules" | "suppressRowHoverHighlight" | "suppressRowTransform" | "columnHoverHighlight" | "deltaSort" | "treeDataDisplayType" | "functionsPassive" | "enableGroupEdit" | "getContextMenuItems" | "getMainMenuItems" | "postProcessPopup" | "processCellForClipboard" | "processHeaderForClipboard" | "processGroupHeaderForClipboard" | "processCellFromClipboard" | "sendToClipboard" | "processDataFromClipboard" | "isExternalFilterPresent" | "doesExternalFilterPass" | "getChartToolbarItems" | "createChartContainer" | "navigateToNextHeader" | "tabToNextHeader" | "navigateToNextCell" | "tabToNextCell" | "localeTextFunc" | "getLocaleText" | "getDocument" | "paginationNumberFormatter" | "groupRowAggNodes" | "getGroupRowAgg" | "isGroupOpenByDefault" | "initialGroupOrderComparator" | "defaultGroupOrderComparator" | "processSecondaryColDef" | "processSecondaryColGroupDef" | "processPivotResultColDef" | "processPivotResultColGroupDef" | "getDataPath" | "getChildCount" | "getServerSideGroupLevelParams" | "getServerSideStoreParams" | "isServerSideGroupOpenByDefault" | "isApplyServerSideTransaction" | "isServerSideGroup" | "getServerSideGroupKey" | "getBusinessKeyForNode" | "getRowNodeId" | "getRowId" | "resetRowDataOnUpdate" | "processRowPostCreate" | "isRowSelectable" | "isRowMaster" | "fillOperation" | "postSort" | "postSortRows" | "getRowStyle" | "getRowClass" | "getRowHeight" | "isFullWidthCell" | "isFullWidthRow" | "onToolPanelVisibleChanged" | "onToolPanelSizeChanged" | "onPasteStart" | "onPasteEnd" | "onColumnVisible" | "onColumnPinned" | "onColumnResized" | "onColumnMoved" | "onColumnValueChanged" | "onColumnPivotModeChanged" | "onColumnPivotChanged" | "onColumnGroupOpened" | "onNewColumnsLoaded" | "onGridColumnsChanged" | "onDisplayedColumnsChanged" | "onVirtualColumnsChanged" | "onColumnEverythingChanged" | "onComponentStateChanged" | "onCellEditRequest" | "onRowValueChanged" | "onCellEditingStarted" | "onCellEditingStopped" | "onRowEditingStarted" | "onRowEditingStopped" | "onUndoStarted" | "onUndoEnded" | "onRedoStarted" | "onRedoEnded" | "onFilterOpened" | "onFilterChanged" | "onFilterModified" | "onChartCreated" | "onChartRangeSelectionChanged" | "onChartOptionsChanged" | "onChartDestroyed" | "onCellKeyDown" | "onCellKeyPress" | "onGridReady" | "onFirstDataRendered" | "onGridSizeChanged" | "onModelUpdated" | "onVirtualRowRemoved" | "onViewportChanged" | "onBodyScroll" | "onBodyScrollEnd" | "onDragStarted" | "onDragStopped" | "onPaginationChanged" | "onRowDragEnter" | "onRowDragMove" | "onRowDragLeave" | "onRowDragEnd" | "onColumnRowGroupChanged" | "onRowGroupOpened" | "onExpandOrCollapseAll" | "onPinnedRowDataChanged" | "onRowDataChanged" | "onRowDataUpdated" | "onAsyncTransactionsFlushed" | "onStoreRefreshed" | "onCellFocused" | "onCellMouseOver" | "onCellMouseOut" | "onCellMouseDown" | "onRowClicked" | "onRowDoubleClicked" | "onRowSelected" | "onSelectionChanged" | "onRangeSelectionChanged" | "onSortChanged" | "onColumnRowGroupChangeRequest" | "onColumnPivotChangeRequest" | "onColumnValueChangeRequest" | "onColumnAggFuncChangeRequest">;
    private static getCoercionLookup;
    private static coercionLookup;
    private static getValue;
    private static getGridOptionKeys;
    static copyAttributesToGridOptions(gridOptions: GridOptions | undefined, component: any, isVue?: boolean): GridOptions;
    static processOnChange(changes: any, api: GridApi): void;
    static toBoolean(value: any): boolean;
    static toNumber(value: any): number | undefined;
}
