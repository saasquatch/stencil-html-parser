import { Component, Prop, h, State } from '@stencil/core';
import { example } from '../../utils/exampleContext';

@Component({
  tag: 'my-widget',
})
export class MyWidget {
  /**
   * The first name
   */
  @Prop() first: string;

  @State() state: number = 0;


  constructor(){
    example.provideGlobally(1000);
  }

  timer = setInterval(() => {
    this.state = this.state + 1;
    example.provideGlobally(1000 - this.state);
  }, 2000);

  timer2 = setInterval(() => {
    example.provideGlobally(1000 - this.state);
  }, 1000);


  render() {
    return (
      <div class="red" style={{}}>
        <h1>Does my child re-render? {this.state}</h1>
        <h2>Component</h2>
        <my-component first={'Run' + this.state}>
          <my-component first={'Run' + this.state} />
        </my-component>
        <h2>Parsed</h2>
        <my-parsed-widget></my-parsed-widget>
        {/* <h2>Inner HTML</h2>
        <my-html-widget></my-html-widget> */}
      </div>
    );
  }
}
