import { VNode } from "@stencil/core";
import { domToStencil } from "./domToStencil";
import { domparser } from "./domparser";
import { elementToVNode } from "./elementToVNode";
import { attributesToProps } from "./attributesToProps";

/**
 * Parses HTML using `domparser` and then renders it using `domToStencil`
 * 
 * If you need to optimize for performance, split this into two calls. You can memo-ize or cache the result of `domparser`,
 * but stencil requires fresh instances of `VNode` every time
 *
 * @param html
 */
export function parse(html: string): (VNode | string)[] {
  const domNodes = domparser(html);
  return domToStencil(domNodes);
}

export { domToStencil, domparser, elementToVNode, attributesToProps };
