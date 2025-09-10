// graphql-ruby-client@1.14.8 downloaded from https://ga.jspm.io/npm:graphql-ruby-client@1.14.8/index.js

import{e,a as r}from"./_/CQrOtm16.js";import t from"./subscriptions/ActionCableLink.js";import*as n from"@apollo/client/core";import*as s from"graphql/language/printer";import*as o from"relay-runtime";import"http";import"https";import"url";import"crypto";import"buffer";import"fs";import"process";import"glob";import"path";import"graphql";var a=n;try{"default"in n&&(a=n.default)}catch(e){}var i={};Object.defineProperty(i,"__esModule",{value:true});const c=a;let u=class PusherLink extends c.ApolloLink{constructor(e){super();this.pusher=e.pusher;e.decompress?this.decompress=e.decompress:this.decompress=function(e){throw new Error("Received compressed_result but PusherLink wasn't configured with `decompress: (result: string) => any`. Add this configuration.")}}request(e,r){const t=new c.Observable((e=>{}));const n=t.subscribe.bind(t);t.subscribe=(t,s,o)=>{typeof t=="function"?n(t,s,o):n(t);const a=l(t,s,o);var i;const c=r(e);c.subscribe({next:r=>{const t=e.getContext().response;i=t.headers.get("X-Subscription-ID");if(i){const e=this.pusher.subscribe(i);r.data&&Object.keys(r.data).length>0&&a.next(r);e.bind("update",(e=>{this._onUpdate(i,a,e)}))}else{a.next(r);a.complete()}},error:a.error});return{closed:false,unsubscribe:()=>{i&&this.pusher.unsubscribe(i)}}};return t}_onUpdate(e,r,t){let n;n=t.compressed_result?this.decompress(t.compressed_result):t.result;n&&r.next(n);if(!t.more){this.pusher.unsubscribe(e);r.complete()}}};function l(e,r,t){return typeof e==="function"?{next:r=>e(r),error:e=>r&&r(e),complete:()=>t&&t()}:{next:r=>e.next&&e.next(r),error:r=>e.error&&e.error(r),complete:()=>e.complete&&e.complete()}}i.default=u;var d=n;try{"default"in n&&(d=n.default)}catch(e){}var b={};Object.defineProperty(b,"__esModule",{value:true});const p=d;let f=class AblyLink extends p.ApolloLink{constructor(e){super();this.ably=e.ably}request(e,r){const t=new p.Observable((e=>{}));const n=t.subscribe.bind(t);t.subscribe=(t,s,o)=>{typeof t=="function"?n(t,s,o):n(t);const a=h(t,s,o);let i=null;let c=null;const u=r(e);const l=u.subscribe({next:r=>{const t=this._getSubscriptionChannel(e);if(t.channel){c=t.channel;i=this._createSubscription(t,a)}else{r&&a.next(r);a.complete()}},error:a.error});return{closed:false,unsubscribe:()=>{if(i&&c){const e=this.ably.auth.clientId;e?i.presence.leave():i.presence.leaveClient("graphql-subscriber");i.unsubscribe();l.unsubscribe()}}}};return t}_getSubscriptionChannel(e){const r=e.getContext().response;const t=r.headers.get("X-Subscription-ID");const n=r.headers.get("X-Subscription-Key");return{channel:t,key:n}}_createSubscription(e,r){const t=e.channel;const n=e.key;const s=n?{cipher:{key:n}}:{};const o=this.ably.channels.get(t,s);const a=this.ably.auth.clientId;a?o.presence.enter():o.presence.enterClient("graphql-subscriber","subscribed");o.subscribe("update",(function(e){var t=e.data;const n=t.result;n&&r.next(n);if(!t.more){a?o.presence.leave():o.presence.leaveClient("graphql-subscriber");o.unsubscribe();r.complete()}}));return o}};function h(e,r,t){return typeof e==="function"?{next:r=>e(r),error:e=>r&&r(e),complete:()=>t&&t()}:{next:r=>e.next&&e.next(r),error:r=>e.error&&e.error(r),complete:()=>e.complete&&e.complete()}}b.default=f;var m={};Object.defineProperty(m,"__esModule",{value:true});class ApolloSubscriptionRegistry{constructor(){this._id=1;this._subscriptions={}}add(e){var r=this._id++;this._subscriptions[r]=e;return r}unsubscribe(e){var r=this._subscriptions[e];if(!r)throw new Error("No subscription found for id: "+e);r.unsubscribe();delete this._subscriptions[e]}}m.default=new ApolloSubscriptionRegistry;var v=s;try{"default"in s&&(v=s.default)}catch(e){}var _={};var y=_&&_.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(_,"__esModule",{value:true});const g=y(v);const w=y(m);class ActionCableSubscriber{constructor(e,r,t){this._cable=e;this._networkInterface=r;this._channelName=t||"GraphqlChannel"}
/**
   * Send `request` over ActionCable (`registry._cable`),
   * calling `handler` with any incoming data.
   * Return the subscription so that the registry can unsubscribe it later.
   * @param {Object} registry
   * @param {Object} request
   * @param {Function} handler
   * @return {ID} An ID for unsubscribing
  */subscribe(e,r){var t=this._networkInterface;var n=Math.round(Date.now()+Math.random()*1e5).toString(16);var s=this._cable.subscriptions.create({channel:this._channelName,channelId:n},{connected:function(){var r=Object.assign({},t._opts);t.applyMiddlewares({request:e,options:r}).then((function(){var r=e.query?g.default.print(e.query):null;var t=e.operationName;var n=e.operationId;var o=JSON.stringify(e.variables);var a=Object.assign({},e,{query:r,variables:o,operationId:n,operationName:t});s.perform("execute",a)}))},received:function(e){var t=e.result;t&&r(t.errors,t.data);e.more||w.default.unsubscribe(o)}});var o=w.default.add(s);return o}unsubscribe(e){w.default.unsubscribe(e)}}_.default=ActionCableSubscriber;var S={};var x=S&&S.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(S,"__esModule",{value:true});const A=x(m);
