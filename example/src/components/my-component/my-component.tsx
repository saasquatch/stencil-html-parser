import { Component, Prop, h, State, getElement } from '@stencil/core';
import { ContextListener } from 'dom-context';
import { example } from '../../utils/exampleContext';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  @State() state: string = Math.random().toString();

  l: ContextListener<number>;
  c: number;
  connectedCallback() {
    const l = new example.Listener({
      element: getElement(this),
      onChange: n => (this.c = n),
    });

    this.l = l;
    l.start();
  }
  disconnectedCallback(){
    this.l.stop();
  }

  
  render() {
    return (
      <div>
        Prop: {this.first} State: {this.state} Context: {this.c}
        <br />
        <slot />
      </div>
    );
  }
}
