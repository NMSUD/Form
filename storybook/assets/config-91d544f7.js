import{a as y,b as i,m as g,r as w,d as S,o as b,E as h}from"./store-583bd420.js";import{e as E,a as M}from"./index-5c653d15.js";import"./_commonjsHelpers-725317a4.js";var[t,n]=y({}),D=async(r=20)=>{await new Promise(o=>setTimeout(o,r))},d,l,c,I=(r,o)=>{let e=!1;return c!==o.viewMode&&(e=!0),r&&(e=!0),Object.is(d,o.globals)||(e=!0),l!==o.componentId&&(e=!0,R()),e===!0&&(c=o.viewMode,d=o.globals,l=o.componentId),e},A=(r,o)=>{let e=o.canvasElement.id;return o.args=t[e].args,r(o.args,o)},H=(r,o)=>{const{id:e,component:s}=o;if(!s)throw new Error(`Unable to render story ${e} as the component annotation is missing from the default export`);return i(s,g(()=>o.args))},F=()=>{Object.keys(t).forEach(r=>{t[r]?.disposeFn?.()})},C=()=>{n(S({}))},R=()=>{F(),C()},T=r=>{n({[r]:{args:{},rendered:!1,disposeFn:()=>{}}})},j=r=>{t[r]?.disposeFn?.()},k=r=>{j(r),T(r)},B=r=>!!t[r]?.rendered,O=r=>r.viewMode==="docs",P=(r,o,e)=>{const{storyContext:s,unboundStoryFn:a,showMain:v,showException:p}=o;n(r,"rendered",!0);const m=()=>{const f=a;return b(()=>{v()}),i(h,{fallback:u=>(p(u),u),get children(){return i(f,s)}})};return w(()=>i(m,{}),e)};async function J(r,o){const{storyContext:e}=r;let s=r.forceRemount,a=e.canvasElement.id;if(c===void 0&&(c=e.viewMode),d===void 0&&(d=e.globals),l===void 0&&(l=e.componentId),I(s,e)&&k(a),n(a,"args",e.args),B(a)===!1){O(e)&&await D();const v=P(a,r,o);n(a,p=>({...p,disposeFn:v}))}}var _=(r,o)=>r(),$=[_],U={docs:{story:{inline:!0},extractComponentDescription:M}},K=[E],L=[A,...$],N=(r,o)=>o.reduce((e,s)=>a=>s(()=>e(a),a),e=>r(e)),Q={renderer:"solid",...U};export{N as applyDecorators,K as argTypesEnhancers,L as decorators,Q as parameters,H as render,J as renderToCanvas};
