/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface TestComponent {
        "setChildren": (html: string) => void;
    }
}
declare global {
    interface HTMLTestComponentElement extends Components.TestComponent, HTMLStencilElement {
    }
    var HTMLTestComponentElement: {
        prototype: HTMLTestComponentElement;
        new (): HTMLTestComponentElement;
    };
    interface HTMLElementTagNameMap {
        "test-component": HTMLTestComponentElement;
    }
}
declare namespace LocalJSX {
    interface TestComponent {
    }
    interface IntrinsicElements {
        "test-component": TestComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "test-component": LocalJSX.TestComponent & JSXBase.HTMLAttributes<HTMLTestComponentElement>;
        }
    }
}