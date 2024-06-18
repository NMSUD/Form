import{D as i,B as l}from"./dropdown-b98b649c.js";import{U as n,a as m}from"./debugNode-95c00bf2.js";import{g as s}from"./imageValidation-f42dbc4d.js";import{b as p}from"./store-b630eac4.js";import"./image-d51ea353.js";import"./dateHelper-42e3f96b.js";import"./_commonjsHelpers-725317a4.js";import"./logService-94d63054.js";import"./textValidation-48b0264a.js";import"./useValidation-560d312b.js";import"./helpIconTooltip-da4be836.js";import"./mediaUpload-da93fc8d.js";const d=e=>p(i,{get title(){return e.label},get helpText(){return e.helpText},get selectedValues(){return s(e.value)},get multiple(){return e.multiple},get placeholder(){return e.placeholder},get showValidationMessages(){return e.showValidationMessages},onChange:o=>{e.multiple===!1&&(o?.length??0)===1&&e.onChange?.(o[0]),e.onChange?.(o)},get validation(){return e.validation},get options(){return s(e.options)}}),C={title:"Form/Dropdown",component:d,decorators:[n],tags:["autodocs"],argTypes:{...m()}},t={args:{label:"Name",placeholder:"this is a placeholder",options:["test1","test2","test3"].map(e=>({title:e,value:e})),validation:l.platforms.validator}},a={args:{label:"Name",multiple:!0,placeholder:"this is a placeholder",options:["test1","test2","test3"].map(e=>({title:e,value:e})),validation:l.platforms.validator}},r={args:{label:"Name",placeholder:"this is a placeholder",showValidationMessages:!0,options:["test1","test2","test3"].map(e=>({title:e,value:e})),validation:()=>({isValid:!1,errorMessage:"example error message"})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const N=["Basic","Multiple","ValidationError"];export{t as Basic,a as Multiple,r as ValidationError,N as __namedExportsOrder,C as default};
