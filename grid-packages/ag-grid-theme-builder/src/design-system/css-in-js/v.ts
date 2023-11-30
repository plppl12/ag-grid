import { Expression } from './Expression';
import { proxy, toKebabCase } from './utils';

export const v = proxy<VariableName, VarExpression>((prop) => new VarExpression(prop));

export class VarExpression extends Expression {
  constructor(readonly propertyName: string) {
    super(`var(--ag-${String(toKebabCase(String(propertyName)))})`);
  }
}

type ColorVariable =
  | 'activeColor'
  | 'advancedFilterColumnPillColor'
  | 'advancedFilterJoinPillColor'
  | 'advancedFilterOptionPillColor'
  | 'advancedFilterValuePillColor'
  | 'backgroundColor'
  | 'borderColor'
  | 'checkboxBackgroundColor'
  | 'checkboxCheckedColor'
  | 'checkboxIndeterminateColor'
  | 'checkboxUncheckedColor'
  | 'chipBackgroundColor'
  | 'columnHoverColor'
  | 'controlPanelBackgroundColor'
  | 'dataColor'
  | 'disabledForegroundColor'
  | 'foregroundColor'
  | 'headerBackgroundColor'
  | 'headerCellHoverBackgroundColor'
  | 'headerCellMovingBackgroundColor'
  | 'headerColumnResizeHandleColor'
  | 'headerColumnSeparatorColor'
  | 'headerForegroundColor'
  | 'inputBorderColor'
  | 'inputBorderColorInvalid'
  | 'inputDisabledBackgroundColor'
  | 'inputDisabledBorderColor'
  | 'inputFocusBorderColor'
  | 'invalidColor'
  | 'materialPrimaryColor'
  | 'minichartSelectedChartColor'
  | 'minichartSelectedPageColor'
  | 'modalOverlayBackgroundColor'
  | 'oddRowBackgroundColor'
  | 'rangeSelectionBackgroundColor'
  | 'rangeSelectionBackgroundColor2'
  | 'rangeSelectionBackgroundColor3'
  | 'rangeSelectionBackgroundColor4'
  | 'rangeSelectionBorderColor'
  | 'rangeSelectionChartBackgroundColor'
  | 'rangeSelectionChartCategoryBackgroundColor'
  | 'rangeSelectionHighlightColor'
  | 'rowBorderColor'
  | 'rowHoverColor'
  | 'secondaryBorderColor'
  | 'secondaryForegroundColor'
  | 'selectedRowBackgroundColor'
  | 'selectedTabUnderlineColor'
  | 'sideButtonSelectedBackgroundColor'
  | 'subheaderBackgroundColor'
  | 'subheaderToolbarBackgroundColor'
  | 'toggleButtonOffBackgroundColor'
  | 'toggleButtonOffBorderColor'
  | 'toggleButtonOnBackgroundColor'
  | 'toggleButtonOnBorderColor'
  | 'toggleButtonSwitchBackgroundColor'
  | 'toggleButtonSwitchBorderColor'
  | 'tooltipBackgroundColor'
  | 'valueChangeDeltaDownColor'
  | 'valueChangeDeltaUpColor'
  | 'valueChangeValueHighlightBackgroundColor';

type DimensionVariable =
  | 'advancedFilterBuilderIndentSize'
  | 'borderRadius'
  | 'cardRadius'
  | 'checkboxBorderRadius'
  | 'columnSelectIndentSize'
  | 'filterToolPanelGroupIndent'
  | 'fontSize'
  | 'gridSize'
  | 'headerColumnResizeHandleHeight'
  | 'headerColumnResizeHandleWidth'
  | 'headerColumnSeparatorHeight'
  | 'headerColumnSeparatorWidth'
  | 'headerHeight'
  | 'iconSize'
  | 'internalCalculatedLineHeight'
  | 'internalPaddedRowHeight'
  | 'lineHeight'
  | 'listItemHeight'
  | 'menuMinWidth'
  | 'rowGroupIndentSize'
  | 'rowHeight'
  | 'selectedTabUnderlineTransitionSpeed'
  | 'selectedTabUnderlineWidth'
  | 'setFilterIndentSize'
  | 'sideBarPanelWidth'
  | 'tabMinWidth'
  | 'toggleButtonHeight'
  | 'toggleButtonWidth'
  | 'cellHorizontalPadding'
  | 'cellWidgetSpacing'
  | 'widgetContainerHorizontalPadding'
  | 'widgetContainerVerticalPadding'
  | 'widgetHorizontalSpacing'
  | 'widgetVerticalSpacing';

type BorderVariable =
  | 'borders'
  | 'bordersCritical'
  | 'bordersInput'
  | 'bordersInputInvalid'
  | 'bordersSecondary'
  | 'bordersSideButton'
  | 'cellHorizontalBorder'
  | 'rangeSelectionBorderStyle'
  | 'rowBorderStyle'
  | 'rowBorderWidth'
  | 'toggleButtonBorderWidth'
  | 'wrapperBorderRadius';

type DisplayVariable = 'headerColumnSeparatorDisplay' | 'headerColumnResizeHandleDisplay';

type StringsVariable = 'fontFamily' | 'iconFontFamily';

type ShadowVariable = 'cardShadow' | 'inputFocusBoxShadow' | 'popupShadow';

export type VariableName =
  | ColorVariable
  | DimensionVariable
  | BorderVariable
  | DisplayVariable
  | StringsVariable
  | ShadowVariable;
