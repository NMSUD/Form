import{D as d,F as c,I as h,o as u,d as m,e as g,U as p,a as T}from"./debugNode-95c00bf2.js";import{e as V,b as a,S as f}from"./store-b630eac4.js";import{f as x}from"./dateHelper-42e3f96b.js";import{u as w}from"./useValidation-560d312b.js";import{H as b}from"./helpIconTooltip-da4be836.js";import"./_commonjsHelpers-725317a4.js";const M=e=>{const[s,i]=w(e.validation);V(()=>{e.showValidationMessages===!0&&i(e.value)},[e.showValidationMessages]);const l=(r,n)=>n==="datetime-local"?x(r):r;return a(g,{get invalid(){return!s().isValid},get children(){return[a(d,{name:"FormLongInput"}),a(c,{textAlign:"center",get for(){return e.id},get children(){return a(b,{get label(){return e.label},get helpText(){return e.helpText}})}}),a(h,{get id(){return e.id},class:"noselect",get placeholder(){return e.placeholder},get value(){return l(e.value,e.inputType)},get type(){return e.inputType},get min(){return e.min},get max(){return e.max},get disabled(){return e.disabled},get onBlur(){return u(r=>{e.onChange(r),i(r)})}}),a(f,{get when(){return!s().isValid},get children(){return a(m,{get children(){return s().errorMessage}})}})]}})},N={title:"Form/Input",component:M,decorators:[p],tags:["autodocs"],argTypes:{...T()}},t={args:{label:"Name",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",showValidationMessages:!0}},o={args:{label:"Name",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",showValidationMessages:!0,validation:()=>({isValid:!1,errorMessage:"example error message"})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const S=["Basic","ValidationError"];export{t as Basic,o as ValidationError,S as __namedExportsOrder,N as default};
