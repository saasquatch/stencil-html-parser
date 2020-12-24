import { Element, Text, Comment, Node } from "domhandler/lib/node";

// var domhandler = require("domhandler/lib/node");

var DIRECTIVE_REGEX = /<(![a-zA-Z\s]+)>/; // e.g., <!doctype html>

/**
 * SVG elements are case-sensitive.
 *
 * @see {@link https://developer.mozilla.org/docs/Web/SVG/Element#SVG_elements_A_to_Z}
 */
const CASE_SENSITIVE_TAG_NAMES = [
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussainBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "linearGradient",
  "radialGradient",
  "textPath",
];

/**
 * Detects if browser is Internet Explorer.
 *
 * @param  {number}  [version] - IE version to detect.
 * @return {boolean}           - Whether IE or the version is detected.
 */
function isIE(version: number): boolean {
  if (version) {
    //@ts-ignore
    return document.documentMode === version;
  }
  return /(MSIE |Trident\/|Edge\/)/.test(navigator.userAgent);
}

const isIE9 = isIE(9);

// var Comment = domhandler.Comment;
// var Element = domhandler.Element;
// var ProcessingInstruction = domhandler.ProcessingInstruction;
// var Text = domhandler.Text;

var caseSensitiveTagNamesMap: { [key: string]: string } = {};
var tagName;

for (var i = 0, len = CASE_SENSITIVE_TAG_NAMES.length; i < len; i++) {
  tagName = CASE_SENSITIVE_TAG_NAMES[i];
  caseSensitiveTagNamesMap[tagName.toLowerCase()] = tagName;
}

/**
 * Gets case-sensitive tag name.
 *
 * @param  {string}           tagName - Tag name in lowercase.
 * @return {string|undefined}         - Case-sensitive tag name.
 */
function getCaseSensitiveTagName(tagName: string) {
  return caseSensitiveTagNamesMap[tagName];
}

/**
 * Formats DOM attributes to a hash map.
 *
 * @param  {NamedNodeMap} attributes - List of attributes.
 * @return {object}                  - Map of attribute name to value.
 */
function formatAttributes(attributes: NamedNodeMap) {
  var result: { [key: string]: string } = {};
  var attribute;
  // `NamedNodeMap` is array-like
  for (var i = 0, len = attributes.length; i < len; i++) {
    attribute = attributes[i];
    result[attribute.name] = attribute.value;
  }
  return result;
}

/**
 * Corrects the tag name if it is case-sensitive (SVG).
 * Otherwise, returns the lowercase tag name (HTML).
 *
 * @param  {string} tagName - Lowercase tag name.
 * @return {string}         - Formatted tag name.
 */
function formatTagName(tagName: string) {
  tagName = tagName.toLowerCase();
  var caseSensitiveTagName = getCaseSensitiveTagName(tagName);
  if (caseSensitiveTagName) {
    return caseSensitiveTagName;
  }
  return tagName;
}

const template = document.createElement("template");
export function domparser(html: string): NodeListOf<ChildNode> {
  /**
   * Uses a template element (content fragment) to parse HTML.
   *
   * @param  {string} html - The HTML string.
   * @return {NodeList}
   */
  template.innerHTML = html;
  return template.content.childNodes;
}

/**
 * Parses HTML string to DOM nodes in browser.
 *
 * @param  {String} html  - HTML markup.
 * @return {DomElement[]} - DOM elements.
 */
export function HTMLDOMParser(html: string): Node[] {
  if (typeof html !== "string") {
    throw new TypeError("First argument must be a string");
  }

  if (!html) {
    return [];
  }

  // match directive
  var match = html.match(DIRECTIVE_REGEX);
  var directive;

  if (match && match[1]) {
    directive = match[1];

    // remove directive in IE9 because DOMParser uses
    // MIME type 'text/xml' instead of 'text/html'
    if (isIE9) {
      html = html.replace(match[0], "");
    }
  }

  return formatDOM(domparser(html));
  //   return [];
}

/**
 * Transforms DOM nodes to `domhandler` nodes.
 *
 * @param  {NodeList}     nodes         - DOM nodes.
 * @param  {Element|null} [parent=null] - Parent node.
 * @param  {string}       [directive]   - Directive.
 * @return {Array<Comment|Element|ProcessingInstruction|Text>}
 */
export function formatDOM(nodes: NodeList, directive?: string): Node[] {
  let result:Node[] = [];

  for (let index = 0, len = nodes.length; index < len; index++) {
    let node = nodes[index];
    let current:Node;

    // set the node data given the type
    switch (node.nodeType) {
      case 1:
        // script, style, or tag
        if (node.nodeName === "TEMPLATE") {
          current = new Element(
            formatTagName(node.nodeName),
            formatAttributes(
              // @ts-ignore
              node.attributes
            ),
            //@ts-ignore
            [new Element("div",{"id":"foo"})]
            // formatDOM(node.content.childNodes)
          );
        } else {
          current = new Element(
            formatTagName(node.nodeName),
            formatAttributes(
              // @ts-ignore
              node.attributes
            ),
            formatDOM(node.childNodes)
          );
        }

        break;

      case 3:
        if (!node.nodeValue) continue;
        current = new Text(node.nodeValue);
        break;

      case 8:
        if (!node.nodeValue) continue;
        current = new Comment(node.nodeValue);
        break;

      default:
        console.log("Unhandled node type", node);
        continue;
    }

    // set previous node next
    var prev = result[index - 1] || null;
    if (prev) {
      prev.next = current;
    }

    if (current) {
      result.push(current);
    }
  }

  //   if (directive) {
  //     current = new ProcessingInstruction(
  //       directive.substring(0, directive.indexOf(" ")).toLowerCase(),
  //       directive
  //     );
  //     current.next = result[0] || null;
  //     current.parent = parent;
  //     result.unshift(current);

  //     if (result[1]) {
  //       result[1].prev = result[0];
  //     }
  //   }

  return result;
}
