import { VNode, h } from "@stencil/core";
import { attributesToProps } from "./attributesToProps";
import { formatTagName } from "./formatTagName";
import { domToStencil } from "./domToStencil";

/**
 * Converts an `HTMLElement` into a compatible Stencil `VNode`.
 * 
 *  - Special handling for parsing `style` attributes as objects
 *  - Special handling for `template` inner HTML
 * 
 * @param node 
 */
export function elementToVNode(node: HTMLElement): VNode {
  let childNodes = node.childNodes;

  const props = attributesToProps(node.attributes);

  if (node.nodeName === "TEMPLATE") {
    props.innerHTML = (node as HTMLTemplateElement).innerHTML;
  }

  //@ts-ignore
  return h(formatTagName(node.nodeName), props, domToStencil(childNodes));
}
