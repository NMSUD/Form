import{F as u,j as T,b as x,c as w,U as f,g as v}from"./storybook-670e6310.js";import{c as V,e as L,b as t,f as b,S as n,i as h,t as y}from"./store-583bd420.js";import{o as c}from"./eventHelper-afabd18e.js";import{u as M}from"./useValidation-87d2c1f1.js";import{H as C}from"./helpIconTooltip-126e8490.js";import{m as d}from"./textValidation-ade014ff.js";import"./_commonjsHelpers-725317a4.js";var S=y("<span> / ");const F=e=>{const[l,i]=M(e.validation),[m,g]=V(e.value?.length??0);return L(()=>{e.showValidationMessages===!0&&i(e.value)},[e.showValidationMessages]),t(w,{get invalid(){return!l().isValid},get children(){return[t(u,{get for(){return e.id},width:"100%",get children(){return[b(()=>e.label),t(C,{get helpText(){return e.helpText}}),t(n,{get when(){return e.displayTextLength},get children(){var a=S(),p=a.firstChild;return a.style.setProperty("float","right"),a.style.setProperty("margin-right","0.5em"),h(a,m,p),h(a,()=>e.maxTextLength,null),a}})]}}),t(T,{get id(){return e.id},class:"noselect",get minH(){return e.minH},width:"100% !important",get placeholder(){return e.placeholder},get value(){return e.value},get onBlur(){return c(a=>{i(a),e.onChange(a)})},get onInput(){return c(a=>g(a.length))}}),t(n,{get when(){return!l().isValid},get children(){return t(x,{mt:"0",get children(){return l().errorMessage}})}})]}})},P={title:"Form/TextArea",component:F,decorators:[f],tags:["autodocs"],argTypes:{...v()}},r={args:{label:"Name",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",validation:d(200)}},o={args:{label:"Name",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",validation:d(200),displayTextLength:!0,maxTextLength:200}},s={args:{label:"Name",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",showValidationMessages:!0,validation:()=>({isValid:!1,errorMessage:"example error message"})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    validation: maxLength(200)
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    validation: maxLength(200),
    displayTextLength: true,
    maxTextLength: 200
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};const U=["Basic","ShowTextCount","ValidationError"];export{r as Basic,o as ShowTextCount,s as ValidationError,U as __namedExportsOrder,P as default};
