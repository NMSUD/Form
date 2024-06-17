import{f as i,p as n,D as p,P as m,B as l}from"./dropdown-cf16353e.js";import{U as d,g as c}from"./storybook-18e3f4c6.js";import{A as h}from"./image-5b8b1896.js";import{f as u}from"./imageValidation-a37f0ddc.js";import{b as g}from"./store-583bd420.js";import"./dateHelper-42e3f96b.js";import"./_commonjsHelpers-725317a4.js";import"./textValidation-48b0264a.js";import"./useValidation-87d2c1f1.js";import"./helpIconTooltip-5c8767b9.js";const f=e=>Object.keys(e).filter(s=>isNaN(Number(s))==!0),T=e=>g(p,{get title(){return e.multiple==!0?"Platforms":"Platform"},get selectedValues(){return u(e.value)},get multiple(){return e.multiple},get helpText(){return e.helpText},get placeholder(){return e.placeholder},get onChange(){return e.onChange},get validation(){return e.validation},get showValidationMessages(){return e.showValidationMessages},get options(){return f(m).map(a=>({title:i(n(a)),value:a,image:`${h.platformFolder}/${a}.svg`}))}}),B={title:"Form/PlatformTypeDropdown",component:T,decorators:[d],tags:["autodocs"],argTypes:{...c()}},r={args:{label:"Name",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",validation:l.platforms.validator}},t={args:{label:"Name",multiple:!0,placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",validation:l.platforms.validator}},o={args:{label:"Name",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",showValidationMessages:!0,validation:()=>({isValid:!1,errorMessage:"example error message"})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    validation: BuilderDtoMeta.platforms.validator
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    multiple: true,
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    validation: BuilderDtoMeta.platforms.validator
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
}`,...o.parameters?.docs?.source}}};const A=["Basic","Multiple","ValidationError"];export{r as Basic,t as Multiple,o as ValidationError,A as __namedExportsOrder,B as default};
