import React, { Fragment, useState } from "react";
import classnames from 'classnames';
import { Icon } from "../Icon";

import styles from "./ExpandableSnippet.module.scss";


import {
    buildModel,
    JsonArray,
    JsonFunction,
    JsonModel,
    JsonObjectProperty,
    JsonPrimitiveProperty,
    JsonProperty,
    JsonUnionType,
    loadLookups
} from "./model";

const DEFAULT_JSON_NODES_EXPANDED = false;

type Config = {
    includeDeprecated?: boolean,
    excludeProperties?: string[],
    expandedProperties?: string[],
    expandedPaths?: string[],
    expandAll?: boolean,
    lookupRoot?: string;
};

export interface ExpandableSnippetParams {
    interfacename: string;
    overridesrc?: string;
    breadcrumbs?: string[];
    config?: Config;
}

export const ExpandableSnippet: React.FC<ExpandableSnippetParams> = ({
    interfacename,
    overridesrc,
    breadcrumbs = [],
    config = {},
}) => {
    const {lookupRoot = 'grid-api'}: { lookupRoot: string } = config as any;
    const { interfaceLookup, codeLookup } = loadLookups(lookupRoot, overridesrc);

    const model = buildModel(interfacename, interfaceLookup, codeLookup, config);

    return (
        <div className={styles.expandableSnippet} role="presentation">
            <pre className={classnames('code', 'language-ts')}>
                <code className={'language-ts'}>
                    <BuildSnippet breadcrumbs={breadcrumbs} model={model} config={config}/>
                </code>
            </pre>
        </div>
    );
};

interface BuildSnippetParams {
    framework?: string;
    breadcrumbs?: string[];
    model: JsonModel;
    config: Config;
}

const BuildSnippet: React.FC<BuildSnippetParams> = ({
    model,
    breadcrumbs = [],
    config = {},
}) => {
    return renderObjectBreadcrumb(breadcrumbs, () => <Fragment>
        <div className={styles.jsonObject} role="presentation">
            <ModelSnippet model={model} config={config} path={[]}></ModelSnippet>
        </div>
    </Fragment>);
};

interface ModelSnippetParams {
    model: JsonModel | JsonUnionType;
    skip?: string[];
    closeWith?: string;
    path: string[];
    config: Config;
}

const ModelSnippet: React.FC<ModelSnippetParams> = ({
    model,
    closeWith = ',',
    path,
    config = {},
}) => {
    if (model.type === "model") {
        const propertiesRendering = Object.entries(model.properties)
            .map(([propName, propInfo]) => {
                if (config.excludeProperties?.includes(propName)) {
                    return;
                }

                const { desc } = propInfo;
                return (
                    <PropertySnippet key={propName} propName={propName} desc={desc} meta={propInfo} path={path} config={config}/>
                );
            })
            .filter(v => !!v);
        return <Fragment>
            {propertiesRendering}
        </Fragment>;
    } else if (model.type === "union") {
        return (
            <Fragment>
                {renderUnion(model, closeWith, path, config)}
            </Fragment>
        );
    }

    return null;
}

function renderUnion(
    model: JsonUnionType,
    closeWith: string,
    path: string[],
    config: Config,
) {
    const renderPrimitiveUnionOption = (opt: JsonPrimitiveProperty, idx: number, last: boolean) =>
        <Fragment key={idx}>
            {renderPrimitiveType(opt)}
            {!last && <span className={classnames('token', 'operator')}> | </span>}
            {last && closeWith && <span className={classnames('token', 'punctuation')}>{closeWith}</span>}
        </Fragment>;

    if (model.options.every((opt => opt.type === 'primitive'))) {
        const lastIdx = model.options.length - 1;
        return model.options.map((opt, idx) => {
            return opt.type === 'primitive' ? renderPrimitiveUnionOption(opt, idx, idx >= lastIdx) : null;
        });
    }

    return (
        <div className={styles.jsonObjectUnion} role="presentation">
        {
            model.options
                .map((desc, idx) => {
                    const lastIdx = model.options.length - 1;
                    switch (desc.type) {
                        case "primitive":
                            return renderPrimitiveUnionOption(desc, idx, idx >= lastIdx);
                        case "array":
                            break;
                        case "nested-object":
                            return renderUnionNestedObject(desc, idx, idx >= lastIdx, closeWith, path, config);
                    }
                })
                .map((el, idx) => <div key={idx} className={styles.jsonUnionItem}>{el}</div>)
        }
        </div>
    );
}

