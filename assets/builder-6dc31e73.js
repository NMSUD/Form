import{f as b,p as C,P as v,B as x,L as w,b as P,c as M,F as z,a as h,d as V}from"./animation-c078880a.js";import{F as L,r as _,a as k,f as A}from"./social-6431db72.js";import{u as B,H as N,F as f,f as p,a as Y}from"./input-dd7b6235.js";import{m as D,D as $,F as E}from"./baseApiService-d18e1844.js";import{e as O,F as R}from"./networkDropdown-ff34b192.js";import{c as r,A as U,a as I,b as y,D as q,F as G,I as H,d as K,o as j,e as J,B as Q,f as W,T as X,g as Z,h as ee,S as te,i as re,j as ae,k as oe}from"./index-c7dd3975.js";import{G as o}from"./grid-dbfa805a.js";import{k as ne}from"./form-ee898103.js";import{F}from"./bugReportForm-782674f1.js";import"./networkState-0824194a.js";const le=e=>Object.keys(e).filter(t=>isNaN(Number(t))==!0),ie=e=>r($,{get title(){return e.multiple==!0?"Platforms":"Platform"},get selectedValues(){return D(e.value)},get multiple(){return e.multiple},get helpText(){return e.helpText},get placeholder(){return e.placeholder},get onChange(){return e.onChange},get validation(){return e.validation},get showValidationMessages(){return e.showValidationMessages},get options(){return le(v).map(n=>({title:b(C(n)),value:n,image:`${U.platformFolder}/${n}.svg`}))}}),me=e=>{const[n,t]=B(e.validation),[l,s]=I(""),[d,u]=I(D(e.value));y(()=>{e.showValidationMessages===!0&&t(e.value)},[e.showValidationMessages]),y(()=>{(e.value==null||e.value.length===0)&&u([])},[e.value]);const S=a=>{a.keyCode==ne.enter&&c()},c=()=>{const a=l();t([a]).isValid!==!1&&(d().includes(a)||(u(i=>{const m=[...i,a];return e.onChange(m),m}),s("")))},T=a=>()=>{u(g=>{const i=g.filter(m=>m!=a);return e.onChange(i),i})};return r(ae,{get invalid(){return!n().isValid},get children(){return[r(q,{name:"FormTagInput"}),r(G,{textAlign:"center",get for(){return e.id},get children(){return r(N,{get label(){return e.label},get helpText(){return e.helpText}})}}),r(H,{mb:"$3",get children(){return[r(K,{get id(){return e.id},class:"noselect",get placeholder(){return e.placeholder},get value(){return l()},get onInput(){return j(a=>{s(a)})},onKeyPress:S}),r(J,{px:0,get children(){return r(Q,{variant:"outline",onClick:c,children:"+"})}})]}}),r(W,{get each(){return d()},children:a=>r(X,{mr:"$1",get children(){return[r(Z,{ml:"$1",children:a}),r(ee,{get onClick(){return T(a)}})]}})}),r(te,{get when(){return!n().isValid},get children(){return r(re,{get children(){return n().errorMessage}})}})]}})},ue=e=>({title:e.name,value:e.id,image:oe().getNmsUdFormDataUrl()+e.profilePicUrl}),De=()=>{const e=[{startedPlaying:t=>t??Y(h)}],n=O("community",ue);return r(z,{id:"BuilderDto",segment:"builder",title:"Submit a builder profile",getName:t=>t.name,formDtoMeta:x,propertyOverrides:e,get mappings(){return{profilePicFile:{component:L,gridItemColumnSize:o.smol,gridItemRowSize:o.smol},name:{component:f,gridItemColumnSize:o.medium,placeholder:_(A)},platforms:{component:ie,gridItemColumnSize:o.medium,placeholder:"Select your platforms",additional:{multiple:t=>!0}},startedPlaying:{component:f,gridItemColumnSize:o.smol,placeholder:"date",additional:{inputType:t=>"date",min:t=>p(V,"YYYY-MM-DD"),max:t=>p(h,"YYYY-MM-DD")}},buildTechniquesUsed:{component:E,gridItemColumnSize:o.medium,placeholder:"Select your techniques",additional:{options:t=>w.BuildingTechniques.map(l=>({title:l,value:l})),multiple:t=>!0}},communityAffiliations:{component:R,gridItemColumnSize:o.long,placeholder:"Select your communities",additional:{multiple:t=>!0,optionsPromise:()=>n}},labels:{component:me,gridItemColumnSize:o.long,placeholder:"Select your labels"},socials:{component:k,gridItemColumnSize:o.long,placeholder:"youtube.com/watch?v=..."},bio:{component:F,gridItemColumnSize:o.full,placeholder:"Hi, I like to build lots of...",additional:{displayTextLength:t=>!0,maxTextLength:t=>P}},contactDetails:{component:F,gridItemColumnSize:o.full,placeholder:"Email, Discord, etc",additional:{displayTextLength:t=>!0,maxTextLength:t=>M}}}}})};export{De as BuilderFormPage,De as default};
