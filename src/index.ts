import domToStencil from "./dom-to-stencil";
import htmlToDOM from "html-dom-parser/lib/html-to-dom-client";
import { VNode } from "@stencil/core";

export function parse(html: string): VNode[] {
  const domNodes = htmlToDOM(html);
  const stencilNodes = domToStencil(domNodes);
  return stencilNodes;
}
