var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { _, Autowired, Component } from "@ag-grid-community/core";
export class RichSelectRow extends Component {
    constructor(params) {
        super(/* html */ `<div class="ag-rich-select-row"></div>`);
        this.params = params;
    }
    setState(value, valueFormatted, selected) {
        const rendererSuccessful = this.populateWithRenderer(value, valueFormatted);
        if (!rendererSuccessful) {
            this.populateWithoutRenderer(value, valueFormatted);
        }
        this.addOrRemoveCssClass('ag-rich-select-row-selected', selected);
    }
    populateWithoutRenderer(value, valueFormatted) {
        const valueFormattedExits = valueFormatted !== null && valueFormatted !== undefined;
        const valueToRender = valueFormattedExits ? valueFormatted : value;
        if (_.exists(valueToRender) && valueToRender !== '') {
            // not using innerHTML to prevent injection of HTML
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#Security_considerations
            this.getGui().textContent = valueToRender.toString();
        }
        else {
            // putting in blank, so if missing, at least the user can click on it
            this.getGui().innerHTML = '&nbsp;';
        }
    }
    populateWithRenderer(value, valueFormatted) {
        // bad coder here - we are not populating all values of the cellRendererParams
        const params = {
            value: value,
            valueFormatted: valueFormatted,
            api: this.gridOptionsWrapper.getApi()
        };
        const compDetails = this.userComponentFactory.getCellRendererDetails(this.params, params);
        const cellRendererPromise = compDetails ? compDetails.newAgStackInstance() : undefined;
        if (cellRendererPromise != null) {
            _.bindCellRendererToHtmlElement(cellRendererPromise, this.getGui());
        }
        else {
            this.getGui().innerText = params.valueFormatted != null ? params.valueFormatted : params.value;
        }
        if (cellRendererPromise) {
            cellRendererPromise.then(childComponent => {
                this.addDestroyFunc(() => {
                    this.getContext().destroyBean(childComponent);
                });
            });
            return true;
        }
        return false;
    }
}
__decorate([
    Autowired('userComponentFactory')
], RichSelectRow.prototype, "userComponentFactory", void 0);
//# sourceMappingURL=richSelectRow.js.map