import domToStencil from "./dom-to-stencil";
// import htmlToDOM from "html-dom-parser/lib/html-to-dom-client";
import { h, VNode } from "@stencil/core";
import { HTMLDOMParser } from "./utilities";

export function parse(html: string): (VNode|string)[] {
  const domNodes = HTMLDOMParser(html);
  const stencilNodes = domToStencil(domNodes);
  // @ts-ignore
  // return [h("div", {})];
  return stencilNodes;
}


