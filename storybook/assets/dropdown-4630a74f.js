import{D as x}from"./image-4eb0e5f9.js";import{n as o,s as T,m as n,b as d,v as h,d as I,w as F,a as P,e as f}from"./imageValidation-a6131692.js";import{i as w,a as v,b as L}from"./dateHelper-42e3f96b.js";import{m as b,a as u,s as O}from"./textValidation-ade014ff.js";import{F as A,m as B,n as Y,o as C,p as R,a as U,f as q,h as y,q as V,r as E,s as $,u as k,v as H,w as N,x as G,b as W,c as j}from"./storybook-670e6310.js";import{c as z,e as S,b as e,S as s,f as J,F as p}from"./store-583bd420.js";import{u as K}from"./useValidation-87d2c1f1.js";import{H as Q}from"./helpIconTooltip-126e8490.js";const X=t=>l=>w(t,l)?{isValid:!0}:{isValid:!1,errorMessage:`${l} | Minimum date is ${v(t,"DD MMM YY")}`},Z=t=>l=>w(l,t)?{isValid:!0}:{isValid:!1,errorMessage:`Maximum date is ${v(t,"DD MMM YY")}`},_=500,ee=new Date("2016-08-09"),te=new Date,ce={id:{label:"Id",validator:o},profilePicUrl:{label:"Profile Pic Url",saveToLocalStorage:!0,validator:o},profilePicFile:{label:"Profile picture",swaggerSchema:{type:"string",format:"binary"},defaultValue:null,saveToLocalStorage:!0,validator:T({Api:o,UI:n(P("You need to upload an image"),F(x.profilePic))})},name:{label:"Name",defaultValue:"",helpText:"Your IN-GAME character name",validator:n(u(2),b(100))},bio:{label:"Bio",defaultValue:"",validator:n(u(2),b(_))},platforms:{label:"Platforms",defaultValue:[],swaggerSchema:{type:"array",items:{type:"number"}},validator:d(1)},startedPlaying:{label:"Date that you started playing",swaggerSchema:{type:"string",items:{format:"date-time"}},defaultValue:L(new Date),validator:n(X(ee),Z(te))},buildTechniquesUsed:{label:"Build techniques used",swaggerSchema:{type:"array",items:{type:"string"}},defaultValue:[],validator:d(1)},communityAffiliations:{label:"Community affiliations",swaggerSchema:{type:"array",items:{type:"string"}},defaultValue:[],helpText:"Are you unable to find a community? Ask the community to add it on this site, or add it yourself on the community form.",validator:o},labels:{label:"Labels",defaultValue:[],swaggerSchema:{type:"array",items:{type:"string"}},validator:n(d(1),h(u(1)))},socials:{label:"Socials",defaultValue:[],swaggerSchema:{type:"array",items:{type:"string"}},validator:h(n(u(2),O))},contactDetails:I},de=t=>{const[l,g]=z(t.selectedValues??[],{equals:!1}),[c,m]=K(t.validation);S(()=>{if(t.showValidationMessages===!0){const a=f(t.selectedValues);m(a)}},[t.showValidationMessages]),S(()=>{g(t.selectedValues??[])});const D=a=>{g(a);const i=f(a);t.onSelect?.(i),m(i)},M=a=>t.options.find(r=>r.value==a);return e(j,{get invalid(){return!c().isValid},get children(){return[e(s,{get when(){return t.hideTitle!=!0},get children(){return e(A,{get children(){return[J(()=>t.title),e(Q,{get helpText(){return t.helpText}})]}})}}),e(B,{get multiple(){return t.multiple},get value(){return l()},onChange:D,get children(){return[e(Y,{get children(){return[e(C,{class:"noselect",get children(){return t.placeholder}}),e(R,{class:"noselect",children:({selectedOptions:a})=>e(U,{alignItems:"flex-start",get children(){return e(p,{each:a,children:i=>{const r=M(i.value);return e(q,{borderRadius:5,m:"0.125em 0.25em 0.125em 0",get children(){return e(s,{when:r!=null,get fallback(){return e(y,{textAlign:"start",get children(){return i.textValue}})},get children(){return[e(s,{get when(){return r.image!=null},get children(){return e(V,{get src(){return r.image},get alt(){return r.title},borderRadius:3,height:"1em",width:"1em",mr:"0.5em"})}}),e(y,{textAlign:"start",get children(){return r.title}})]}})}})}})}})}),e(E,{})]}}),e($,{class:"noselect",get children(){return e(k,{get children(){return e(p,{get each(){return t.options},children:a=>e(H,{get value(){return a.value},get disabled(){return a.disabled},get children(){return[e(s,{get when(){return a.image!=null},get children(){return e(V,{get src(){return a.image},get alt(){return a.title},borderRadius:5,maxHeight:"2em",maxWidth:"2em",ml:"0.5em"})}}),e(N,{get children(){return a.listTitle??a.title}}),e(G,{})]}})})}})}})]}}),e(s,{get when(){return!c().isValid},get children(){return e(W,{get children(){return c().errorMessage}})}})]}})};export{ce as B,de as D};