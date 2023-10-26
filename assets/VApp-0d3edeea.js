import{a as te,m as oe,u as ae}from"./resizeObserver-e7b06fc4.js";import{s as O,G as k,t as r,B as ne,C as $,a6 as Z,I as _,b as se,x as D,R as z,aI as ue,W as le,aQ as ie,aR as re,A as ce,K as ve,k as pe,M as de,P as ye,a as j}from"./index-2b185497.js";const A=Symbol.for("vuetify:layout"),W=Symbol.for("vuetify:layout-item"),U=1e3,fe=O({overlaps:{type:Array,default:()=>[]},fullHeight:Boolean},"layout"),Se=O({name:{type:String},order:{type:[Number,String],default:0},absolute:Boolean},"layout-item");function we(){const o=k(A);if(!o)throw new Error("[Vuetify] Could not find injected layout");return{getLayoutItem:o.getLayoutItem,mainRect:o.mainRect,mainStyles:o.mainStyles}}function Re(o){const s=k(A);if(!s)throw new Error("[Vuetify] Could not find injected layout");const u=o.id??`layout-item-${le()}`,l=Z("useLayoutItem");D(W,{id:u});const a=_(!1);ie(()=>a.value=!0),re(()=>a.value=!1);const{layoutItemStyles:c,layoutItemScrimStyles:v}=s.register(l,{...o,active:r(()=>a.value?!1:o.active.value),id:u});return ce(()=>s.unregister(u)),{layoutItemStyles:c,layoutRect:s.layoutRect,layoutItemScrimStyles:v}}const me=(o,s,u,l)=>{let a={top:0,left:0,right:0,bottom:0};const c=[{id:"",layer:{...a}}];for(const v of o){const y=s.get(v),m=u.get(v),g=l.get(v);if(!y||!m||!g)continue;const I={...a,[y.value]:parseInt(a[y.value],10)+(g.value?parseInt(m.value,10):0)};c.push({id:v,layer:I}),a=I}return c};function ge(o){const s=k(A,null),u=r(()=>s?s.rootZIndex.value-100:U),l=ne([]),a=$(new Map),c=$(new Map),v=$(new Map),y=$(new Map),m=$(new Map),{resizeRef:g,contentRect:I}=te(),X=r(()=>{const t=new Map,p=o.overlaps??[];for(const e of p.filter(i=>i.includes(":"))){const[i,n]=e.split(":");if(!l.value.includes(i)||!l.value.includes(n))continue;const f=a.get(i),h=a.get(n),w=c.get(i),R=c.get(n);!f||!h||!w||!R||(t.set(n,{position:f.value,amount:parseInt(w.value,10)}),t.set(i,{position:h.value,amount:-parseInt(R.value,10)}))}return t}),b=r(()=>{const t=[...new Set([...v.values()].map(e=>e.value))].sort((e,i)=>e-i),p=[];for(const e of t){const i=l.value.filter(n=>{var f;return((f=v.get(n))==null?void 0:f.value)===e});p.push(...i)}return me(p,a,c,y)}),T=r(()=>!Array.from(m.values()).some(t=>t.value)),x=r(()=>b.value[b.value.length-1].layer),q=r(()=>({"--v-layout-left":z(x.value.left),"--v-layout-right":z(x.value.right),"--v-layout-top":z(x.value.top),"--v-layout-bottom":z(x.value.bottom),...T.value?void 0:{transition:"none"}})),S=r(()=>b.value.slice(1).map((t,p)=>{let{id:e}=t;const{layer:i}=b.value[p],n=c.get(e),f=a.get(e);return{id:e,...i,size:Number(n.value),position:f.value}})),E=t=>S.value.find(p=>p.id===t),C=Z("createLayout"),H=_(!1);se(()=>{H.value=!0}),D(A,{register:(t,p)=>{let{id:e,order:i,position:n,layoutSize:f,elementSize:h,active:w,disableTransitions:R,absolute:Q}=p;v.set(e,i),a.set(e,n),c.set(e,f),y.set(e,w),R&&m.set(e,R);const B=ue(W,C==null?void 0:C.vnode).indexOf(t);B>-1?l.value.splice(B,0,e):l.value.push(e);const K=r(()=>S.value.findIndex(L=>L.id===e)),V=r(()=>u.value+b.value.length*2-K.value*2),Y=r(()=>{const L=n.value==="left"||n.value==="right",P=n.value==="right",ee=n.value==="bottom",N={[n.value]:0,zIndex:V.value,transform:`translate${L?"X":"Y"}(${(w.value?0:-110)*(P||ee?-1:1)}%)`,position:Q.value||u.value!==U?"absolute":"fixed",...T.value?void 0:{transition:"none"}};if(!H.value)return N;const d=S.value[K.value];if(!d)throw new Error(`[Vuetify] Could not find layout item "${e}"`);const M=X.value.get(e);return M&&(d[M.position]+=M.amount),{...N,height:L?`calc(100% - ${d.top}px - ${d.bottom}px)`:h.value?`${h.value}px`:void 0,left:P?void 0:`${d.left}px`,right:P?`${d.right}px`:void 0,top:n.value!=="bottom"?`${d.top}px`:void 0,bottom:n.value!=="top"?`${d.bottom}px`:void 0,width:L?h.value?`${h.value}px`:void 0:`calc(100% - ${d.left}px - ${d.right}px)`}}),J=r(()=>({zIndex:V.value-1}));return{layoutItemStyles:Y,layoutItemScrimStyles:J,zIndex:V}},unregister:t=>{v.delete(t),a.delete(t),c.delete(t),y.delete(t),m.delete(t),l.value=l.value.filter(p=>p!==t)},mainRect:x,mainStyles:q,getLayoutItem:E,items:S,layoutRect:I,rootZIndex:u});const F=r(()=>["v-layout",{"v-layout--full-height":o.fullHeight}]),G=r(()=>({zIndex:s?u.value:void 0,position:s?"relative":void 0,overflow:s?"hidden":void 0}));return{layoutClasses:F,layoutStyles:G,getLayoutItem:E,items:S,layoutRect:I,layoutRef:g}}const he=O({...oe(),...fe({fullHeight:!0}),...ve()},"VApp"),Le=pe()({name:"VApp",props:he(),setup(o,s){let{slots:u}=s;const l=de(o),{layoutClasses:a,getLayoutItem:c,items:v,layoutRef:y}=ge(o),{rtlClasses:m}=ye();return ae(()=>{var g;return j("div",{ref:y,class:["v-application",l.themeClasses.value,a.value,m.value,o.class],style:[o.style]},[j("div",{class:"v-application__wrap"},[(g=u.default)==null?void 0:g.call(u)])])}),{getLayoutItem:c,items:v,theme:l}}});export{Le as V,we as a,Se as m,Re as u};