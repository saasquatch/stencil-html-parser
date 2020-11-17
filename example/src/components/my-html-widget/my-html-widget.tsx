import { Component, h, State, Host } from '@stencil/core';

@Component({
  tag: 'my-html-widget',
})
export class MyHtmlWidget {

  @State() state: number = 0;

  timer = setInterval(() => {
    this.state = this.state + 1;
  }, 1000);

  render() {
    const html = `<my-component first="${'run' + this.state}"><my-component first="${'run' + this.state}"></my-component></my-component>`;
    return <Host innerHTML={html} />;
  }
}
