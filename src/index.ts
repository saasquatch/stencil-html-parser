import { VNode } from "@stencil/core";
import { domToStencil } from "./domToStencil";
import { domparser } from "./domparser";

export function parse(html: string): (VNode | string)[] {
  const domNodes = domparser(html);
  return domToStencil(domNodes);
}
