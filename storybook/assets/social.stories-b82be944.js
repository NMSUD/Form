import{A as M,s as b}from"./socialLinkAvatar-fa0b7df2.js";import{C as V}from"./communityDto.meta-3503b455.js";import{k as y,t as v,c as x,F as A,d as F,I as E,y as L,b as P,H as _,V as H,U as $,g as z}from"./storybook-670e6310.js";import{e as s}from"./imageValidation-a6131692.js";import{o as D}from"./eventHelper-afabd18e.js";import{b as a,m as B,g as f,t as I,s as S,c as C,e as K,f as R,S as U,F as W}from"./store-583bd420.js";import{u as O}from"./useValidation-87d2c1f1.js";import{H as G}from"./helpIconTooltip-126e8490.js";import{k as j}from"./form-7169fb77.js";import"./image-4eb0e5f9.js";import"./textValidation-ade014ff.js";import"./_commonjsHelpers-725317a4.js";var q=I(`<svg><path d="M165.013,288.946h75.034c6.953,0,12.609,5.656,12.609,12.608v26.424c0,7.065,3.659,9.585,7.082,9.585
		c2.106,0,4.451-0.936,6.78-2.702l90.964-69.014c3.416-2.589,5.297-6.087,5.297-9.844c0-3.762-1.881-7.259-5.297-9.849
		l-90.964-69.014c-2.329-1.766-4.674-2.702-6.78-2.702c-3.424,0-7.082,2.519-7.082,9.584v26.425c0,6.952-5.656,12.608-12.609,12.608
		h-75.034c-8.707,0-15.79,7.085-15.79,15.788v34.313C149.223,281.862,156.305,288.946,165.013,288.946z"></svg>`,!1,!0),J=I(`<svg><path d="M256,0C114.842,0,0.002,114.84,0.002,256S114.842,512,256,512c141.158,0,255.998-114.84,255.998-256
		S397.158,0,256,0z M256,66.785c104.334,0,189.216,84.879,189.216,189.215S360.334,445.215,256,445.215S66.783,360.336,66.783,256
		S151.667,66.785,256,66.785z"></svg>`,!1,!0);const N=e=>a(y,B({viewBox:"0 0 512 512"},e,{get children(){return[(()=>{var t=q();return f(()=>S(t,"fill",v.primary)),t})(),(()=>{var t=J();return f(()=>S(t,"fill",v.primary)),t})()]}})),Q=e=>{const[t,m]=O(e.validation),[c,h]=C(""),[p,u]=C(s(e.value));K(()=>{e.showValidationMessages===!0&&m(e.value)},[e.showValidationMessages]);const k=r=>{r.keyCode===j.enter&&g(c())},g=r=>{t().isValid!==!1&&(u(d=>{const o=[...s(d),r];return e.onChange(o),o}),h(""))},T=r=>{u(d=>{const o=s(d).filter(w=>w!=r);return e.onChange(o),o})};return a(H,{get children(){return[a(x,{get invalid(){return!t().isValid},get children(){return[a(A,{textAlign:"center",get for(){return e.id},get children(){return[R(()=>e.label),a(G,{get helpText(){return e.helpText}})]}}),a(F,{get children(){return[a(E,{get id(){return e.id},class:"noselect",get placeholder(){return e.placeholder},get value(){return c()},get onInput(){return D(r=>{h(r),m([...s(p()),r])})},onKeyPress:k}),a(L,{get children(){return a(N,{fontSize:"1.5em",class:"pointer",onClick:()=>g(c())})}})]}}),a(U,{get when(){return!t().isValid},get children(){return a(P,{get children(){return t().errorMessage}})}})]}}),a(_,{mt:"$2",flexWrap:"wrap",get children(){return a(W,{get each(){return p()},children:r=>a(M,{url:r,onChange:()=>T(r)})})}})]}})},ce={title:"Form/SocialInput",component:Q,decorators:[$],tags:["autodocs"],argTypes:{...z()}},l={args:{label:"Social links",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",validation:V.socials.validator,onChange:()=>{}}},n={args:{label:"Social links",placeholder:"this is a placeholder",value:b.map(e=>e.replaceAll(".svg",".com").replaceAll(".png",".com")),validation:V.socials.validator,onChange:()=>{}}},i={args:{label:"Social links",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",showValidationMessages:!0,validation:()=>({isValid:!1,errorMessage:"example error message"}),onChange:()=>{}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Social links',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    validation: CommunityDtoMeta.socials.validator,
    onChange: () => {}
  }
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Social links',
    placeholder: 'this is a placeholder',
    value: socialIcons.map(s => s.replaceAll('.svg', '.com').replaceAll('.png', '.com')),
    validation: CommunityDtoMeta.socials.validator,
    onChange: () => {}
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Social links',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    showValidationMessages: true,
    validation: () => ({
      isValid: false,
      errorMessage: 'example error message'
    }),
    onChange: () => {}
  }
}`,...i.parameters?.docs?.source}}};const de=["Basic","WithAllPossibleIcons","ValidationError"];export{l as Basic,i as ValidationError,n as WithAllPossibleIcons,de as __namedExportsOrder,ce as default};
