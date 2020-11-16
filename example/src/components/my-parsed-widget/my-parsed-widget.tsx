import { Component, Prop, h, State, Host, VNode } from '@stencil/core';
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
  @State() html: VNode[];

  timer = setInterval(() => {
    this.state = this.state + 1;

    this.html = parse(`<my-component first="${'run' + this.state}" style="background:red"><my-component first="${'run' + this.state}"></my-component></my-component>`);
  }, 1000);

  render() {
    return <Host>{this.html}</Host>;
  }
}
