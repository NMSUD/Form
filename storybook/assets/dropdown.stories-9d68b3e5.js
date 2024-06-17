import{D as n,B as l}from"./dropdown-cf16353e.js";import{U as i,g as m}from"./storybook-18e3f4c6.js";import{f as s}from"./imageValidation-a37f0ddc.js";import{b as d}from"./store-583bd420.js";import"./image-5b8b1896.js";import"./dateHelper-42e3f96b.js";import"./_commonjsHelpers-725317a4.js";import"./textValidation-48b0264a.js";import"./useValidation-87d2c1f1.js";import"./helpIconTooltip-5c8767b9.js";const p=e=>d(n,{get title(){return e.label},get helpText(){return e.helpText},get selectedValues(){return s(e.value)},get multiple(){return e.multiple},get placeholder(){return e.placeholder},get showValidationMessages(){return e.showValidationMessages},onChange:o=>{e.multiple===!1&&(o?.length??0)===1&&e.onChange?.(o[0]),e.onChange?.(o)},get validation(){return e.validation},get options(){return s(e.options)}}),x={title:"Form/Dropdown",component:p,decorators:[i],tags:["autodocs"],argTypes:{...m()}},t={args:{label:"Name",placeholder:"this is a placeholder",options:["test1","test2","test3"].map(e=>({title:e,value:e})),validation:l.platforms.validator}},a={args:{label:"Name",multiple:!0,placeholder:"this is a placeholder",options:["test1","test2","test3"].map(e=>({title:e,value:e})),validation:l.platforms.validator}},r={args:{label:"Name",placeholder:"this is a placeholder",showValidationMessages:!0,options:["test1","test2","test3"].map(e=>({title:e,value:e})),validation:()=>({isValid:!1,errorMessage:"example error message"})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    placeholder: 'this is a placeholder',
    options: ['test1', 'test2', 'test3'].map(t => ({
      title: t,
      value: t
    })),
    validation: BuilderDtoMeta.platforms.validator
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    multiple: true,
    placeholder: 'this is a placeholder',
    options: ['test1', 'test2', 'test3'].map(t => ({
      title: t,
      value: t
    })),
    validation: BuilderDtoMeta.platforms.validator
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    placeholder: 'this is a placeholder',
    showValidationMessages: true,
    options: ['test1', 'test2', 'test3'].map(t => ({
      title: t,
      value: t
    })),
    validation: () => ({
      isValid: false,
      errorMessage: 'example error message'
    })
  }
}`,...r.parameters?.docs?.source}}};const B=["Basic","Multiple","ValidationError"];export{t as Basic,a as Multiple,r as ValidationError,B as __namedExportsOrder,x as default};
