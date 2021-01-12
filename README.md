# stencil-html-parser

HTML to Stencil Parser. Takes HTML as a string, uses a template tag to turn it into DOM, then converts those nodes into Stencil `VNode` elements.

## Usage

Preferred use of this library is via an import from NPM and bundled into your stencil components.

```
npm i @saasquatch/stencil-html-parser
```

The `parse` method will provide `VNode` elements that can be rendered directly.

```js
import { Component, h, Host, State, Method } from "@stencil/core";
import { parse } from "@saasquatch/stencil-html-parser";

@Component({
  tag: "html-renderer",
})
export class TestComponent {
  @Prop() html: string = `<div>Hello world</div>`;

  render() {
    try{
      const el = this.html?parse(this.html):"";
      return <Host>{el}</Host>;  
    }catch(e){
      console.error("Parsing error", e.message);
      return <Host></Host>
    }
  }
}
```

## What is supported?

 - [Attributes](__tests/Attributes.feature)
 - [Elements](__tests/Elements.feature)
 - [Inline styles and styles tags](__tests/Styles.feature)
 - [Template tags](__tests/Templates.feature)
 - [Script tags](__tests/ScriptTags.feature)

## Security

You can sanitize the HTML before rendering, e.g. with [DOMPurify](https://github.com/cure53/DOMPurify)

## Why use this library?

 - Unlike setting `innerHTML` on a component, the parsed `VNode` elements will maintain state, and can be modified before being inserted.