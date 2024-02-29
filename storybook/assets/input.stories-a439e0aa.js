import{F as c,I as d,b as h,c as m,U as u,g}from"./storybook-670e6310.js";import{e as p,b as a,f,S as T}from"./store-583bd420.js";import{f as V}from"./dateHelper-42e3f96b.js";import{o as x}from"./eventHelper-afabd18e.js";import{u as w}from"./useValidation-87d2c1f1.js";import{H as M}from"./helpIconTooltip-126e8490.js";import"./_commonjsHelpers-725317a4.js";const b=e=>{const[s,i]=w(e.validation);p(()=>{e.showValidationMessages===!0&&i(e.value)},[e.showValidationMessages]);const l=(r,n)=>n==="datetime-local"?V(r):r;return a(m,{get invalid(){return!s().isValid},get children(){return[a(c,{textAlign:"center",get for(){return e.id},get children(){return[f(()=>e.label),a(M,{get helpText(){return e.helpText}})]}}),a(d,{get id(){return e.id},class:"noselect",get placeholder(){return e.placeholder},get value(){return l(e.value,e.inputType)},get type(){return e.inputType},get min(){return e.min},get max(){return e.max},get disabled(){return e.disabled},get onBlur(){return x(r=>{e.onChange(r),i(r)})}}),a(T,{get when(){return!s().isValid},get children(){return a(h,{get children(){return s().errorMessage}})}})]}})},N={title:"Form/Input",component:b,decorators:[u],tags:["autodocs"],argTypes:{...g()}},t={args:{label:"Name",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",showValidationMessages:!0}},o={args:{label:"Name",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",showValidationMessages:!0,validation:()=>({isValid:!1,errorMessage:"example error message"})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    showValidationMessages: true
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    showValidationMessages: true,
    validation: () => ({
      isValid: false,
      errorMessage: 'example error message'
    })
  }
}`,...o.parameters?.docs?.source}}};const B=["Basic","ValidationError"];export{t as Basic,o as ValidationError,B as __namedExportsOrder,N as default};
