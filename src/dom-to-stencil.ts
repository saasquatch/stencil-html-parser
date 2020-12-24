import { h, VNode, VNodeData } from "@stencil/core";
import { Node, Text, Comment, Element } from "domhandler/lib/node";
import styleToObject from "style-to-object";

type StencilNode = VNode | string;
type Options = { trim?: boolean };

/**
 * Converts DOM nodes to Stencil VNodes elements.
 *
 */
export default function domToStencil(
  nodes: Node[],
  options: Options = {}
): StencilNode[] {
  const result: (StencilNode | undefined)[] = [];

  for (let i = 0, len = nodes.length; i < len; i++) {
    const node: Node = nodes[i];

    if (node instanceof Text) {
      result.push(textNodeToStencil(node, options));
      continue;
    } else if (node instanceof Element) {
      const props = attributesToProps(node.attribs);

      let children: StencilNode[] | undefined = undefined;

      switch (node.type) {
        case "script":
        case "style":
          // prevent text in <script> or <style> from being escaped
          // https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
          if (node.children && node.children[0]) {
            props.innerHTML =
              // @ts-ignore
              node.children[0].data;
          }
          break;

        case "tag":
          if (node.children && node.children.length) {
            // continue recursion of creating React elements (if applicable)
            children = domToStencil(node.children, options);
          }
          break;

        // skip all other cases (e.g., comment)
        default:
          continue;
      }

      if (children) {
        // @ts-ignore -- No good types in Stencil for defining `h`
        result.push(h(node.name, props, ...children));
      } else {
        // @ts-ignore -- No good types in Stencil for defining `h`
        result.push(h(node.name, props));
      }
      // @ts-ignore
      // result.push(h("div", {}));
      // result.push(options.createElement(node.name, props, children));
    }
  }

  const onlyDefined = result.filter(
    (x) => typeof x !== "undefined"
  ) as StencilNode[];
  return onlyDefined;
}

function textNodeToStencil(node: Text, options: Options) {
  let stencilNode;
  // if trim option is enabled, skip whitespace text nodes
  if (options.trim) {
    let data = node.data.trim();
    if (data) {
      stencilNode = data;
    }
  } else {
    stencilNode = node.data;
  }
  return stencilNode;
}

function attributesToProps<T extends VNodeData>(a?: T): VNodeData {
  if (!a) {
    return {};
  }
  const { style, ...rest } = a;
  return {
    style: styleToObject(style),
    ...rest,
  };
}
