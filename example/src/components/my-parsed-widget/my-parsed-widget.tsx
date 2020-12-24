import { Component, Prop, h, State, Host } from '@stencil/core';
import { parse } from '@saasquatch/stencil-html-parser';

@Component({
  tag: 'my-parsed-widget',
})
export class MyParsedWidget {
  /**
   * The first name
   */
  @Prop() first: string;

  @State() state: number = 0;

  timer: NodeJS.Timeout;
  connectedCallback() {
    this.timer = setInterval(() => {
      this.state = this.state + 1;
    }, 2000);
  }
  disconnectedCallback() {
    clearInterval(this.timer);
  }

  render() {
    const element = "div" // this.state % 2 == 0 ? "div" : "span"
    const html = parse(`<${element}><my-component first="${'run' + this.state}" style="background:green"><my-component first="${'run' + this.state}"></my-component></my-component></${element}>`);

    return <Host>{html}</Host>;
  }
}
