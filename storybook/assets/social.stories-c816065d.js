import{k as M,t as v,c as b,F as y,d as x,I as A,y as F,b as E,H as L,V as P,U as _,g as H}from"./storybook-670e6310.js";import{e as s}from"./imageValidation-63e3061a.js";import{o as $}from"./eventHelper-afabd18e.js";import{b as a,m as z,g as f,t as V,s as S,c as C,e as D,f as B,S as K,F as R}from"./store-583bd420.js";import{u as U}from"./useValidation-87d2c1f1.js";import{H as W}from"./helpIconTooltip-126e8490.js";import{A as O,s as G}from"./socialLinkAvatar-dda059b8.js";import{k as j}from"./form-7169fb77.js";import{C as I}from"./communityDto-6f3650fa.js";import"./_commonjsHelpers-725317a4.js";import"./textValidation-ade014ff.js";import"./image-4eb0e5f9.js";var q=V(`<svg><path d="M165.013,288.946h75.034c6.953,0,12.609,5.656,12.609,12.608v26.424c0,7.065,3.659,9.585,7.082,9.585
		c2.106,0,4.451-0.936,6.78-2.702l90.964-69.014c3.416-2.589,5.297-6.087,5.297-9.844c0-3.762-1.881-7.259-5.297-9.849
		l-90.964-69.014c-2.329-1.766-4.674-2.702-6.78-2.702c-3.424,0-7.082,2.519-7.082,9.584v26.425c0,6.952-5.656,12.608-12.609,12.608
		h-75.034c-8.707,0-15.79,7.085-15.79,15.788v34.313C149.223,281.862,156.305,288.946,165.013,288.946z"></svg>`,!1,!0),J=V(`<svg><path d="M256,0C114.842,0,0.002,114.84,0.002,256S114.842,512,256,512c141.158,0,255.998-114.84,255.998-256
		S397.158,0,256,0z M256,66.785c104.334,0,189.216,84.879,189.216,189.215S360.334,445.215,256,445.215S66.783,360.336,66.783,256
		S151.667,66.785,256,66.785z"></svg>`,!1,!0);const N=e=>a(M,z({viewBox:"0 0 512 512"},e,{get children(){return[(()=>{var t=q();return f(()=>S(t,"fill",v.primary)),t})(),(()=>{var t=J();return f(()=>S(t,"fill",v.primary)),t})()]}})),Q=e=>{const[t,m]=U(e.validation),[c,h]=C(""),[p,u]=C(s(e.value));D(()=>{e.showValidationMessages===!0&&m(e.value)},[e.showValidationMessages]);const k=r=>{r.keyCode===j.enter&&g(c())},g=r=>{t().isValid!==!1&&(u(d=>{const o=[...s(d),r];return e.onChange(o),o}),h(""))},T=r=>{u(d=>{const o=s(d).filter(w=>w!=r);return e.onChange(o),o})};return a(P,{get children(){return[a(b,{get invalid(){return!t().isValid},get children(){return[a(y,{textAlign:"center",get for(){return e.id},get children(){return[B(()=>e.label),a(W,{get helpText(){return e.helpText}})]}}),a(x,{get children(){return[a(A,{get id(){return e.id},class:"noselect",get placeholder(){return e.placeholder},get value(){return c()},get onInput(){return $(r=>{h(r),m([...s(p()),r])})},onKeyPress:k}),a(F,{get children(){return a(N,{fontSize:"1.5em",class:"pointer",onClick:()=>g(c())})}})]}}),a(K,{get when(){return!t().isValid},get children(){return a(E,{get children(){return t().errorMessage}})}})]}}),a(L,{mt:"$2",flexWrap:"wrap",get children(){return a(R,{get each(){return p()},children:r=>a(O,{url:r,onChange:()=>T(r)})})}})]}})},ce={title:"Form/SocialInput",component:Q,decorators:[_],tags:["autodocs"],argTypes:{...H()}},l={args:{label:"Social links",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",validation:I.socials.validator,onChange:()=>{}}},n={args:{label:"Social links",placeholder:"this is a placeholder",value:G.map(e=>e.replaceAll(".svg",".com").replaceAll(".png",".com")),validation:I.socials.validator,onChange:()=>{}}},i={args:{label:"Social links",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",showValidationMessages:!0,validation:()=>({isValid:!1,errorMessage:"example error message"}),onChange:()=>{}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
