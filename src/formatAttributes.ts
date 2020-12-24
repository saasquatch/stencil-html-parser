/**
 * Formats DOM attributes to a hash map.
 *
 * @param  {NamedNodeMap} attributes - List of attributes.
 * @return {object}                  - Map of attribute name to value.
 */

export function formatAttributes(attributes: NamedNodeMap): object {
    var result: { [key: string]: string; } = {};
    var attribute;
    // `NamedNodeMap` is array-like
    for (var i = 0, len = attributes.length; i < len; i++) {
        attribute = attributes[i];
        result[attribute.name] = attribute.value;
    }
    return result;
}
