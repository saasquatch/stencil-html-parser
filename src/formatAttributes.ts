/**
 * Formats DOM attributes to a hash map.
 *
 * @param  {NamedNodeMap} attributes - List of attributes.
 * @return {Record<string, string>} - Map of attribute name to value.
 */
export function formatAttributes(
  attributes: NamedNodeMap
): Record<string, string> {
  let result: Record<string, string> = {};
  // `NamedNodeMap` is array-like
  for (let i = 0, len = attributes.length; i < len; i++) {
    const attribute = attributes[i];
    result[attribute.name] = attribute.value;
  }
  return result;
}
