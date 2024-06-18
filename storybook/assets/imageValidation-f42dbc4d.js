import{z as u}from"./debugNode-95c00bf2.js";import{a as m}from"./dateHelper-42e3f96b.js";import{m as f,s as c}from"./textValidation-48b0264a.js";import{M as n}from"./mediaUpload-da93fc8d.js";import{g as h}from"./logService-94d63054.js";const U=5,L=12,t=(e,a=[])=>e==null?a:Array.isArray(e)==!0?[...e]:[e],g=async(e,a)=>[`**${e}**: ${a}`],z=e=>async(a,s)=>[`**${a}**: [${e}](${s})`],S=async(e,a)=>[`**${e}**: ${t(a).join(", ")}`],W=async(e,a)=>[`**${e}**: ${t(a).map((s,i)=>`[Image${i+1}](${s})`).join(", ")}`],k=async(e,a)=>[`**${e}**: ${m(a,"DD MMM YY")}`],F=e=>async(a,s)=>{const i=[];for(const r of s){const l=await e.dbCall(r);if(l.isSuccess==!1){i.push("**error**");continue}const d=e.mapValue(l.value);i.push(d)}return[`**${a}**: ${t(i).join(", ")}`]};var o=(e=>(e[e.UI=0]="UI",e[e.Api=1]="Api",e[e.DataGenerator=2]="DataGenerator",e[e.Interactive=3]="Interactive",e))(o||{});const V=e=>({isValid:!0}),H=e=>a=>a!=null?{isValid:!0}:{isValid:!1,errorMessage:e??"Field shouldn't be empty"},$=(...e)=>a=>{for(const s of e){const i=s(a);if(i.isValid===!1)return i}return{isValid:!0}},q=e=>a=>{const s=u()?.toString?.(),i=e[o[s]];return i==null?(h().w(`separateValidation - ${s} validator not found`),{isValid:!0}):i(a)},A=e=>a=>{const s=t(a);for(const i of s){const r=e(i);if(r.isValid===!1)return r}return{isValid:!0}},b=500,G={label:"Contact Details (only visible to NMSUD organisers)",helpText:"This is so that we can get in contact with you if there are any issue with your submissions, etc.",defaultValue:"",discord:{label:"Contact Details",display:g},validator:f(b)},j={label:"anonymousUserGuid",defaultValue:"",validator:V},v=e=>a=>t(a).length>=e?{isValid:!0}:{isValid:!1,errorMessage:`Minimum number of items that need to be selected is ${e}`},C=e=>a=>t(a).length<=e?{isValid:!0}:{isValid:!1,errorMessage:`Too many items selected! Maximum number of items allowed to be selected is ${e}`},M=e=>a=>a==null||a.name==null||a.fileSize==null?{isValid:!1,errorMessage:e??"Upload a valid image."}:{isValid:!0,errorMessage:""},y=e=>a=>{const s=a.name??"unknown name";if(e.maxHeight!=null&&e.maxHeight<a.height)return{isValid:!1,errorMessage:`Image '${s}' is too large, height should be less than or equal to ${e.maxHeight}px.`};if(e.maxWidth!=null&&e.maxWidth<a.width)return{isValid:!1,errorMessage:`Image '${s}' is too large, width should be less than or equal to ${e.maxWidth}px.`};if(e.minHeight!=null&&e.minHeight>a.height)return{isValid:!1,errorMessage:`Image '${s}' is too small, height should be greater than or equal to ${e.minHeight}px.`};if(e.minWidth!=null&&e.minWidth>a.width)return{isValid:!1,errorMessage:`Image '${s}' is too small, width should be greater than or equal to ${e.minWidth}px.`};if(e.maxSizeMb!=null){const i=a.fileSize/1048576;if(e.maxSizeMb<i)return{isValid:!1,errorMessage:`Image '${s}' is too large, image size limit is ${e.maxSizeMb}mb.`}}return{isValid:!0,errorMessage:""}},N=(e,a)=>s=>{if(s==null||s.type==null)return{isValid:!1,errorMessage:a??"Invalid file uploaded"};switch(s.type){case n.File:const i=$(M(a),y(e));return s.file==null||s.imageDetails==null?{isValid:!1,errorMessage:a??"Invalid file uploaded"}:i({...s.file,...s.imageDetails});case n.ImageUrl:case n.VideoUrl:return c(s.url)}};export{q as a,N as b,H as c,g as d,W as e,C as f,t as g,v as h,S as i,G as j,j as k,U as l,$ as m,V as n,k as o,L as p,F as q,z as s,A as v,y as w};
