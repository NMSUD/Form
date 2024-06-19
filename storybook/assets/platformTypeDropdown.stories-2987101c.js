import{f as i,p as n,D as p,P as m,B as l}from"./dropdown-d89e50bc.js";import{U as d,g as c}from"./debugNode-a24c225f.js";import{A as h}from"./image-d51ea353.js";import{g as u}from"./imageValidation-683bb56a.js";import{b as g}from"./store-3f3d1d83.js";import"./dateHelper-42e3f96b.js";import"./_commonjsHelpers-725317a4.js";import"./logService-f99c2c6c.js";import"./textValidation-48b0264a.js";import"./useValidation-4ccae39f.js";import"./helpIconTooltip-8b6048b3.js";import"./mediaUpload-da93fc8d.js";const f=e=>Object.keys(e).filter(s=>isNaN(Number(s))==!0),T=e=>g(p,{get title(){return e.multiple==!0?"Platforms":"Platform"},get selectedValues(){return u(e.value)},get multiple(){return e.multiple},get helpText(){return e.helpText},get placeholder(){return e.placeholder},get onChange(){return e.onChange},get validation(){return e.validation},get showValidationMessages(){return e.showValidationMessages},get options(){return f(m).map(a=>({title:i(n(a)),value:a,image:`${h.platformFolder}/${a}.svg`}))}}),F={title:"Form/PlatformTypeDropdown",component:T,decorators:[d],tags:["autodocs"],argTypes:{...c()}},r={args:{label:"Name",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",validation:l.platforms.validator}},t={args:{label:"Name",multiple:!0,placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",validation:l.platforms.validator}},o={args:{label:"Name",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",showValidationMessages:!0,validation:()=>({isValid:!1,errorMessage:"example error message"})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const E=["Basic","Multiple","ValidationError"];export{r as Basic,t as Multiple,o as ValidationError,E as __namedExportsOrder,F as default};
