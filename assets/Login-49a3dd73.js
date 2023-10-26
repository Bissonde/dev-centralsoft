import{b as c,o as u,d as h,a as n,w as r,e as o,f,u as g,g as d,n as b,h as w,r as l,c as k}from"./index-2b185497.js";import{u as v}from"./TokenStore-5884ca5f.js";import{V,a as _,b as i,c as y}from"./VTextField-191f6640.js";import{V as S}from"./VBtn-28b8deda.js";import{u as q}from"./counter-0f309f2b.js";import{V as T}from"./VApp-0d3edeea.js";import"./resizeObserver-e7b06fc4.js";import"./tag-3644fb0b.js";const j={class:"d-flex align-center justify-center pt-5"},C=o("br",null,null,-1),I=o("br",null,null,-1),N=o("div",{class:"d-flex align-center justify-center"},[o("br"),o("br"),o("h2",null,"Iniciar Sessão")],-1),B=o("br",null,null,-1),M=o("br",null,null,-1),$=o("a",{href:"#",class:"text-body-2 font-weight-regular"},"Esqueceu a sua palavra-passe?",-1),z=o("div",{class:"mt-2"},[o("p",{class:"text-body-2"},[d("Não tem uma conta? "),o("a",{href:"#"},"Subscreva")])],-1),E=v(),m=["ljahsdfq697e69qwerq","Vasco Gungui","Administrator"],A={data:()=>({username:"",password:"",show1:!1,show2:!0,password:"",rules:{required:a=>!!a||"Campo obrigatório.",min:a=>a.length>=8||"Min 8 carácteres",emailMatch:()=>"The email and password you entered don't match"}}),methods:{checkInput:function(){window.localStorage.setItem("token",JSON.stringify(m)),this.$router.push({path:"/dashboard"})},login:function(){}},computed:{}},F=Object.assign(A,{__name:"Login",setup(a){return c(()=>{window.localStorage.getItem("token")!=null}),(e,t)=>(u(),h("div",{class:"d-flex align-center justify-center",style:b([{height:"100vh","background-color":"white","background-image":"url(https://picsum.photos/1920/1080?random)","background-repeat":"no-repeat","background-size":"cover"},e.bottom-e.gradient])},[n(y,{width:"600",class:"ma-3 pa-3 mr-4 rounded-lg",style:{opacity:"0.9",background:"white"},"max-width":"456",elevation:"12",height:"450"},{default:r(()=>[o("div",j,[n(V,{src:"https://vuejs.org/images/logo.png",height:"40",width:"40"}),C,I]),N,B,n(_,{"fast-fail":"",onSubmit:f(e.login,["prevent"])},{default:r(()=>[n(i,{class:"text-button",rules:[e.rules.required,e.rules.min],variant:"outlined","prepend-inner-icon":"mdi-account",modelValue:e.username,"onUpdate:modelValue":t[0]||(t[0]=s=>e.username=s),label:"Nome de utilizador"},null,8,["rules","modelValue"]),M,n(i,{class:"text-button",variant:"outlined","prepend-inner-icon":"mdi-lock","append-icon":e.show1?"mdi-eye":"mdi-eye-off",rules:[e.rules.required,e.rules.min],type:e.show1?"text":"password",name:"input-10-1",hint:"Pelo menos 8 caracteres",counter:"","onClick:append":t[1]||(t[1]=s=>e.show1=!e.show1),modelValue:e.password,"onUpdate:modelValue":t[2]||(t[2]=s=>e.password=s),label:"Palavra-passe"},null,8,["append-icon","rules","type","modelValue"]),$,n(S,{type:"submit",color:"primary",block:"",class:"mt-2",onClick:[t[3]||(t[3]=s=>{g(E).setToken(m,!0)}),t[4]||(t[4]=s=>{e.checkInput()})],ripple:!0,disabled:e.loading,loading:e.loading,"prepend-icon":"mdi-login"},{default:r(()=>[d("Entrar")]),_:1},8,["disabled","loading"])]),_:1},8,["onSubmit"]),z]),_:1})],4))}}),K={__name:"Login",setup(a){return w(),q(),(e,t)=>{const s=l("default-bar"),p=l("default-view");return u(),k(T,null,{default:r(()=>[n(s),n(F),n(p)]),_:1})}}};export{K as default};