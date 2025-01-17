import { AgPromise } from "../utils";

export interface IFrameworkOverrides {

    setInterval(action: any, interval?: any): AgPromise<number>;

    addEventListener(element: HTMLElement, type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    
    /** Angular uses Zones, we run ALL events outside of Zone JS so that we do not kick off
     * the Angular change detection. Any event listener or setTimeout() or setInterval() run by our code 
     * would trigger change detection in Angular. 
     * 
     * Before events are returned to the user / callbacks called, those functions are wrapping in Angular's zone
     * again so that the user's code triggers change detection as normal. See wrapOutgoing() below.
     */
    dispatchEvent(listener: () => void): void;

    /**
     * Any code that is executed outside of AG Grid should be wrapped in this method. This is to cater for Angular's
     * change detection. This is currently used for events, callbacks that the user provides either via the component
     * or via registration with the grid api.     
     */
    wrapOutgoing<T>(listener: () => T): T;

    /*
    * vue components are specified in the "components" part of the vue component - as such we need a way to deteremine if a given component is
    * within that context - this method provides this
    * Note: This is only really used/necessary with cellRendererSelectors
    */
    frameworkComponent(name: string, components?: any): any;

    /*
     * Allows framework to identify if a class is a component from that framework.
     */
    isFrameworkComponent(comp: any): boolean;

    /**
     * Which rendering engine is used for the grid components. Can be either 'vanilla' or 'react'.
     */
    renderingEngine: 'vanilla' | 'react';
    
    /**
     * Returns the framework specific url for linking to a documentation page.
     * @param path Optional path to append to the base url. i.e 'aligned-grids' Does not need the leading `/`
     */
    getDocLink(path?: string): string;
}
