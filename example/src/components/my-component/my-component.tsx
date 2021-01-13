import { Component, Prop, h, State, getElement, JSX } from '@stencil/core';
import { ContextListener } from 'dom-context';
import { example } from '../../utils/exampleContext';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  // shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop({reflect:true}) first: string;

  @State() state: string = Math.random().toString();

  l: ContextListener<number>;
  c: number;
  constructor(){
    console.log("new")
  }
  connectedCallback() {
    const l = new example.Listener({
      element: getElement(this),
      onChange: n => (this.c = n),

    });

    this.l = l;
    l.start();
    console.log("Connected")
  }
  disconnectedCallback(){
    this.l.stop();
    console.log("Connected")
  }

  
  render = useHook(this, () => {
    return (
      <div>
        Prop: {this.first} State: {this.state} Context: {this.c}
        <br />
        <slot />
      </div>
    );
  })
}



function useHook(component:unknown, hook:()=>JSX.Element|JSX.Element[]){
  let state = "foo"
  if(!state){
      // const element = getElement(component);
      state = "foo"
      //@ts-ignore
      const {disconnectedCallback} = component;
      component["disconnectedCallback"] = function(){
          // state.teardown();
          console.log("disconnected");
          state = null;
          disconnectedCallback && disconnectedCallback();
      }
  }
  return ()=>{
      // const out = state.run(hook)
      // state.runEffects();
      return hook();
  }
}