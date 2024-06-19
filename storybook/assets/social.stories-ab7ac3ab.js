import{A as x,s as y}from"./socialLinkAvatar-2aef5f45.js";import{C as b}from"./communityDto.meta-9f3fb19c.js";import{p as A,t as f,D as M,c as F,F as E,d as L,x as $,I as D,o as P,y as _,b as H,H as z,V as B,U as K,g as R}from"./debugNode-a24c225f.js";import{k as U}from"./form-7169fb77.js";import{g as l}from"./imageValidation-683bb56a.js";import{b as a,m as W,f as S,t as k,s as C,c as I,e as V,S as O,F as G}from"./store-3f3d1d83.js";import{u as N}from"./useValidation-4ccae39f.js";import{H as j}from"./helpIconTooltip-8b6048b3.js";import"./image-d51ea353.js";import"./textValidation-48b0264a.js";import"./_commonjsHelpers-725317a4.js";import"./dateHelper-42e3f96b.js";import"./mediaUpload-da93fc8d.js";import"./logService-f99c2c6c.js";var q=k(`<svg><path d="M165.013,288.946h75.034c6.953,0,12.609,5.656,12.609,12.608v26.424c0,7.065,3.659,9.585,7.082,9.585
		c2.106,0,4.451-0.936,6.78-2.702l90.964-69.014c3.416-2.589,5.297-6.087,5.297-9.844c0-3.762-1.881-7.259-5.297-9.849
		l-90.964-69.014c-2.329-1.766-4.674-2.702-6.78-2.702c-3.424,0-7.082,2.519-7.082,9.584v26.425c0,6.952-5.656,12.608-12.609,12.608
		h-75.034c-8.707,0-15.79,7.085-15.79,15.788v34.313C149.223,281.862,156.305,288.946,165.013,288.946z"></svg>`,!1,!0),J=k(`<svg><path d="M256,0C114.842,0,0.002,114.84,0.002,256S114.842,512,256,512c141.158,0,255.998-114.84,255.998-256
		S397.158,0,256,0z M256,66.785c104.334,0,189.216,84.879,189.216,189.215S360.334,445.215,256,445.215S66.783,360.336,66.783,256
		S151.667,66.785,256,66.785z"></svg>`,!1,!0);const Q=e=>a(A,W({viewBox:"0 0 512 512"},e,{get children(){return[(()=>{var t=q();return S(()=>C(t,"fill",f.primary)),t})(),(()=>{var t=J();return S(()=>C(t,"fill",f.primary)),t})()]}})),X=e=>{const[t,u]=N(e.validation),[d,p]=I(""),[g,m]=I(l(e.value));V(()=>{e.showValidationMessages===!0&&u(e.value)},[e.showValidationMessages]),V(()=>{(e.value==null||e.value.length===0)&&m([])},[e.value]);const T=r=>{r.keyCode===U.enter&&v(d())},v=r=>{t().isValid!==!1&&(m(h=>{const o=[...l(h),r];return e.onChange(o.map(s=>`https://${s}`)),o}),p(""))},w=r=>{m(h=>{const o=l(h).filter(s=>s!=r);return e.onChange(o.map(s=>`https://${s}`)),o})};return a(B,{get children(){return[a(M,{name:"FormSocialInput"}),a(F,{get invalid(){return!t().isValid},get children(){return[a(E,{textAlign:"center",get for(){return e.id},get children(){return a(j,{get label(){return e.label},get helpText(){return e.helpText}})}}),a(L,{get children(){return[a($,{children:"https://"}),a(D,{get id(){return e.id},class:"noselect",get placeholder(){return e.placeholder},get value(){return d()},get onInput(){return P(r=>{p(r),u([...l(g()),r])})},onKeyPress:T}),a(_,{get children(){return a(Q,{fontSize:"1.5em",class:"pointer",onClick:()=>v(d())})}})]}}),a(O,{get when(){return!t().isValid},get children(){return a(H,{get children(){return t().errorMessage}})}})]}}),a(z,{mt:"$2",flexWrap:"wrap",get children(){return a(G,{get each(){return g()},children:r=>a(x,{url:r,onChange:()=>w(r)})})}})]}})},he={title:"Form/SocialInput",component:X,decorators:[K],tags:["autodocs"],argTypes:{...R()}},n={args:{label:"Social links",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",validation:b.socials.validator,onChange:()=>{}}},i={args:{label:"Social links",placeholder:"this is a placeholder",value:y.map(e=>e.replaceAll(".svg",".com").replaceAll(".png",".com")),validation:b.socials.validator,onChange:()=>{}}},c={args:{label:"Social links",placeholder:"this is a placeholder",helpText:"This is a help icon with a tooltip",showValidationMessages:!0,validation:()=>({isValid:!1,errorMessage:"example error message"}),onChange:()=>{}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Social links',
    placeholder: 'this is a placeholder',
    helpText: 'This is a help icon with a tooltip',
    validation: CommunityDtoMeta.socials.validator,
    onChange: () => {}
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Social links',
    placeholder: 'this is a placeholder',
    value: socialIcons.map(s => s.replaceAll('.svg', '.com').replaceAll('.png', '.com')),
    validation: CommunityDtoMeta.socials.validator,
    onChange: () => {}
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};const ue=["Basic","WithAllPossibleIcons","ValidationError"];export{n as Basic,c as ValidationError,i as WithAllPossibleIcons,ue as __namedExportsOrder,he as default};
