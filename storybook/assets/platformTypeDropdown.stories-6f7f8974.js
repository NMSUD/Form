import{D as n,B as i}from"./dropdown-4630a74f.js";import{U as p,g as m}from"./storybook-670e6310.js";import{A as c}from"./image-4eb0e5f9.js";import{e as u}from"./imageValidation-a6131692.js";import{b as d}from"./store-583bd420.js";import"./dateHelper-42e3f96b.js";import"./_commonjsHelpers-725317a4.js";import"./textValidation-ade014ff.js";import"./useValidation-87d2c1f1.js";import"./helpIconTooltip-126e8490.js";var t=(e=>(e[e.PSX=0]="PSX",e[e.XBX=1]="XBX",e[e.Steam=2]="Steam",e[e.Apple=3]="Apple",e))(t||{});const h=e=>{switch(e){case 0:return"Playstation";case 1:return"Xbox";case 2:return"Steam";case 3:return"Apple"}return"Unknown"},g=e=>{const r={[t[0]]:0,[t[1]]:1,[t[2]]:2,[t[3]]:3,[0 .toString()]:0,[1 .toString()]:1,[2 .toString()]:2,[3 .toString()]:3}[e];return r??2},f=e=>Object.keys(e).filter(r=>isNaN(Number(r))==!0),v=e=>d(n,{get title(){return e.multiple==!0?"Platforms":"Platform"},get selectedValues(){return u(e.value)},get multiple(){return e.multiple},get helpText(){return e.helpText},get placeholder(){return e.placeholder},get onSelect(){return e.onChange},get validation(){return e.validation},get showValidationMessages(){return e.showValidationMessages},get options(){return f(t).map(a=>({title:h(g(a)),value:a,image:`${c.platformFolder}/${a}.svg`}))}}),D={title:"Form/PlatformTypeDropdown",component:v,decorators:[p],tags:["autodocs"],argTypes:{...m()}},o={args:{label:"Name",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",validation:i.platforms.validator}},l={args:{label:"Name",multiple:!0,placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",validation:i.platforms.validator}},s={args:{label:"Name",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",showValidationMessages:!0,validation:()=>({isValid:!1,errorMessage:"example error message"})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    validation: BuilderDtoMeta.platforms.validator
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Name',
    multiple: true,
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    validation: BuilderDtoMeta.platforms.validator
  }
}`,...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};const X=["Basic","Multiple","ValidationError"];export{o as Basic,l as Multiple,s as ValidationError,X as __namedExportsOrder,D as default};
