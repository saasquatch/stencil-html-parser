import { Component, h, State, Host } from '@stencil/core';

@Component({
  tag: 'my-html-widget',
})
export class MyHtmlWidget {

  @State() state: number = 0;
  @State() html: string;

  timer = setInterval(() => {
    this.state = this.state + 1;
    this.html = `<my-component first="${'run' + this.state}"><my-component first="${'run' + this.state}"></my-component></my-component>`;
  }, 1000);

  render() {
    return <Host innerHTML={this.html} />;
  }
}
