import { BeanStub } from "../../../context/beanStub";
import { Column } from "../../../entities/column";
import { HeaderCellCtrl, IHeaderCellComp } from "./headerCellCtrl";
export declare class ResizeFeature extends BeanStub {
    private horizontalResizeService;
    private columnModel;
    private pinned;
    private column;
    private eResize;
    private comp;
    private resizeStartWidth;
    private resizeWithShiftKey;
    private ctrl;
    constructor(pinned: string | null, column: Column, eResize: HTMLElement, comp: IHeaderCellComp, ctrl: HeaderCellCtrl);
    private postConstruct;
    private onResizing;
    private onResizeStart;
    private normaliseResizeAmount;
}
