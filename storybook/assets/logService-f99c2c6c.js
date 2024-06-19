import{j as g,k as c,l as f,m as u}from"./debugNode-a24c225f.js";var l=(r=>(r[r.UI=0]="UI",r[r.Api=1]="Api",r[r.DataGenerator=2]="DataGenerator",r[r.Interactive=3]="Interactive",r))(l||{}),_=Object.defineProperty,m=Object.getOwnPropertyDescriptor,h=(r,t,s,e)=>{for(var o=e>1?void 0:e?m(t,s):t,a=r.length-1,n;a>=0;a--)(n=r[a])&&(o=(e?n(t,s,o):n(o))||o);return e&&o&&_(t,s,o),o};let i=class{_logs=[];_logStyle=r=>{switch(r){case"log":return"color: green; font-size: medium";case"warn":return"color: orange; font-size: medium";case"error":return"color: red; font-size: large"}};isWebAndProd=()=>!(!c().isProd()||f()!==l.UI);_track=r=>(t,...s)=>{const e={type:r,message:t,optionalParams:s.map(a=>JSON.stringify(a,null,2))};this._logs.push(e);const o=this._logStyle(e.type);console.log((e.optionalParams??[]).length>0?`%c${e.message}
additional params:
${(e.optionalParams??[]).join(`
\r`)}`:`%c${e.message}`,o)};i=this.isWebAndProd()?this._track("log"):console.log;w=this.isWebAndProd()?this._track("warn"):console.warn;e=this.isWebAndProd()?this._track("error"):console.error;getLogs=()=>this._logs};i=h([g()],i);const P=()=>u.get(i);export{l as A,P as g};
