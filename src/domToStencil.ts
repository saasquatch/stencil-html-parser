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
      case Node.ELEMENT_NODE: // 1	An Element node like <p> or <div>.
        // script, style, or tag
        current = elementToVNode(node as HTMLElement);
        break;

      case Node.TEXT_NODE: // 3	The actual Text inside an Element or Attr.
        if (!node.nodeValue) continue;
        current = node.nodeValue;
        break;

      case Node.ATTRIBUTE_NODE: // 2	An Attribute of an Element.
      case Node.CDATA_SECTION_NODE: //	4	A CDATASection, such as <!CDATA[[ … ]]>.
      case Node.PROCESSING_INSTRUCTION_NODE: // 7	A ProcessingInstruction of an XML document, such as <?xml-stylesheet … ?>.
      case Node.COMMENT_NODE: // 8	A Comment node, such as <!-- … -->.
      case Node.DOCUMENT_NODE: // 9	A Document node.
      case Node.DOCUMENT_TYPE_NODE: // 10	A DocumentType node, such as <!DOCTYPE html>.
      case Node.DOCUMENT_FRAGMENT_NODE: // 11	A DocumentFragment node.
        // No support for these node types
        continue;
      default:
        // Unhandled node type
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
