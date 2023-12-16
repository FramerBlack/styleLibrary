var $auth=function(c){var J,N;"use strict";var ce=Object.defineProperty;var le=(c,f,h)=>f in c?ce(c,f,{enumerable:!0,configurable:!0,writable:!0,value:h}):c[f]=h;var o=(c,f,h)=>(le(c,typeof f!="symbol"?f+"":f,h),h);class f{constructor(s){o(this,"prefix");this.prefix=s}has(s){const e=this.prefix+s;return localStorage.getItem(e)!=null}get(s){const e=this.prefix+s;return localStorage.getItem(e)}set(s,e){const r=this.prefix+s;localStorage.setItem(r,e)}remove(s){const e=this.prefix+s;localStorage.removeItem(e)}}class h extends Error{constructor(e,r){super(e);o(this,"status");o(this,"__isAuthError",!0);this.name="AuthError",this.status=r}}function m(t){return typeof t=="object"&&t!==null&&"__isAuthError"in t}class j extends h{constructor(e,r){super(e,r);o(this,"status");this.name="AuthApiError",this.status=r}toJSON(){return{name:this.name,message:this.message,status:this.status}}}class $ extends h{constructor(e,r){super(e);o(this,"originalError");this.name="AuthUnknownError",this.originalError=r}}class g extends h{constructor(e,r,n){super(e);o(this,"name");o(this,"status");this.name=r,this.status=n}toJSON(){return{name:this.name,message:this.message,status:this.status}}}class R extends g{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500)}}class k extends g{constructor(){super("Message missing","AuthInvalidResetPasswordResponseError",500)}}class d extends g{constructor(s){super(s,"AuthInvalidCredentialsError",400)}}class C extends g{constructor(){super("Site missing","AuthInvalidSiteResponseError",500)}}class L extends g{constructor(){super("User missing","AuthInvalidUserResponseError",500)}}class F extends g{constructor(){super("License key status missing","AuthInvalidValidateLicenseKeyResponseError",500)}}class K extends g{constructor(){super("Data invalid","AuthUpdateUserDataResponseError",500)}}class p extends g{constructor(s,e){super(s,"AuthRetryableFetchError",e)}}const v=t=>t.msg||t.message||t.error_description||t.error||JSON.stringify(t),q=[502,503,504];async function U(t){if(!Q(t))throw new p(v(t),0);if(q.includes(t.status))throw new p(v(t),t.status);let s;try{s=await t.json()}catch(e){throw new $(v(e),e)}throw new j(v(s),t.status||500)}const Y=(t,s,e,r)=>{const n={method:t,headers:(s==null?void 0:s.headers)||{}};return t==="GET"?n:(n.headers={"Content-Type":"application/json;charset=UTF-8",...s==null?void 0:s.headers},n.body=JSON.stringify(r),{...n,...e})};async function y(t,s,e,r){var l;const n={...r==null?void 0:r.headers};r!=null&&r.jwt&&(n.Authorization=`Bearer ${r.jwt}`);const a=(l=r==null?void 0:r.query)!=null?l:{};r!=null&&r.redirectTo&&(a.redirect_to=r.redirectTo);const i=Object.keys(a).length?"?"+new URLSearchParams(a).toString():"",u=await z(t,s,e+i,{headers:n,noResolveJson:r==null?void 0:r.noResolveJson},{},r==null?void 0:r.body);return r!=null&&r.xform?r==null?void 0:r.xform(u):{data:{...u},error:null}}async function z(t,s,e,r,n,a){const i=Y(s,r,n,a);let u;try{u=await t(e,i)}catch(l){throw console.error(l),new p(v(l),0)}if(u.ok||await U(u),r!=null&&r.noResolveJson)return u;try{return await u.json()}catch(l){await U(l)}}function _(t){var r;let s=null;B(t==null?void 0:t.session)&&(s={...t.session});const e=(r=t.user)!=null?r:t;return{data:{session:s,user:e},error:null}}function D(t){var e;return{data:{message:(e=t.message)!=null?e:t},error:null}}function M(t){var e;return{data:{message:(e=t.message)!=null?e:t},error:null}}function G(t){var e;return{data:{site:(e=t.site)!=null?e:t},error:null}}function V(t){var e;return{data:{user:(e=t.user)!=null?e:t},error:null}}function W(t){var e;return{data:{valid:(e=t.valid)!=null?e:t},error:null}}function H(t){return{data:t!=null?t:t,error:null}}function B(t){return(t==null?void 0:t.access_token)&&(t==null?void 0:t.expires_in)}const Q=t=>typeof t=="object"&&t!==null&&"status"in t&&"ok"in t&&"json"in t&&typeof t.json=="function";class X{constructor(s){o(this,"store");o(this,"url");o(this,"headers");o(this,"setSite",s=>{this.store.set("site",s)});o(this,"setUser",s=>{this.store.set("user",s)});o(this,"setSession",s=>{this.store.set("session",s)});o(this,"getAccessToken",()=>{if(!this.store.has("session"))return null;const e=this.store.get("session");if(!e)return null;let r;try{r=JSON.parse(e)}catch(a){return null}const n=Math.floor(Date.now()/1e3);return r.expires_at&&n>r.expires_at?(this.store.remove("session"),this.store.remove("user"),null):r.access_token});o(this,"getExpiresIn",()=>{var e;if(this.store.has("session")){const r=this.store.get("session");if(r)return(e=JSON.parse(r))==null?void 0:e.expires_in}});o(this,"getSite",async(s={cache:!0})=>{var n,a;let e;const r=this.store.get("site");return r&&(s!=null&&s.cache)?e={data:{site:JSON.parse(r)},error:null}:e=await this.fetchSite(),e.error&&(e.error.status===400?console.log(`%cFramerAuth: Site not configured!

%cPlease add your SITE_ID to the configuration script.
%cError: ${((n=e.error)==null?void 0:n.message)||"Unknown error"}`,"color: orange; font-size: 16px;","color: inherit; font-size: 12px;","color: inherit; font-size: 12px;"):console.log(`%cFramerAuth: Unable to load site data!

%cNavigating to Homepage.
%cError: ${((a=e.error)==null?void 0:a.message)||"Site data not found"}`,"color: red; font-size: 16px;","color: inherit; font-size: 12px;","color: inherit; font-size: 12px;")),e});o(this,"getUser",async(s={cache:!0})=>{let e;const r=Math.floor(Date.now()/1e3),n=this.store.get("session")||"";if(!n)e={data:{user:null},error:new h("Authorization token required.",401)};else{const a=JSON.parse(n),i=this.store.get("user");a.expires_at&&r>a.expires_at?(e={data:{user:null},error:new h("Token has expired.",401)},this.store.remove("session"),this.store.remove("user")):i&&(s!=null&&s.cache)?e={data:{user:JSON.parse(i)},error:null}:e=await this.fetchUser()}return e});o(this,"validateLicenseKey",async s=>{try{let e;if(!s.license_key)throw new d("You must provide a license_key");const{license_key:r}=s;e=await y(fetch,"POST",`${this.url}/validate`,{headers:this.headers,body:{license_key:r},xform:W});const{data:n,error:a}=e;return a?{data:{valid:null},error:a}:!n||n.valid===null?{data:{valid:null},error:new F}:{data:{valid:n.valid},error:null}}catch(e){if(m(e))return{data:{valid:null},error:e};throw e}});o(this,"signUp",async s=>{var e;try{let r;if(!s.email)throw new d("You must provide an email");if(!s.password)throw new d("You must provide a password");const{email:n,password:a,options:i}=s;r=await y(fetch,"POST",`${this.url}/sign-up`,{headers:this.headers,redirectTo:i==null?void 0:i.emailRedirectTo,body:{email:n,password:a,data:(e=i==null?void 0:i.data)!=null?e:{}},xform:_});const{data:u,error:l}=r;if(l)return{data:{user:null,session:null},error:l};if(!u)return{data:{user:null,session:null},error:new R};const w=u.session,S=u.user;return w&&(this.setUser(JSON.stringify(S)),this.setSession(JSON.stringify(w))),{data:{user:S,session:w},error:null}}catch(r){if(m(r))return{data:{user:null,session:null},error:r};throw r}});o(this,"signInWithPassword",async s=>{try{if(!s.email)throw new d("You must provide an email");if(!s.password)throw new d("You must provide a password");let e;const{email:r,password:n}=s;e=await y(fetch,"POST",`${this.url}/token`,{headers:this.headers,body:{email:r,password:n},xform:_});const{data:a,error:i}=e;return i?{data:{user:null,session:null},error:i}:!a||!a.session||!a.user?{data:{user:null,session:null},error:new R}:(a.session&&(this.setUser(JSON.stringify(a.user)),this.setSession(JSON.stringify(a.session))),{data:{user:a.user,session:a.session},error:i})}catch(e){if(m(e))return{data:{user:null,session:null},error:e};throw e}});o(this,"resetPasswordForEmail",async s=>{try{if(!s.email)throw new d("You must provide an email");let e;const{email:r}=s;e=await y(fetch,"POST",`${this.url}/password/reset`,{headers:this.headers,body:{email:r},xform:D});const{data:n,error:a}=e;return a?{data:{message:null},error:a}:!n||!n.message?{data:{message:null},error:new k}:{data:{message:n.message},error:a}}catch(e){if(m(e))return{data:{message:null},error:e};throw e}});o(this,"updatePasswordForEmail",async s=>{try{if(!s.email)throw new d("You must provide an email");if(!s.code)throw new d("Reset token required");if(!s.email)throw new d("You must provide a new password");let e;const{email:r,code:n,password:a}=s;e=await y(fetch,"POST",`${this.url}/password/update`,{headers:this.headers,body:{email:r,code:n,password:a},xform:M});const{data:i,error:u}=e;return u?{data:{message:null},error:u}:!i||!i.message?{data:{message:null},error:new k}:{data:{message:i.message},error:u}}catch(e){if(m(e))return{data:{message:null},error:e};throw e}});o(this,"signOut",async(s=null)=>(this.store.remove("session"),this.store.remove("user"),s&&window.location.replace(s),{error:null}));o(this,"fetchSite",async()=>{try{let s;s=await y(fetch,"GET",`${this.url}/site`,{headers:this.headers,xform:G});const{data:e,error:r}=s;return r?{data:{site:null},error:r}:!e||!e.site?{data:{site:null},error:new C}:(e.site&&this.setSite(JSON.stringify(e.site)),{data:{site:e.site},error:null})}catch(s){if(m(s))return{data:{site:null},error:s};throw s}});o(this,"fetchUser",async()=>{try{let s;const e=this.getAccessToken();if(!e)throw new d("You must provide a token");s=await y(fetch,"GET",`${this.url}/me`,{headers:this.headers,xform:V,jwt:e});const{data:r,error:n}=s;return n?{data:{user:null},error:n}:!r||!r.user?{data:{user:null},error:new L}:(r.user&&this.setUser(JSON.stringify(r.user)),{data:{user:r.user},error:null})}catch(s){if(m(s))return{data:{user:null},error:s};throw s}});o(this,"patchUserData",async s=>{try{const e=this.getAccessToken();if(!e)throw new d("You must provide a token");let r;r=await y(fetch,"PATCH",`${this.url}/me/data`,{headers:this.headers,body:s||{},xform:H,jwt:e});const{data:n,error:a}=r;if(a)return{data:null,error:a};if(!n||n.valid===null)return{data:null,error:new K};const{data:{user:i}}=await this.getUser({cache:!0});return i&&(i.data=n,this.setUser(JSON.stringify(i))),{data:n,error:null}}catch(e){if(m(e))return{data:null,error:e};throw e}});if(this.store=new f("fa-"),this.url="https://api.framerauth.com/v1",s)this.headers={"Content-Type":"application/json","x-site-id":s};else{this.headers={},console.error("Unable to initialize the Auth module, ensure you have added the framer-auth.js file to the beginning of the body.");return}}}const O="/",T=()=>{document.body.style.visibility="hidden"},I=()=>{document.body.style.visibility="visible"},Z=async(t,s,e)=>{for(const r of s)if(r.type==="attributes"&&r.attributeName==="class"&&r.oldValue){T();const n=window.location.pathname;if(await P(t,n,!0)){I();break}}};async function ee(t){const{pathname:s}=new URL(window.location.href);if(s===O){t.getSite({cache:!1}).catch(n=>console.error(n));return}if(document.querySelector('meta[name="framer-auth"][content="exclude"]'))return;T(),await P(t,s,!1)&&I()}async function P(t,s,e=!1){if(s===O)return!0;const{data:r,error:n}=await t.getSite({cache:e});if(n&&n.status===400)return!0;if(n||!r.site)return window.location.replace("/"),!1;const a=r.site.links.access_denied;if(a===window.location.pathname)return!0;const i=r.site.pages.find(w=>w.path===s);if(!i)return!0;const u=i.path.split("/").slice(0,-1).join("/"),l=r.site.pages.find(w=>w.path===u);if(i.locked){const{data:w,error:S}=await t.getUser({cache:!1});if(S||!w.user)return window.location.replace(a),!1;const b=Array.isArray(i.groups)&&i.groups.length?i.groups:l==null?void 0:l.groups;if(Array.isArray(b)&&b.length&&!w.user.licenses.some(ue=>b.includes(ue.variant_id)))return window.location.replace(a),!1}return!0}console.log("Framer Auth - Library v0.0.0");const A=((J=document==null?void 0:document.currentScript)==null?void 0:J.getAttribute("site-id"))||null;if(A)new f("fa-").set("site-id",A);else throw new Error("Unable to locate site id");const E=document.createElement("style");E.title="Framer Auth - Styles",document.head.appendChild(E),(N=E.sheet)==null||N.insertRule(".fa-cloak {opacity: 0 !important;}");const x=new X(A);ee(x).then(()=>{new MutationObserver((s,e)=>Z(x,s)).observe(document.body,{childList:!1,subtree:!1,attributes:!0,attributeFilter:["class"],attributeOldValue:!0})});const{getUser:se,getAccessToken:re,getExpiresIn:te,validateLicenseKey:ne,signUp:ae,signInWithPassword:ie,signOut:oe}=x;return c.getAccessToken=re,c.getExpiresIn=te,c.getUser=se,c.signInWithPassword=ie,c.signOut=oe,c.signUp=ae,c.validateLicenseKey=ne,Object.defineProperty(c,Symbol.toStringTag,{value:"Module"}),c}({});
