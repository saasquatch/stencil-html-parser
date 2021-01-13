import { Component, h, Host, State, Method } from "@stencil/core";
import { parse } from "../index";

@Component({
  tag: "test-component",
})
export class TestComponent {
  @State() html?: string;

  @Method()
  setChildren(html: string) {
    this.html = html;
  }

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
