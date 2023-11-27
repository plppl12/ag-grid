var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Bean, Autowired, PostConstruct } from './context/context';
import { BeanStub } from "./context/beanStub";
import { exists } from './utils/generic';
import { Events } from './eventKeys';
var DEFAULT_ROW_HEIGHT = 25;
var MIN_COL_WIDTH = 10;
var MAT_GRID_SIZE = 8;
var BASE_GRID_SIZE = 4;
var BALHAM_GRID_SIZE = 4;
var ALPINE_GRID_SIZE = 6;
var QUARTZ_ICON_SIZE = 16;
var QUARTZ_FONT_SIZE = 14;
var QUARTZ_GRID_SIZE = 8;
var HARD_CODED_SIZES = {
    // this item is required for custom themes
    'ag-theme-custom': {
        headerHeight: 25,
        headerCellMinWidth: 24,
        listItemHeight: BASE_GRID_SIZE * 5,
        rowHeight: 25,
        chartMenuPanelWidth: 220
    },
    'ag-theme-material': {
        headerHeight: MAT_GRID_SIZE * 7,
        headerCellMinWidth: 48,
        listItemHeight: MAT_GRID_SIZE * 4,
        rowHeight: MAT_GRID_SIZE * 6,
        chartMenuPanelWidth: 240
    },
    'ag-theme-balham': {
        headerHeight: BALHAM_GRID_SIZE * 8,
        headerCellMinWidth: 24,
        listItemHeight: BALHAM_GRID_SIZE * 6,
        rowHeight: BALHAM_GRID_SIZE * 7,
        chartMenuPanelWidth: 220
    },
    'ag-theme-alpine': {
        headerHeight: ALPINE_GRID_SIZE * 8,
        headerCellMinWidth: 36,
        listItemHeight: ALPINE_GRID_SIZE * 4,
        rowHeight: ALPINE_GRID_SIZE * 7,
        chartMenuPanelWidth: 240
    },
    'ag-theme-quartz': {
        headerHeight: QUARTZ_FONT_SIZE + QUARTZ_GRID_SIZE * 4.25,
        headerCellMinWidth: 36,
        listItemHeight: QUARTZ_ICON_SIZE + QUARTZ_GRID_SIZE,
        rowHeight: QUARTZ_FONT_SIZE + QUARTZ_GRID_SIZE * 3.5,
        chartMenuPanelWidth: 260
    }
};
/**
 * this object contains a list of Sass variables and an array
 * of CSS styles required to get the correct value.
 * eg. $virtual-item-height requires a structure, so we can get its height.
 * <div class="ag-theme-balham">
 *     <div class="ag-virtual-list-container">
 *         <div class="ag-virtual-list-item"></div>
 *     </div>
 * </div>
 */
