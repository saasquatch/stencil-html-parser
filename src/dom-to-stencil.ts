import { h, VNode, VNodeData } from '@stencil/core';
import { DomElement } from 'htmlparser2';

/**
 * Converts DOM nodes to React elements.
 *
 * @param {DomElement[]} nodes - The DOM nodes.
 * @param {Object} [options={}] - The additional options.
 * @param {Function} [options.replace] - The replacer.
 * @param {Object} [options.library] - The library (React, Preact, etc.).
 * @return {String|ReactElement|ReactElement[]}
 */
export default function domToStencil(nodes: DomElement[], options:{trim?:boolean} = {}): VNode[] {
  options = options || {};

  const createElement = h;

  const result: VNode[] = [];
  const trim = options.trim;

  let node: DomElement;
  let props: VNodeData;
  let children: VNode[];
  let data;

  for (let i = 0, len = nodes.length; i < len; i++) {
    node = nodes[i];

    if (node.type === 'text') {
      // if trim option is enabled, skip whitespace text nodes
      if (trim) {
        data = node.data.trim();
        if (data) {
          result.push(node.data);
        }
      } else {
        result.push(node.data);
      }
      continue;
    }

    if (!shouldPassAttributesUnaltered(node)) {
      props = attributesToProps(node.attribs);
    } else {
      props = node.attribs;
    }

    children = null;

    switch (node.type) {
      case 'script':
      case 'style':
        // prevent text in <script> or <style> from being escaped
        // https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
        if (node.children[0]) {
          props.innerHTML = node.children[0].data;
        }
        break;

      case 'tag':
        // setting textarea value in children is an antipattern in React
        // https://reactjs.org/docs/forms.html#the-textarea-tag
        if (node.name === 'textarea' && node.children[0]) {
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

    result.push(createElement(node.name, props, children));
  }

  return result;
}

/**
 * Determines whether attributes should be altered or not.
 *
 * @param {React.ReactElement} node
 * @return {Boolean}
 */
function shouldPassAttributesUnaltered(
  // @ts-expect-error
  node: DomElement,
) {
  return true;
  //   return utilities.PRESERVE_CUSTOM_ATTRIBUTES && node.type === 'tag' && utilities.isCustomComponent(node.name, node.attribs);
}
function attributesToProps<T>(a: T): T {
  return a;
}
