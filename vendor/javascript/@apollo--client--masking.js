// @apollo/client/masking@4.0.4 downloaded from https://ga.jspm.io/npm:@apollo/client@4.0.4/masking/index.js

import{Kind as e}from"graphql";import{Slot as n}from"optimism";import{__DEV__ as t}from"@apollo/client/utilities/environment";import{invariant as a}from"@apollo/client/utilities/invariant";import{equal as r}from"@wry/equality";import{maybeDeepFreeze as i,resultKeyNameFromField as o,createFragmentMap as l,getFragmentDefinitions as u,getOperationDefinition as s}from"@apollo/client/utilities/internal";
/**
* @internal
* 
* @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
*/
const c=new n;function m(n){const r=n.directives?.find((({name:e})=>e.value==="unmask"));if(!r)return"mask";const i=r.arguments?.find((({name:e})=>e.value==="mode"));t&&i&&(i.value.kind===e.VARIABLE?t&&a.warn(44):i.value.kind!==e.STRING?t&&a.warn(45):i.value.value!=="migrate"&&t&&a.warn(46,i.value.value));return i&&"value"in i.value&&i.value.value==="migrate"?"migrate":"unmask"}function f(e,n,t){return c.withValue(true,(()=>{const a=d(e,n,t,false);Object.isFrozen(e)&&i(a);return a}))}function p(e,n){if(n.has(e))return n.get(e);const t=Array.isArray(e)?[]:{};n.set(e,t);return t}function d(n,r,i,l,u){const{knownChanged:s}=i;const c=p(n,i.mutableTargets);if(Array.isArray(n)){for(const[e,a]of Array.from(n.entries())){if(a===null){c[e]=null;continue}const n=d(a,r,i,l,t?`${u||""}[${e}]`:void 0);s.has(n)&&s.add(c);c[e]=n}return s.has(c)?c:n}for(const f of r.selections){let r;l&&s.add(c);if(f.kind===e.FIELD){const e=o(f);const a=f.selectionSet;r=c[e]||n[e];if(r===void 0)continue;if(a&&r!==null){const o=d(n[e],a,i,l,t?`${u||""}.${e}`:void 0);s.has(o)&&(r=o)}t||(c[e]=r);if(t)if(l&&e!=="__typename"&&!Object.getOwnPropertyDescriptor(c,e)?.value)Object.defineProperty(c,e,g(e,r,u||"",i.operationName,i.operationType));else{delete c[e];c[e]=r}}f.kind!==e.INLINE_FRAGMENT||f.typeCondition&&!i.cache.fragmentMatches(f,n.__typename)||(r=d(n,f.selectionSet,i,l,u));if(f.kind===e.FRAGMENT_SPREAD){const e=f.name.value;const t=i.fragmentMap[e]||(i.fragmentMap[e]=i.cache.lookupFragment(e));a(t,39,e);const o=m(f);o!=="mask"&&(r=d(n,t.selectionSet,i,o==="migrate",u))}s.has(r)&&s.add(c)}"__typename"in n&&!("__typename"in c)&&(c.__typename=n.__typename);Object.keys(c).length!==Object.keys(n).length&&s.add(c);return s.has(c)?c:n}function g(e,n,r,i,o){let l=()=>{if(c.getValue())return n;t&&a.warn(40,i?`${o} '${i}'`:`anonymous ${o}`,`${r}.${e}`.replace(/^\./,""));l=()=>n;return n};return{get(){return l()},set(e){l=()=>e},enumerable:true,configurable:true}}
/**
* @internal
* 
* @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
*/function v(n,t,i,o){const s=t.definitions.filter((n=>n.kind===e.FRAGMENT_DEFINITION));if(typeof o==="undefined"){a(s.length===1,41,s.length);o=s[0].name.value}const c=s.find((e=>e.name.value===o));a(!!c,42,o);return n==null||r(n,{})?n:f(n,c.selectionSet,{operationType:"fragment",operationName:c.name.value,fragmentMap:l(u(t)),cache:i,mutableTargets:new WeakMap,knownChanged:new WeakSet})}
/**
* @internal
* 
* @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
*/function y(e,n,t){const r=s(n);a(r,43);return e==null?e:f(e,r.selectionSet,{operationType:r.operation,operationName:r.name?.value,fragmentMap:l(u(n)),cache:t,mutableTargets:new WeakMap,knownChanged:new WeakSet})}export{c as disableWarningsSlot,v as maskFragment,y as maskOperation};

