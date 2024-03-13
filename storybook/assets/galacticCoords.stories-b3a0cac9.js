import{F as G,a as b,C as v,T as $,I as A,b as B,c as M,U as j,g as S}from"./storybook-670e6310.js";import{c as l,e as R,b as t,f as U,F as D,S as V}from"./store-583bd420.js";import{g as I}from"./form-7169fb77.js";import{o as E}from"./eventHelper-afabd18e.js";import{u as H}from"./useValidation-87d2c1f1.js";import{H as L}from"./helpIconTooltip-126e8490.js";import"./_commonjsHelpers-725317a4.js";const y=o=>{let d,p,h;const[g,f]=H(o.validation),[n,m]=l(""),[a,C]=l(""),[i,x]=l(""),[c,T]=l("");R(()=>{o.showValidationMessages===!0&&f(o.value)},[o.showValidationMessages]);const w=(e,s)=>E(r=>{if(r==null)return;r.length>4&&(r=r.slice(0,4)),e(r),r.split("").filter(F=>I.includes(F.toLowerCase())).join("").length===4&&s?.focus?.()});return R(()=>{console.log([n(),a(),i(),c()].join(":"));const e=[n(),a(),i(),c()].join(":").split("").filter(r=>I.includes(r.toLowerCase())).join("").toUpperCase();console.log(e);const s=e.split(":");m(s[0]),C(s[1]),x(s[2]),T(s[3]),f(e),o.onChange(e)},[n,a,i,c]),t(M,{get invalid(){return!g().isValid},get children(){return[t(G,{textAlign:"center",get for(){return o.id},get children(){return[U(()=>o.label),t(L,{get helpText(){return o.helpText}})]}}),t(b,{get children(){return t(D,{each:[{id:"1",accessor:n,settor:m,setCurrentRef:e=>e,nextRef:()=>d},{id:"2",accessor:a,settor:C,setCurrentRef:e=>d=e,nextRef:()=>p},{id:"3",accessor:i,settor:x,setCurrentRef:e=>p=e,nextRef:()=>h},{id:"4",accessor:c,settor:T,setCurrentRef:e=>h=e}],children:(e,s)=>[t(V,{get when(){return s()!==0},get children(){return t(v,{get children(){return t($,{size:"xl",p:"$2",children:":"})}})}}),t(A,{ref:r=>e.setCurrentRef(r),get id(){return`galactic-group-${e.id}`},class:"noselect",textAlign:"center",minWidth:"200px",get placeholder(){return`${e.id}${e.id}${e.id}${e.id}`},get value(){return e.accessor()},size:"lg",get onInput(){return w(e.settor,e.nextRef?.())}})]})}}),t(V,{get when(){return!g().isValid},get children(){return t(B,{get children(){return g().errorMessage}})}})]}})},J={title:"Form/GalacticCoordsInput",component:y,decorators:[j],tags:["autodocs"],argTypes:{...S()}},u={args:{label:"Galactic coordinates",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",onChange:()=>{}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Galactic coordinates',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    onChange: () => {}
  }
}`,...u.parameters?.docs?.source}}};const K=["Basic"];export{u as Basic,K as __namedExportsOrder,J as default};