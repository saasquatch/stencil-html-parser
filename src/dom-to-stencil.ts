import { h, VNode, VNodeData } from "@stencil/core";
import { DomElement } from "htmlparser2";
import styleToObject from "style-to-object";

/**
 * Converts DOM nodes to Stencil VNodes elements.
 *
 */
export default function domToStencil(
  nodes: DomElement[],
  options: { trim?: boolean } = {}
): VNode[] {
  const result: VNode[] = [];

  for (let i = 0, len = nodes.length; i < len; i++) {
    const node: DomElement = nodes[i];

    if (node.type === "text") {
      // if trim option is enabled, skip whitespace text nodes
      if (options.trim) {
        let data = node.data.trim();
        if (data) {
          result.push(data);
        }
      } else {
        result.push(node.data);
      }
      continue;
    }

    const props = attributesToProps(node.attribs);

    let children: VNode[] | undefined = undefined;

    switch (node.type) {
      case "script":
      case "style":
        // prevent text in <script> or <style> from being escaped
        // https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
        if (node.children && node.children[0]) {
          props.innerHTML = node.children[0].data;
        }
        break;

      case "tag":
        // setting textarea value in children is an antipattern in React
        // https://reactjs.org/docs/forms.html#the-textarea-tag
        if (node.name === "textarea" && node.children && node.children[0]) {
          props.defaultValue = node.children[0].data;
        } else if (node.children && node.children.length) {
          // continue recursion of creating React elements (if applicable)
          children = domToStencil(node.children, options);
        }
        break;

      // skip all other cases (e.g., comment)
      default:
        continue;
    }

    // set "key" prop for sibling elements
    // https://fb.me/react-warning-keys
    if (len > 1) {
      props.key = i;
    }

    if (children) {
      // @ts-ignore -- No good types in Stencil for defining `h`
      result.push(h(node.name, props, ...children));
    } else {
       // @ts-ignore -- No good types in Stencil for defining `h`
      result.push(h(node.name, props));
    }
    // result.push(options.createElement(node.name, props, children));
  }

  return result;
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
