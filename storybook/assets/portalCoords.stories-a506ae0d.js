import{C as h}from"./communityDto.meta-71be781f.js";import{F as p,I as f,S as C,B as T,T as x,b as v,c as I,U as V,g as F}from"./storybook-18e3f4c6.js";import{c as S,e as s,b as a,f as M,F as b,S as w}from"./store-583bd420.js";import{p as u}from"./form-7169fb77.js";import{o as y}from"./eventHelper-856bb71c.js";import{u as B}from"./useValidation-87d2c1f1.js";import{H as U}from"./helpIconTooltip-5c8767b9.js";import"./image-45cd305e.js";import"./imageValidation-675b9c6f.js";import"./dateHelper-42e3f96b.js";import"./_commonjsHelpers-725317a4.js";import"./textValidation-e49b95b7.js";const k=e=>{const[l,m]=B(e.validation),[i,o]=S(e.value);s(()=>{e.showValidationMessages===!0&&m(e.value)},[e.showValidationMessages]),s(()=>{(e.value==null||e.value.length===0)&&o("")},[e.value]);const c=t=>{o(t),e.onChange(t)},g=t=>()=>{o(r=>{if(r.length>=12)return r;const d=r+t;return c(d),d})};return s(()=>{const t=(i()??"").split("").filter(r=>u.includes(r.toLowerCase())).join("").toUpperCase().slice(0,12);o(t),e.onChange(t)},[i]),a(I,{get invalid(){return!l().isValid},get children(){return[a(p,{textAlign:"center",get for(){return e.id},get children(){return[M(()=>e.label),a(U,{get helpText(){return e.helpText}})]}}),a(f,{get id(){return e.id},class:"nms-portal-font noselect",get placeholder(){return e.placeholder},get value(){return i()},size:"lg",maxlength:12,get onInput(){return y(c)}}),a(C,{columns:{"@initial":3,"@sm":4,"@md":8,"@lg":16},mt:"$2",class:"nms-portal-font",gap:"4px",get children(){return a(b,{each:u,children:t=>a(T,{variant:"outline",size:"lg",p:"0",get onClick(){return g(t)},get children(){return a(x,{size:"4xl",get children(){return t.toUpperCase()}})}})})}}),a(w,{get when(){return!l().isValid},get children(){return a(v,{get children(){return l().errorMessage}})}})]}})},q={title:"Form/PortalCoordsInput",component:k,decorators:[V],tags:["autodocs"],argTypes:{...F()}},n={args:{label:"Social links",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",validation:h.socials.validator,onChange:()=>{}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Social links',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    validation: CommunityDtoMeta.socials.validator,
    onChange: () => {}
  }
}`,...n.parameters?.docs?.source}}};const J=["Basic"];export{n as Basic,J as __namedExportsOrder,q as default};