function renderUnionNestedObject(
    desc: JsonObjectProperty,
    index: number,
    last: boolean,
    closeWith: string,
    path: string[],
    config: Config,
) {
    const discriminatorProp = "type";
    const discriminator = desc.model.properties[discriminatorProp];
    const discriminatorType = discriminator && discriminator.desc.type === "primitive" ?
        discriminator.desc.tsType :
        null;
    const unionPath = path.concat(`[${discriminatorType || index}]`);
    const expandedInitially = isExpandedInitially(discriminatorType || String(index), unionPath, config);
    const [isExpanded, setExpanded] = useState(expandedInitially);

    if (discriminatorType) {
        return (
            <Fragment key={discriminatorType}>
                <span onClick={() => setExpanded(!isExpanded)} className={styles.expandable}>
                    {isExpanded && <div className={styles.expanderBar}></div>}
                    <span className={classnames('token', 'punctuation')}>
                        {isExpanded && renderJsonNodeExpander(isExpanded)}
                        {' { '}
                    </span>
                    {!isExpanded && renderPropertyDeclaration(discriminatorProp, discriminatorType, discriminator, isExpanded, true, 'unionTypeProperty')}
                    {!isExpanded && <span className={classnames('token', 'punctuation')}>, </span>}
                    {
                        isExpanded ?
                            <div className={styles.jsonObject} onClick={(e) => e.stopPropagation()} role="presentation">
                                <ModelSnippet model={desc.model} config={config} path={unionPath}></ModelSnippet>
                            </div> :
                            <span className={classnames('token', 'operator')}> ... </span>
                    }
                    <span className={classnames('token', 'punctuation')}>{' }: '}</span>
                    {!last && <span className={classnames('token', 'operator')}> | <br/></span>}
                    {last && closeWith && <span className={classnames('token', 'punctuation')}>{closeWith}</span>}
                </span>
            </Fragment>
        );
    }

    return (
        <Fragment key={index}>
            <span onClick={() => setExpanded(!isExpanded)} className={styles.expandable}>
                {isExpanded && <div className={styles.expanderBar}></div>}
                <span className={classnames('token', 'punctuation')}>
                    {renderJsonNodeExpander(isExpanded)}
                    {' {'}
                </span>
                {
                    isExpanded ?
                        <div className={classnames(styles.jsonObject, styles.unexpandable)} onClick={(e) => e.stopPropagation()} role="presentation">
                            <ModelSnippet model={desc.model} config={config} path={unionPath}></ModelSnippet>
                        </div> :
                        <span className={classnames('token', 'operator')}> ... </span>
                }
                <span className={classnames('token', 'punctuation')}>{'}: '}</span>
                {!last && <span className={classnames('token', 'operator')}> | <br/></span>}
                {last && closeWith && <span className={classnames('token', 'punctuation')}>{closeWith}</span>}
            </span>
        </Fragment>
    );
}

interface PropertySnippetParams {
    propName: string;
    desc: JsonProperty;
    meta: Omit<JsonModel['properties'][number], 'desc'>;
    forceInitiallyExpanded?: boolean,
    needsClosingSemi?: boolean,
    path: string[],
    config: Config;
}