/**
 * Make a new subscriber for `addGraphQLSubscriptions`
 *
 * @param {Pusher} pusher
*/class PusherSubscriber{constructor(e,r,t){this._pusher=e;this._networkInterface=r;this._decompress=t||function(e){throw new Error("Received compressed_result but this addGraphQLSubscriptions wasn't configured with `decompress: (result: string) => any`. Add this configuration.")};r.use([{applyMiddleware:function({request:e,options:r},t){r.request=e;t()}}]);r.useAfter([{applyAfterware:function({response:e,options:r},t){r.request.__subscriptionId=e.headers.get("X-Subscription-ID");t()}}])}subscribe(e,r){var t=this._pusher;var n=this._networkInterface;var s=this._decompress;var o={_channelName:"",unsubscribe:function(){this._channelName&&t.unsubscribe(this._channelName)}};var a=A.default.add(o);n.query(e).then((function(n){var i=e.__subscriptionId;o._channelName=i;var c=t.subscribe(i);c.bind("update",(function(e){var t=e.compressed_result?s(e.compressed_result):e.result;t&&r(t.errors,t.data);e.more||A.default.unsubscribe(a)}))}));return a}unsubscribe(e){A.default.unsubscribe(e)}}S.default=PusherSubscriber;var C={};var E=C&&C.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(C,"__esModule",{value:true});const P=E(_);const k=E(S);
/**
 * Modify an Apollo network interface to
 * subscribe an unsubscribe using `cable:`.
 * Based on `addGraphQLSubscriptions` from `subscriptions-transport-ws`.
 *
 * This function assigns `.subscribe` and `.unsubscribe` functions
 * to the provided networkInterface.
 * @example Adding ActionCable subscriptions to a HTTP network interface
 *   // Load ActionCable and create a consumer
 *   var ActionCable = require('@rails/actioncable')
 *   var cable = ActionCable.createConsumer()
 *   window.cable = cable
 *
 *   // Load ApolloClient and create a network interface
 *   var apollo = require('apollo-client')
 *   var RailsNetworkInterface = apollo.createNetworkInterface({
 *     uri: '/graphql',
 *     opts: {
 *       credentials: 'include',
 *     },
 *     headers: {
 *       'X-CSRF-Token': $("meta[name=csrf-token]").attr("content"),
 *     }
 *   });
 *
 *   // Add subscriptions to the network interface
 *   var addGraphQLSubscriptions = require("graphql-ruby-client/subscriptions/addGraphQLSubscriptions")
 *   addGraphQLSubscriptions(RailsNetworkInterface, {cable: cable})
 *
 *   // Optionally, add persisted query support:
 *   var OperationStoreClient = require("./OperationStoreClient")
 *   RailsNetworkInterface.use([OperationStoreClient.apolloMiddleware])
 *
 * @example Subscriptions with Pusher & graphql-pro
 *   var pusher = new Pusher(appId, options)
 *   addGraphQLSubscriptions(RailsNetworkInterface, {pusher: pusher})
 *
 * @param {Object} networkInterface - an HTTP NetworkInterface
 * @param {ActionCable.Consumer} options.cable - A cable for subscribing with
 * @param {Pusher} options.pusher - A pusher client for subscribing with
*/function M(e,r){r||(r={});var t;if(r.subscriber)t=r.subscriber;else if(r.cable)t=new P.default(r.cable,e,r.channelName);else{if(!r.pusher)throw new Error("Must provide cable: or pusher: option");t=new k.default(r.pusher,e,r.decompress)}var n=Object.assign(e,{subscribe:function(e,r){var n=t.subscribe(e,r);return n},unsubscribe(e){t.unsubscribe(e)}});return n}C.default=M;var I={};Object.defineProperty(I,"__esModule",{value:true});I.createActionCableHandler=void 0;function O(e){return function(r,t,n,s){var o=Math.round(Date.now()+Math.random()*1e5).toString(16);var a=e.cable;var i=e.operations;var c=true;const u=a.subscriptions.create({channel:e.channelName||"GraphqlChannel",channelId:o},{connected:function(){var n;n=i?{variables:t,operationName:r.name,operationId:i.getOperationId(r.name)}:{variables:t,operationName:r.name,query:r.text,operationId:r.id&&e.clientName?e.clientName+"/"+r.id:null};u.perform("execute",n)},received:function(e){const r=e.result;r&&r.errors?s.onError(r.errors):r&&s.onNext({data:r.data});!e.more&&c&&s.onCompleted()}});return{dispose:function(){if(c){c=false;u.unsubscribe()}}}}}I.createActionCableHandler=O;var L={};Object.defineProperty(L,"__esModule",{value:true});L.createPusherHandler=void 0;function N(e){var r=e.pusher;var t=e.fetchOperation;var n=e.decompress||function(e){throw new Error("Received compressed_result but createPusherHandler wasn't configured with `decompress: (result: string) => any`. Add this configuration.")};return function(e,s,o,a){var i;t(e,s,o).then((function(e){i=e.headers.get("X-Subscription-ID");var t=r.subscribe(i);t.bind("update",(function(e){let r=null;r=e.compressed_result?n(e.compressed_result):e.result;r&&r.errors?a.onError(r.errors):r&&a.onNext({data:r.data});e.more||a.onCompleted()}))}));return{dispose:function(){r.unsubscribe(i)}}}}L.createPusherHandler=N;var j={};var q=j&&j.__awaiter||function(e,r,t,n){function s(e){return e instanceof t?e:new t((function(r){r(e)}))}return new(t||(t=Promise))((function(t,o){function a(e){try{c(n.next(e))}catch(e){o(e)}}function i(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){e.done?t(e.value):s(e.value).then(a,i)}c((n=n.apply(e,r||[])).next())}))};Object.defineProperty(j,"__esModule",{value:true});j.createAblyHandler=void 0;const H="graphql-subscriber";const D=100;class AblyError extends Error{constructor(e){super(e.message);this.reason=e}get code(){return this.reason.code}get statusCode(){return this.reason.statusCode}}function R(e){const{ably:r,fetchOperation:t}=e;const n=()=>!r.auth.clientId||r.auth.clientId==="*";return(e,s,o,a)=>{let i=null;const c=e=>{e&&(e.errors?a.onError(e.errors):e.data&&Object.keys(e.data).length>0&&a.onNext({data:e.data}))};const u=e=>{const r=e.data;c(r.result);r.more||a.onCompleted()};(()=>q(this,void 0,void 0,(function*(){try{const l=yield t(e,s,o);const d=l.headers.get("X-Subscription-ID");if(!d)throw new Error("Missing X-Subscription-ID header");const b=l.headers.get("X-Subscription-Key");i=r.channels.get(d,{params:{rewind:String(D)},cipher:b?{key:b}:void 0,modes:["SUBSCRIBE","PRESENCE"]});i.on("failed",(function(e){a.onError(e.reason?new AblyError(e.reason):new Error("Ably channel changed to failed state"))}));i.on("suspended",(function(e){e.previous==="attaching"&&e.current==="suspended"&&a.onError(e.reason?new AblyError(e.reason):new Error("Ably channel suspended before being attached"))}));const p=e=>{e&&i&&a.onError(new AblyError(e))};n()?i.presence.enterClient(H,"subscribed",p):i.presence.enter("subscribed",p);i.subscribe("update",u);c(l.body)}catch(e){a.onError(e)}})))();return{dispose:()=>q(this,void 0,void 0,(function*(){try{if(i){const e=i;i=null;e.unsubscribe();e.state==="attaching"&&(yield new Promise(((r,t)=>{const n=t=>{if(t.current!=="attaching"){e.off(n);r()}};e.on(n)})));yield new Promise(((r,t)=>{e.detach((e=>{e?t(new AblyError(e)):r()}))}));r.channels.release(e.name)}}catch(e){a.onError(e)}}))}}}j.createAblyHandler=R;var X=o;try{"default"in o&&(X=o.default)}catch(e){}var G={};Object.defineProperty(G,"__esModule",{value:true});G.createLegacyRelaySubscriptionHandler=void 0;const Q=I;const U=L;const B=j;const K=X;function J(e){var r;if(e.cable)r=(0,Q.createActionCableHandler)(e);else if(e.pusher)r=(0,U.createPusherHandler)(e);else{if(!e.ably)throw new Error("Missing options for subscription handler");r=(0,B.createAblyHandler)(e)}return r}G.createLegacyRelaySubscriptionHandler=J;
/**
 * Transport-agnostic wrapper for Relay Modern subscription handlers.
 * @example Add ActionCable subscriptions
 *   var subscriptionHandler = createHandler({
 *     cable: cable,
 *     operations: OperationStoreClient,
 *   })
 *   var network = Network.create(fetchQuery, subscriptionHandler)
 * @param {ActionCable.Consumer} options.cable - A consumer from `.createConsumer`
 * @param {Pusher} options.pusher - A Pusher client
 * @param {Ably.Realtime} options.ably - An Ably client
 * @param {OperationStoreClient} options.operations - A generated `OperationStoreClient` for graphql-pro's OperationStore
 * @return {Function} A handler for a Relay Modern network
*/function z(e){const r=J(e);return(e,t)=>K.Observable.from({subscribe:n=>{const s=r({text:e.text,name:e.name,id:e.id},t,{},{onError:e=>{n.error},onNext:e=>{e&&e.data&&n.next(e)},onCompleted:n.complete});return{unsubscribe:()=>{s.dispose()}}}})}G.default=z;var F={};var T=F&&F.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(F,"__esModule",{value:true});F.createRelaySubscriptionHandler=F.addGraphQLSubscriptions=F.AblyLink=F.PusherLink=F.ActionCableLink=F.generateClient=F.sync=void 0;const V=T(e);F.sync=V.default;const W=r;Object.defineProperty(F,"generateClient",{enumerable:true,get:function(){return W.generateClient}});const Y=T(t);F.ActionCableLink=Y.default;const Z=T(i);F.PusherLink=Z.default;const $=T(b);F.AblyLink=$.default;const ee=T(C);F.addGraphQLSubscriptions=ee.default;const re=T(G);F.createRelaySubscriptionHandler=re.default;const te=F.__esModule,ne=F.createRelaySubscriptionHandler,se=F.addGraphQLSubscriptions,oe=F.AblyLink,ae=F.PusherLink,ie=F.ActionCableLink,ce=F.generateClient,ue=F.sync;export{oe as AblyLink,ie as ActionCableLink,ae as PusherLink,te as __esModule,se as addGraphQLSubscriptions,ne as createRelaySubscriptionHandler,F as default,ce as generateClient,ue as sync};

