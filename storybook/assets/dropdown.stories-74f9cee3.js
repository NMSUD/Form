import{D as l,B as s}from"./dropdown-4630a74f.js";import{U as i,g as n}from"./storybook-670e6310.js";import{e as o}from"./imageValidation-a6131692.js";import{b as m}from"./store-583bd420.js";import"./image-4eb0e5f9.js";import"./dateHelper-42e3f96b.js";import"./_commonjsHelpers-725317a4.js";import"./textValidation-ade014ff.js";import"./useValidation-87d2c1f1.js";import"./helpIconTooltip-126e8490.js";const p=e=>m(l,{get title(){return e.label},get helpText(){return e.helpText},get selectedValues(){return o(e.value)},get multiple(){return e.multiple},get placeholder(){return e.placeholder},get showValidationMessages(){return e.showValidationMessages},get onSelect(){return e.onChange},get validation(){return e.validation},get options(){return o(e.options)}}),D={title:"Form/Dropdown",component:p,decorators:[i],tags:["autodocs"],argTypes:{...n()}},t={args:{label:"Name",placeholder:"this is a placeholder",options:["test1","test2","test3"].map(e=>({title:e,value:e})),validation:s.platforms.validator}},a={args:{label:"Name",multiple:!0,placeholder:"this is a placeholder",options:["test1","test2","test3"].map(e=>({title:e,value:e})),validation:s.platforms.validator}},r={args:{label:"Name",placeholder:"this is a placeholder",showValidationMessages:!0,options:["test1","test2","test3"].map(e=>({title:e,value:e})),validation:()=>({isValid:!1,errorMessage:"example error message"})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const w=["Basic","Multiple","ValidationError"];export{t as Basic,a as Multiple,r as ValidationError,w as __namedExportsOrder,D as default};