var SASS_PROPERTY_BUILDER = {
    headerHeight: ['ag-header-row'],
    headerCellMinWidth: ['ag-header-cell'],
    listItemHeight: ['ag-virtual-list-item'],
    rowHeight: ['ag-row'],
    chartMenuPanelWidth: ['ag-chart-docked-container']
};
var Environment = /** @class */ (function (_super) {
    __extends(Environment, _super);
    function Environment() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.calculatedSizes = {};
        return _this;
    }
    Environment.prototype.postConstruct = function () {
        var _this = this;
        var _a;
        var el = (_a = this.getTheme().el) !== null && _a !== void 0 ? _a : this.eGridDiv;
        this.addManagedPropertyListener('rowHeight', function () { return _this.refreshRowHeightVariable(); });
        this.mutationObserver = new MutationObserver(function () {
            _this.calculatedSizes = {};
            _this.fireGridStylesChangedEvent();
        });
        this.mutationObserver.observe(el || this.eGridDiv, {
            attributes: true,
            attributeFilter: ['class']
        });
    };
    Environment.prototype.fireGridStylesChangedEvent = function () {
        var event = {
            type: Events.EVENT_GRID_STYLES_CHANGED
        };
        this.eventService.dispatchEvent(event);
    };
    Environment.prototype.getSassVariable = function (key) {
        var _a = this.getTheme(), themeFamily = _a.themeFamily, el = _a.el;
        if (!themeFamily || themeFamily.indexOf('ag-theme') !== 0) {
            return;
        }
        if (!this.calculatedSizes) {
            this.calculatedSizes = {};
        }
        if (!this.calculatedSizes[themeFamily]) {
            this.calculatedSizes[themeFamily] = {};
        }
        var size = this.calculatedSizes[themeFamily][key];
        if (size != null) {
            return size;
        }
        this.calculatedSizes[themeFamily][key] = this.calculateValueForSassProperty(key, themeFamily, el);
        return this.calculatedSizes[themeFamily][key];
    };
    Environment.prototype.calculateValueForSassProperty = function (property, theme, themeElement) {
        var _a;
        var useTheme = 'ag-theme-' + (theme.match('material') ? 'material' : theme.match('balham') ? 'balham' : theme.match('alpine') ? 'alpine' : 'custom');
        var defaultValue = HARD_CODED_SIZES[useTheme][property];
        var eDocument = this.gridOptionsService.getDocument();
        if (!themeElement) {
            themeElement = this.eGridDiv;
        }
        if (!SASS_PROPERTY_BUILDER[property]) {
            return defaultValue;
        }
        var classList = SASS_PROPERTY_BUILDER[property];
        var div = eDocument.createElement('div');
        // this will apply SASS variables that were manually added to the current theme
        var classesFromThemeElement = Array.from(themeElement.classList);
        (_a = div.classList).add.apply(_a, __spreadArray([theme], __read(classesFromThemeElement), false));
        div.style.position = 'absolute';
        var el = classList.reduce(function (prevEl, currentClass) {
            var currentDiv = eDocument.createElement('div');
            currentDiv.style.position = 'static';
            currentDiv.classList.add(currentClass);
            prevEl.appendChild(currentDiv);
            return currentDiv;
        }, div);
        var calculatedValue = 0;
        if (eDocument.body) {
            eDocument.body.appendChild(div);
            var sizeName = property.toLowerCase().indexOf('height') !== -1 ? 'height' : 'width';
            calculatedValue = parseInt(window.getComputedStyle(el)[sizeName], 10);
            eDocument.body.removeChild(div);
        }
        return calculatedValue || defaultValue;
    };
    Environment.prototype.isThemeDark = function () {
        var theme = this.getTheme().theme;
        return !!theme && theme.indexOf('dark') >= 0;
    };
    Environment.prototype.chartMenuPanelWidth = function () {
        return this.getSassVariable('chartMenuPanelWidth');
    };
    Environment.prototype.getTheme = function () {
        var reg = /\bag-(material|(?:theme-([\w\-]*)))\b/g;
        var el = this.eGridDiv;
        var themeMatch = null;
        var allThemes = [];
        while (el) {
            themeMatch = reg.exec(el.className);
            if (!themeMatch) {
                el = el.parentElement || undefined;
            }
            else {
                var matched = el.className.match(reg);
                if (matched) {
                    allThemes = matched;
                }
                break;
            }
        }
        if (!themeMatch) {
            return { allThemes: allThemes };
        }
        var theme = themeMatch[0];
        return { theme: theme, el: el, themeFamily: theme.replace(/-dark$/, ''), allThemes: allThemes };
    };
    Environment.prototype.getFromTheme = function (defaultValue, sassVariableName) {
        var _a;
        return (_a = this.getSassVariable(sassVariableName)) !== null && _a !== void 0 ? _a : defaultValue;
    };
    Environment.prototype.getDefaultRowHeight = function () {
        return this.getFromTheme(DEFAULT_ROW_HEIGHT, 'rowHeight');
    };
    Environment.prototype.getListItemHeight = function () {
        return this.getFromTheme(20, 'listItemHeight');
    };
    Environment.prototype.refreshRowHeightVariable = function () {
        var oldRowHeight = this.eGridDiv.style.getPropertyValue('--ag-line-height').trim();
        var height = this.gridOptionsService.get('rowHeight');
        if (height == null || isNaN(height) || !isFinite(height)) {
            if (oldRowHeight !== null) {
                this.eGridDiv.style.setProperty('--ag-line-height', null);
            }
            return -1;
        }
        var newRowHeight = "".concat(height, "px");
        if (oldRowHeight != newRowHeight) {
            this.eGridDiv.style.setProperty('--ag-line-height', newRowHeight);
            return height;
        }
        return oldRowHeight != '' ? parseFloat(oldRowHeight) : -1;
    };
    Environment.prototype.getMinColWidth = function () {
        var measuredMin = this.getFromTheme(null, 'headerCellMinWidth');
        return exists(measuredMin) ? Math.max(measuredMin, MIN_COL_WIDTH) : MIN_COL_WIDTH;
    };
    Environment.prototype.destroy = function () {
        this.calculatedSizes = null;
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
        }
        _super.prototype.destroy.call(this);
    };
    __decorate([
        Autowired('eGridDiv')
    ], Environment.prototype, "eGridDiv", void 0);
    __decorate([
        PostConstruct
    ], Environment.prototype, "postConstruct", null);
    Environment = __decorate([
        Bean('environment')
    ], Environment);
    return Environment;
}(BeanStub));
export { Environment };
