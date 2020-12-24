import { VNode, h } from "@stencil/core";
import { attributesToProps } from "./attributesToProps";
import { formatAttributes } from "./formatAttributes";
import { formatTagName } from "./formatTagName";

type StencilNode = VNode | string;

export function domToStencil(nodes: NodeList): StencilNode[] {
  let result: StencilNode[] = [];

  for (let index = 0, len = nodes.length; index < len; index++) {
    let node = nodes[index];
    let current: StencilNode;

    // set the node data given the type
    switch (node.nodeType) {
      case 1:
        // script, style, or tag
        current = elementToVNode(node as HTMLElement);
        break;

      case 3:
        if (!node.nodeValue) continue;
        current = node.nodeValue;
        break;

      case 8:
        // No comment support
        continue;

      default:
        console.log("Unhandled node type", node);
        continue;
    }

    if (current) {
      result.push(current);
    }
  }
  return result;
}

function elementToVNode(node: HTMLElement) {
  let childNodes = node.childNodes;

  const attr = formatAttributes(node.attributes);
  const props = attributesToProps(attr);

  if (node.nodeName === "TEMPLATE") {
    props.innerHTML = (node as HTMLTemplateElement).innerHTML;
  }

  //@ts-ignore
  return h(formatTagName(node.nodeName), props, domToStencil(childNodes));
}
