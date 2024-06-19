import{c as t,m as _,l as w,s as k,t as I,n as T,p as o,P as K,B as W,q as J,r as Y,u as q,v as Q,w as X,x as Z,y as A,z as g,C as M,E as ee,a as m,A as S,b as f,G as E,M as D,H as $,D as F,L as te,J as re,K as ae,F as U,N as B,O as ne,Q as le,R as ie,j as z,i as H,S as O,U as se,V as L,W as oe,X as ce,Y as ge,I as ue,Z as de,d as he,o as me,_ as ve,$ as fe,f as ye,a0 as be}from"./index-29686bc5.js";import{N as h}from"./networkState-0824194a.js";import{M as V,h as we,A as ke}from"./animation-d12349da.js";import{u as G,H as j}from"./input-4772ea8c.js";import{k as Ie}from"./form-ee898103.js";import{m as C}from"./baseApiService-6c8e2860.js";const Ge=["JustAHarmlessPotato","HeresWonderwall","RejectedBachelorContestant","BlueIvysAssistant","QuaratineInTheseJeans","ArianaGrandesPonytail","BehindYou","IntelligentZombie","ManicPixieMemeGirl","WhatsURSign","HotNameHere","NotFunnyAtAll","BluntMachete","Unbreakabull","KnewTooMuch","BlackStabbath","BloodSail","KissMyAxe","PainSlayer","Eviscerated","GhostFaceGangsta","SeekNDstroy","FightClubAlum","PennywiseTheClown","Xenomorphing","LaidtoRest","BigDamnHero","BadKarma","BarbieBreath","InstaPrincess","PawneeGoddess","LaughUntilUPee","JessisGirl","MyMaceUrFace","LaserChick","PixieDust","AngelWonderland","HealOKitty","DoraTheDestroya","CrazyCatLady","KungFuBarbie","TakenByWine","ActuallyNotChrisHemsworth","JoeNotExotic","DirtBag","Casanova","Balzaq","BigfootIsReal","StickyBoots","JonnyAwesome","UnicornFarts","MelonSmasher","JarjarBlinkz","WhyNotCats","ClawAndOrder","MyNameDoesntFi","Orkward","FlungPuPanda","Moofasa","AllGoodNamesRGone","ThanosLeftHand","UFOBeliever","ShaquilleOatmeal","HeyYouNotYouYou","PewPewYaDead","EdgarAllenPoo","TickleMeElmo"],Se=(e,r)=>Math.floor(Math.random()*(r-e)+e),je=e=>{const r=Se(0,e.length);return e[r]};var xe=o("<svg><circle cx=12 cy=12 r=10 fill=transparent stroke-width=1.5></svg>",!1,!0),pe=o('<svg><path d="M12 17V11"stroke-width=1.5 stroke-linecap=round></svg>',!1,!0),Ae=o('<svg><circle cx=1 cy=1 r=1 transform="matrix(1 0 0 -1 11 9)"></svg>',!1,!0);const Ce=e=>t(T,_({viewBox:"0 0 25 25"},e,{get children(){return[(()=>{var r=xe();return w(()=>k(r,"stroke",e.color?.toString?.()??I.primary)),r})(),(()=>{var r=pe();return w(()=>k(r,"stroke",e.color?.toString?.()??I.primary)),r})(),(()=>{var r=Ae();return w(()=>k(r,"fill",e.color?.toString?.()??I.primary)),r})()]}}));var Fe=o("<small>Image info"),Pe=o("<small>kb"),N=o("<small>px");const Me=e=>t(ee,{get children(){return[t(K,{as:W,variant:"subtle",colorScheme:"neutral",get children(){return[t(Ce,{mx:"auto",color:"white"})," ",Fe()]}}),t(J,{get children(){return[t(Y,{}),t(q,{}),t(Q,{get children(){return t(X,{dense:!0,get children(){return t(Z,{get children(){return[t(A,{get children(){return[t(g,{children:"Extension"}),t(g,{get children(){return e.imageDetails?.type??e.imageDetails?.fileExtension}})]}}),t(A,{get children(){return[t(g,{children:"Size"}),t(g,{get children(){return[M(()=>Math.round((e.imageDetails?.fileSize??0)/1e3))," ",Pe()]}})]}}),t(A,{get children(){return[t(g,{children:"Height"}),t(g,{get children(){return[M(()=>e.imageDetails?.height)," ",N()]}})]}}),t(A,{get children(){return[t(g,{borderBottom:"0",children:"Width"}),t(g,{borderBottom:"0",get children(){return[M(()=>e.imageDetails?.width)," ",N()]}})]}})]}})}})}})]}})]}}),$e=e=>e==="[object Object]"||typeof e=="object"&&!Array.isArray(e)&&e!==null?S.fallbackImg:e,Be=e=>{const[r,n]=m(S.fallbackImg);return f(()=>{n($e(e.imageUrl))},[e.imageUrl]),t(re,{get fallback(){return t(E,{mt:"$3",size:"xl",name:"+",class:"noselect no-drag",draggable:!1,borderRadius:"0.25em",get src(){return r()}})},get children(){return[t(D,{get when(){return e.networkState===h.Loading},get children(){return t($,{py:"2em",get children(){return[t(F,{get name(){return r()}}),t(te,{})]}})}}),t(D,{get when(){return e.networkState===h.Error},get children(){return t(T,{})}})]}})};var Te=o("<input id=file-upload type=file accept=image/*>");const R=(e,r)=>{if(r!=null)return r;const n=e?.file?.toString?.()??e?.url;return n??S.fallbackImg},Ke=e=>{let r;const[n,i]=G(e.validation),[v,y]=m(R(e.value,e.imageValue)),[u,x]=m(),[b,p]=m(),[l,c]=m(h.Success);f(()=>{e.showValidationMessages===!0&&i({type:V.File,url:"",file:new File([],""),imageDetails:u()})},[e.showValidationMessages]),f(async()=>{const a=b();if(a!=null)try{const s=await we(a),P={type:V.File,url:URL.createObjectURL(a),file:a,imageDetails:s};y(P.url),x(s),i(P),e.onChange(P),c(h.Success)}catch{c(h.Error)}finally{p(void 0)}},[b]),f(()=>{e.value==null&&(y(R(e.value,e.imageValue)),x(void 0))},[e.value]);const d=async a=>{let s=null;if(a[0]==null){s="No files were supplied.";return}if(a.length>1){s="Too many files were supplied.";return}if(s!=null){se.show({status:"danger",title:"File upload error!",description:s}),c(h.Error);return}p(a[0])};return t(B,{flexDirection:"column",get children(){return[t(F,{name:"FormProfileImageInput"}),t(ae,{direction:"column",class:"img-profile-hover pointer",onClick:()=>{r?.click?.(),setTimeout(()=>c(h.Loading),ke.backgroundDelay)},get children(){return[t(U,{textAlign:"center",get for(){return e.id},get children(){return t(j,{get label(){return e.label},get helpText(){return e.helpText}})}}),t(B,{h:"100%",get children(){return t(Be,{get imageUrl(){return v()},get networkState(){return l()}})}}),t($,{display:"none",get children(){var a=Te();return ne(a,"change",le(d)),ie(s=>r=s,a),a}}),t($,{my:"$1",textAlign:"center",get children(){return t(z,{get invalid(){return!n().isValid},get children(){return t(H,{textAlign:"center",get children(){return n().errorMessage}})}})}})]}}),t(O,{get when(){return u()!=null},get children(){return t(Me,{get imageDetails(){return u()}})}})]}})};var De=o(`<svg><path d="M165.013,288.946h75.034c6.953,0,12.609,5.656,12.609,12.608v26.424c0,7.065,3.659,9.585,7.082,9.585
		c2.106,0,4.451-0.936,6.78-2.702l90.964-69.014c3.416-2.589,5.297-6.087,5.297-9.844c0-3.762-1.881-7.259-5.297-9.849
		l-90.964-69.014c-2.329-1.766-4.674-2.702-6.78-2.702c-3.424,0-7.082,2.519-7.082,9.584v26.425c0,6.952-5.656,12.608-12.609,12.608
		h-75.034c-8.707,0-15.79,7.085-15.79,15.788v34.313C149.223,281.862,156.305,288.946,165.013,288.946z"></svg>`,!1,!0),Le=o(`<svg><path d="M256,0C114.842,0,0.002,114.84,0.002,256S114.842,512,256,512c141.158,0,255.998-114.84,255.998-256
		S397.158,0,256,0z M256,66.785c104.334,0,189.216,84.879,189.216,189.215S360.334,445.215,256,445.215S66.783,360.336,66.783,256
		S151.667,66.785,256,66.785z"></svg>`,!1,!0);const Ve=e=>t(T,_({viewBox:"0 0 512 512"},e,{get children(){return[(()=>{var r=De();return w(()=>k(r,"fill",I.primary)),r})(),(()=>{var r=Le();return w(()=>k(r,"fill",I.primary)),r})()]}})),Ne=["apple.svg","assistantapps.svg","behance.svg","discord.svg","epic.svg","eisvana.png","facebook.svg","github.svg","instagram.svg","medium.svg","nintendo.svg","nmsassistant.png","patreon.svg","paypal.svg","play.google.svg","playstation.svg","qq.svg","reddit.svg","sony.svg","spotify.svg","steam.svg","tiktok.svg","twitch.svg","twitter.svg","vine.svg","wechat.svg","weibo.svg","whatsapp.svg","x.svg","xbox.svg","youtube.svg"],Re=e=>{const r=n=>{for(const i of Ne){const v=i.replaceAll(".svg","").replaceAll(".png","");if(n.toLocaleLowerCase().includes(v))return`${S.socialFolder}/${i}`}return S.fallbackImg};return t(ge,{get href(){return e.url},get title(){return e.url},ref(n){var i=L.ref;typeof i=="function"?i(n):L.ref=n},additionalClassNames:"hover-reveal-child pos-rel display-inline-block noselect",get onClick(){return e.onChange},get children(){return[t(F,{name:"AvatarFromSocialLink"}),t(E,{get size(){return e.size},backgroundColor:"transparent",get src(){return r(e.url)},p:"$1"}),t(oe,{class:"reveal pos-abs",top:"0",left:"0",right:"0",bottom:"0",display:"inline-block",borderRadius:"100%",textAlign:"center",colorScheme:"danger",get children(){return t(B,{height:"100%",get children(){return t(ce,{size:"xl",children:"❌"})}})}})]}})},We=e=>{const[r,n]=G(e.validation),[i,v]=m(""),[y,u]=m(C(e.value));f(()=>{e.showValidationMessages===!0&&n(e.value)},[e.showValidationMessages]),f(()=>{(e.value==null||e.value.length===0)&&u([])},[e.value]);const x=l=>{l.keyCode===Ie.enter&&b(i())},b=l=>{r().isValid!==!1&&(u(c=>{const d=[...C(c),l];return e.onChange(d.map(a=>`https://${a}`)),d}),v(""))},p=l=>{u(c=>{const d=C(c).filter(a=>a!=l);return e.onChange(d.map(a=>`https://${a}`)),d})};return t(be,{get children(){return[t(F,{name:"FormSocialInput"}),t(z,{get invalid(){return!r().isValid},get children(){return[t(U,{textAlign:"center",get for(){return e.id},get children(){return t(j,{get label(){return e.label},get helpText(){return e.helpText}})}}),t(ue,{get children(){return[t(de,{children:"https://"}),t(he,{get id(){return e.id},class:"noselect",get placeholder(){return e.placeholder},get value(){return i()},get onInput(){return me(l=>{v(l),n([...C(y()),l])})},onKeyPress:x}),t(ve,{get children(){return t(Ve,{fontSize:"1.5em",class:"pointer",onClick:()=>b(i())})}})]}}),t(O,{get when(){return!r().isValid},get children(){return t(H,{get children(){return r().errorMessage}})}})]}}),t(fe,{mt:"$2",flexWrap:"wrap",get children(){return t(ye,{get each(){return y()},children:l=>t(Re,{url:l,onChange:()=>p(l)})})}})]}})};export{Ke as F,We as a,Ge as f,je as r};