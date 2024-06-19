import{D as p,F as T,n as x,o as n,b as w,c as f,U as v,g as V}from"./debugNode-a24c225f.js";import{c as b,e as L,b as t,S as h,i as c,t as y}from"./store-3f3d1d83.js";import{u as C}from"./useValidation-4ccae39f.js";import{H as F}from"./helpIconTooltip-8b6048b3.js";import{m as d}from"./textValidation-48b0264a.js";import"./_commonjsHelpers-725317a4.js";var M=y("<span> / ");const S=e=>{const[s,i]=C(e.validation),[m,g]=b(e.value?.length??0);return L(()=>{e.showValidationMessages===!0&&i(e.value)},[e.showValidationMessages]),t(f,{get invalid(){return!s().isValid},get children(){return[t(p,{name:"FormTextArea"}),t(T,{get for(){return e.id},width:"100%",get children(){return[t(F,{get label(){return e.label},get helpText(){return e.helpText}}),t(h,{get when(){return e.displayTextLength},get children(){var a=M(),u=a.firstChild;return a.style.setProperty("float","right"),a.style.setProperty("margin-right","0.5em"),c(a,m,u),c(a,()=>e.maxTextLength,null),a}})]}}),t(x,{get id(){return e.id},class:"noselect",get minH(){return e.minH},width:"100% !important",get placeholder(){return e.placeholder},get value(){return e.value},get onBlur(){return n(a=>{i(a),e.onChange(a)})},get onInput(){return n(a=>g(a.length))}}),t(h,{get when(){return!s().isValid},get children(){return t(w,{mt:"0",get children(){return s().errorMessage}})}})]}})},B={title:"Form/TextArea",component:S,decorators:[v],tags:["autodocs"],argTypes:{...V()}},r={args:{label:"Name",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",validation:d(200)}},l={args:{label:"Name",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",validation:d(200),displayTextLength:!0,maxTextLength:200}},o={args:{label:"Name",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",showValidationMessages:!0,validation:()=>({isValid:!1,errorMessage:"example error message"})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    validation: maxLength(200)
  }
}`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    validation: maxLength(200),
    displayTextLength: true,
    maxTextLength: 200
  }
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const P=["Basic","ShowTextCount","ValidationError"];export{r as Basic,l as ShowTextCount,o as ValidationError,P as __namedExportsOrder,B as default};
