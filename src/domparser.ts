const template = document.createElement("template");

/**
 * Uses a template element (content fragment) to parse HTML.
 *
 * @param  {string} html - The HTML string.
 * @return {NodeList}
 */
export function domparser(html: string): NodeListOf<ChildNode> {
  template.innerHTML = html;
  return template.content.childNodes;
}