const PropertySnippet: React.FC<PropertySnippetParams> = ({
    propName,
    desc,
    meta,
    forceInitiallyExpanded,
    needsClosingSemi = true,
    path,
    config,
}) => {
    const propPath = path.concat(propName);
    const expandedInitially = forceInitiallyExpanded || isExpandedInitially(propName, propPath, config);
    const [isJSONNodeExpanded, setJSONNodeExpanded] = useState(expandedInitially);

    const { deprecated } = meta;
    const { tsType } = desc;

    let propertyRendering;
    let collapsePropertyRendering;
    let renderTsType = true;
    switch (desc.type) {
        case "primitive":
            propertyRendering = null;
            break;
        case "array":
            propertyRendering = renderArrayType(desc, meta, propPath, config);
            collapsePropertyRendering = desc.elements.type !== 'primitive' && (
                <Fragment>
                    <span className={classnames('token', 'punctuation')}> {"[".repeat(desc.depth)}</span>
                    <span className={classnames('token', 'operator')}> ... </span>
                    <span className={classnames('token', 'punctuation')}>{"]".repeat(desc.depth)}</span>
                </Fragment>
            );
            break;
        case "nested-object":
            propertyRendering = renderNestedObject(desc, meta, propPath, config);
            collapsePropertyRendering = renderCollapsedNestedObject(desc);
            break;
        case "union":
            const simpleUnion = isSimpleUnion(desc);
            propertyRendering = !simpleUnion ? <ModelSnippet model={desc} config={config} path={propPath}></ModelSnippet> : null;
            collapsePropertyRendering = !simpleUnion ?
                <Fragment></Fragment> :
                null;
            needsClosingSemi = simpleUnion;
            break;
        case "function":
            propertyRendering = isJSONNodeExpanded ? renderFunction(desc, propPath, config) : null;
            collapsePropertyRendering = renderCollapsedFunction(desc);
            renderTsType = isSimpleFunction(desc);
            break;
        default:
            console.warn(`AG Docs - unhandled sub-type: ${desc["type"]}`);
    }

    let expandable = !!collapsePropertyRendering;
    return (
        <div
            className={classnames(
                expandable && styles.expandable,
                styles.jsonProperty,
                deprecated && styles.deprecated,
                styles['type-' + desc.type]
            )}
            onClick={() => expandable ? setJSONNodeExpanded(!isJSONNodeExpanded) : null}
            role="presentation"
        >
            {renderPropertyDeclaration(propName, renderTsType ? tsType : null, meta, isJSONNodeExpanded, expandable)}
            {
                !isJSONNodeExpanded && collapsePropertyRendering ?
                    collapsePropertyRendering :
                    <span className={classnames(styles['unexpandable'])} onClick={(e) => e.stopPropagation()}>{propertyRendering}</span>
            }
            {(!isJSONNodeExpanded || needsClosingSemi) && <span className={classnames('token', 'punctuation')}>, </span>}
        </div>
    );
};

function renderJsonNodeExpander(isExpanded: boolean) {
    return <Icon name="chevronRight" svgClasses={classnames(styles.expander, isExpanded && styles.active)} />
}

function renderPropertyDeclaration(
    propName: string,
    tsType: string | null,
    propDesc: { required: boolean },
    isExpanded: boolean,
    expandable: boolean,
    style = 'propertyName',
) {
    const { required } = propDesc;
    return (
        <Fragment>
            {isExpanded && <div className={styles.expanderBar}></div>}
            <span className={classnames('token', 'name', styles[style])}>
                {expandable && renderJsonNodeExpander(isExpanded)}
                {propName}
            </span>
            {!required && <span className={classnames('token', 'optional')}>?</span>}
            {expandable && <span className={classnames('token', 'operator')}>:</span>}
        </Fragment>
    );
}

function renderPrimitiveType(desc: JsonPrimitiveProperty) {
    if (desc.aliasType) {
    }
}

function renderNestedObject(
    desc: JsonObjectProperty,
    meta: Omit<JsonModel['properties'][number], 'desc'>,
    path: string[],
    config: Config,
) {
    return (
        <Fragment>
            <span className={classnames('token', 'punctuation')}>{' { '}</span>
            <div className={styles.jsonObject} role="presentation">
                <ModelSnippet model={desc.model} config={config} path={path}></ModelSnippet>
            </div>
            <span className={classnames('token', 'punctuation')}>}</span>
        </Fragment>
    );
}

function renderCollapsedNestedObject(desc: JsonObjectProperty) {
    return (
        <Fragment>
            <span className={classnames('token', 'punctuation')}>{' {'}</span>
            <span className={classnames('token', 'operator')}> ... </span>
            <span className={classnames('token', 'punctuation')}>}</span>
        </Fragment>
    )
}

function renderArrayType(
    desc: JsonArray,
    meta: Omit<JsonModel['properties'][number], 'desc'>,
    path: string[],
    config: Config,
) {
    let arrayElementRendering;
    let arrayBracketMode = 'surround';

    switch (desc.elements.type) {
        case "primitive":
            arrayBracketMode = 'none';
            arrayElementRendering = null;
            break;
        case "nested-object":
            arrayElementRendering = (
                <Fragment>
                    <span className={classnames('token', 'punctuation')}>{'{ '}</span>
                    <div className={styles.jsonObject} role="presentation">
                        <ModelSnippet model={desc.elements.model} path={path.concat('[]')} config={config}></ModelSnippet>
                    </div>
                    <span className={classnames('token', 'punctuation')}>}</span>
                </Fragment>
            );
            break;
        case "union":
            arrayElementRendering = (
                <Fragment>
                    <ModelSnippet model={desc.elements} closeWith={''} path={path.concat('[]')} config={config}></ModelSnippet>
                </Fragment>
            );
            break;
        default:
            console.warn(`AG Docs - unhandled ub-type: ${desc["type"]}`);
    }

    return (
        <Fragment>
            {arrayBracketMode === 'surround' && <span className={classnames('token', 'punctuation')}> {"[".repeat(desc.depth)}</span>}
            {arrayElementRendering}
            {arrayBracketMode === 'surround' && <span className={classnames('token', 'punctuation')}>{"]".repeat(desc.depth)}</span>}
            {arrayBracketMode === 'after' && <span className={classnames('token', 'punctuation')}>{"[]".repeat(desc.depth)}</span>}
        </Fragment>
    );
}

function renderCollapsedFunction(desc: JsonFunction) {
    if (isSimpleFunction(desc)) {
        return null;
    }

    const paramEntries = Object.entries(desc.parameters);
    return (
        <Fragment>
            <span className={classnames('token', 'punctuation')}>(</span>
            {
                paramEntries.map(([name, type], idx) => (
                    <Fragment key={name}>
                        <span className={classnames('token', 'name')}>{name}</span>
                        <span className={classnames('token', 'punctuation')}>: </span>
                        {(idx + 1) < paramEntries.length && <span className={classnames('token', 'punctuation')}>, </span>}
                    </Fragment>
                ))
            }
            <span className={classnames('token', 'punctuation')}>)</span>
            <span className={classnames('token', 'operator')}> => </span>
        </Fragment>
    );
}

function renderFunction(
    desc: JsonFunction,
    path: string[],
    config: Config,
) {
    if (isSimpleFunction(desc)) {
        return null;
    }

    const paramEntries = Object.entries(desc.parameters);
    const singleParameter = paramEntries.length === 1;
    return (
        <Fragment>
            <span className={classnames('token', 'punctuation')}>(</span>
                <div className={styles.jsonObject} role="presentation">
                {
                    paramEntries.map(([prop, model], idx) => (
                        <Fragment key={prop}>
                            <PropertySnippet propName={prop} desc={model.desc} meta={model} path={path} config={config} forceInitiallyExpanded={singleParameter} needsClosingSemi={false}></PropertySnippet>
                            {(idx + 1) < paramEntries.length && <span className={classnames('token', 'punctuation')}>, </span>}
                        </Fragment>
                    ))
                }
            </div>
            <span className={classnames('token', 'punctuation')}>)</span>
            <span className={classnames('token', 'operator')}> => </span>
        </Fragment>
    );
}

function isSimpleUnion(desc: JsonUnionType) {
    return desc.options.every(opt => opt.type === 'primitive');
}

function isSimpleFunction(desc: JsonFunction) {
    return Object.entries(desc.parameters)
        .every(([_, type]) => type.desc.type === "primitive");
}

function isExpandedInitially(propName: string, path: string[], config: Config) {
    if (config.expandAll) { return true; }

    const currentPath = path.join('.')
        .replace(/\.\[/g, '[')
        .replace(/'/g, '');
    return config.expandedProperties?.includes(propName) ??
        config.expandedPaths?.some(p => p.startsWith(currentPath)) ??
        DEFAULT_JSON_NODES_EXPANDED;
}

export function buildObjectIndent(level: number): string {
    return "  ".repeat(level);
}

export function renderObjectBreadcrumb(
    breadcrumbs: string[],
    bodyContent: () => any,
) {
    return (
        <Fragment>
            {
                breadcrumbs.length > 0 && (
                    <Fragment>
                        <div role="presentation">{breadcrumbs[0]}: {'{'}</div>
                    </Fragment>
                )
            }
            {
                breadcrumbs.length > 1 ?
                    <div className={styles.jsonObject} role="presentation">
                        <div role="presentation">...</div>
                        {renderObjectBreadcrumb(breadcrumbs.slice(1), bodyContent)}
                    </div> :
                    bodyContent()
            }
            {
                breadcrumbs.length > 0 &&
                    <div>{'}'}</div>
            }
        </Fragment>
    );
}
