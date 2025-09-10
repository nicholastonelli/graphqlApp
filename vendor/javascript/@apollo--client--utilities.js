// @apollo/client/utilities@4.0.4 downloaded from https://ga.jspm.io/npm:@apollo/client@4.0.4/utilities/index.js

export{Observable}from"rxjs";import{WeakCache as e}from"@wry/caches";import{Trie as r}from"@wry/trie";import{wrap as t}from"optimism";import{checkDocument as n,AutoCleanedWeakCache as o,registerGlobalCache as s,getOperationDefinition as i,mergeDeep as a,omitDeep as c}from"@apollo/client/utilities/internal";export{canonicalStringify,getMainDefinition}from"@apollo/client/utilities/internal";import{invariant as u}from"@apollo/client/utilities/invariant";import{c as f}from"../_/Dde5f6rx.js";import{print as l,Kind as m,visit as g}from"graphql";import{__DEV__ as p}from"@apollo/client/utilities/environment";import{__rest as d}from"tslib";import"@apollo/client/utilities/internal/globals";function h(e){return e}class DocumentTransform{transform;cached;resultCache=new WeakSet;getCacheKey(e){return[e]}
/**
     * Creates a DocumentTransform that returns the input document unchanged.
     *
     * @returns The input document
     */static identity(){return new DocumentTransform(h,{cache:false})}
/**
     * Creates a DocumentTransform that conditionally applies one of two transforms.
     *
     * @param predicate - Function that determines which transform to apply
     * @param left - Transform to apply when `predicate` returns `true`
     * @param right - Transform to apply when `predicate` returns `false`. If not provided, it defaults to `DocumentTransform.identity()`.
     * @returns A DocumentTransform that conditionally applies a document transform based on the predicate
     *
     * @example
     *
     * ```ts
     * import { isQueryOperation } from "@apollo/client/utilities";
     *
     * const conditionalTransform = DocumentTransform.split(
     *   (document) => isQueryOperation(document),
     *   queryTransform,
     *   mutationTransform
     * );
     * ```
     */static split(e,r,t=DocumentTransform.identity()){return Object.assign(new DocumentTransform((n=>{const o=e(n)?r:t;return o.transformDocument(n)}),{cache:false}),{left:r,right:t})}constructor(e,r={}){this.transform=e;r.getCacheKey&&(this.getCacheKey=r.getCacheKey);this.cached=r.cache!==false;this.resetCache()}resetCache(){if(this.cached){const n=new r;this.performWork=t(DocumentTransform.prototype.performWork.bind(this),{makeCacheKey:e=>{const r=this.getCacheKey(e);if(r){u(Array.isArray(r),20);return n.lookupArray(r)}},max:f["documentTransform.cache"],cache:e})}}performWork(e){n(e);return this.transform(e)}
/**
     * Transforms a GraphQL document using the configured transform function.
     *
     * @remarks
     *
     * Note that `transformDocument` caches the transformed document. Calling
     * `transformDocument` again with the already-transformed document will
     * immediately return it.
     *
     * @param document - The GraphQL document to transform
     * @returns The transformed document
     *
     * @example
     *
     * ```ts
     * const document = gql`
     *   # ...
     * `;
     *
     * const documentTransform = new DocumentTransform(transformFn);
     * const transformedDocument = documentTransform.transformDocument(document);
     * ```
     */transformDocument(e){if(this.resultCache.has(e))return e;const r=this.performWork(e);this.resultCache.add(r);return r}
/**
     * Combines this document transform with another document transform. The
     * returned document transform first applies the current document transform,
     * then applies the other document transform.
     *
     * @param otherTransform - The transform to apply after this one
     * @returns A new DocumentTransform that applies both transforms in sequence
     *
     * @example
     *
     * ```ts
     * const combinedTransform = addTypenameTransform.concat(
     *   removeDirectivesTransform
     * );
     * ```
     */concat(e){return Object.assign(new DocumentTransform((r=>e.transformDocument(this.transformDocument(r))),{cache:false}),{left:this,right:e})}
/**
    * @internal
    * Used to iterate through all transforms that are concatenations or `split` links.
    * 
    * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
    */left;
/**
    * @internal
    * Used to iterate through all transforms that are concatenations or `split` links.
    * 
    * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
    */
right}let y;const C=Object.assign((e=>{let r=y.get(e);if(!r){r=l(e);y.set(e,r)}return r}),{reset(){y=new o(f.print||2e3)}});C.reset();p&&s("print",(()=>y?y.size:0))
/**
 * Determines whether the given object is a valid GraphQL execution result
 * according to the GraphQL specification.
 *
 * @remarks
 *
 * A valid execution result must be an object that contains only `data`,
 * `errors`, and/or `extensions` properties. At least one of `data` or `errors`
 * must be present.
 *
 * @param result - The object to test
 * @returns `true` if the object conforms to the GraphQL execution result format
 *
 * @example
 *
 * ```ts
 * import { isFormattedExecutionResult } from "@apollo/client/utilities";
 *
 * // Valid execution result
 * const validResult = { data: { user: { name: "John" } } };
 * console.log(isFormattedExecutionResult(validResult)); // true
 *
 * // Invalid - contains non-standard properties
 * const invalidResult = { data: {}, customField: "value" };
 * console.log(isFormattedExecutionResult(invalidResult)); // false
 * ```
 */;function I(e){return!!e&&("errors"in e||"data"in e)&&Object.keys(e).every((e=>e==="errors"||e==="data"||e==="extensions"))}
/**
 * Determines if a given object is a reference object.
 *
 * @param obj - The object to check if its a reference object
 *
 * @example
 *
 * ```ts
 * import { isReference } from "@apollo/client/utilities";
 *
 * isReference({ __ref: "User:1" }); // true
 * isReference({ __typename: "User", id: 1 }); // false
 * ```
 */function v(e){return Boolean(e&&typeof e==="object"&&typeof e.__ref==="string")}const k={kind:m.FIELD,name:{kind:m.NAME,value:"__typename"}};
/**
 * Adds `__typename` to all selection sets in the document except for the root
 * selection set.
 *
 * @param doc - The `ASTNode` to add `__typename` to
 *
 * @example
 *
 * ```ts
 * const document = gql`
 *   # ...
 * `;
 *
 * const withTypename = addTypenameToDocument(document);
 * ```
 */const D=Object.assign((function(e){return g(e,{SelectionSet:{enter(e,r,t){if(t&&t.kind===m.OPERATION_DEFINITION)return;const{selections:n}=e;if(!n)return;const o=n.some((e=>e.kind===m.FIELD&&(e.name.value==="__typename"||e.name.value.lastIndexOf("__",0)===0)));if(o)return;const s=t;return s.kind===m.FIELD&&s.directives&&s.directives.some((e=>e.name.value==="export"))?void 0:{...e,selections:[...n,k]}}}})}),{added(e){return e===k}});function b(e,r){return i(e)?.operation===r}
/**
 * Determine if a document is a mutation document.
 *
 * @remarks
 * If you are authoring an Apollo link, you might not need this utility.
 * Prefer using the `operationType` property the `operation` object instead.
 *
 * @param document - The GraphQL document to check
 * @returns A boolean indicating if the document is a mutation operation
 *
 * @example
 *
 * ```ts
 * import { isMutationOperation } from "@apollo/client/utilities";
 *
 * const mutation = gql`
 *   mutation MyMutation {
 *     # ...
 *   }
 * `;
 *
 * isMutationOperation(mutation); // true
 * ```
 */function x(e){return b(e,"mutation")}
/**
 * Determine if a document is a query document.
 *
 * @remarks
 * If you are authoring an Apollo link, you might not need this utility.
 * Prefer using the `operationType` property the `operation` object instead.
 *
 * @param document - The GraphQL document to check
 * @returns A boolean indicating if the document is a query operation
 *
 * @example
 *
 * ```ts
 * import { isQueryOperation } from "@apollo/client/utilities";
 *
 * const query = gql`
 *   query MyQuery {
 *     # ...
 *   }
 * `;
 *
 * isQueryOperation(query); // true
 * ```
 */function _(e){return b(e,"query")}
/**
 * Determine if a document is a subscription document.
 *
 * @remarks
 * If you are authoring an Apollo link, you might not need this utility.
 * Prefer using the `operationType` property the `operation` object instead.
 *
 * @param document - The GraphQL document to check
 * @returns A boolean indicating if the document is a subscription operation
 *
 * @example
 *
 * ```ts
 * import { isSubscriptionOperation } from "@apollo/client/utilities";
 *
 * const subscription = gql`
 *   subscription MySubscription {
 *     # ...
 *   }
 * `;
 *
 * isSubscriptionOperation(subscription); // true
 * ```
 */function O(e){return b(e,"subscription")}
/**
 * A basic pagination field policy that always concatenates new
 * results onto the existing array, without examining options.args.
 *
 * @param keyArgs - `keyArgs` that should be applied to the field policy
 * @returns The field policy that handles concatenating field results.
 */function P(e=false){return{keyArgs:e,merge(e,r){return e?[...e,...r]:r}}}
/**
 * A basic field policy that uses `options.args.{offset,limit}` to splice
 * the incoming data into the existing array. If your arguments are called
 * something different (like `args.{start,count}`), feel free to copy/paste
 * this implementation and make the appropriate changes.
 *
 * @param keyArgs - `keyArgs` that should be applied to the field policy
 * @returns The field policy that handles offset/limit pagination
 */function T(e=false){return{keyArgs:e,merge(e,r,{args:t}){const n=e?e.slice(0):[];if(r)if(t){const{offset:e=0}=t;for(let t=0;t<r.length;++t)n[e+t]=r[t]}else n.push(...r);return n}}}
/**
 * A field policy that attempts to handle pagination for fields that adhere to
 * the [Relay Connections Spec](https://relay.dev/graphql/connections.htm).
 *
 * @param keyArgs - `keyArgs` that should be applied to the field policy
 * @returns The field policy that handles Relay pagination
 */function j(e=false){return{keyArgs:e,read(e,{canRead:r,readField:t}){if(!e)return e;const n=[];let o="";let s="";e.edges.forEach((e=>{if(r(t("node",e))){n.push(e);if(e.cursor){o=o||e.cursor||"";s=e.cursor||s}}}));n.length>1&&o===s&&(o="");const{startCursor:i,endCursor:a}=e.pageInfo||{};return{...w(e),edges:n,pageInfo:{...e.pageInfo,startCursor:i||o,endCursor:a||s}}},merge(e,r,{args:t,isReference:n,readField:o}){e||(e=E());if(!r)return e;const s=r.edges?r.edges.map((e=>{n(e={...e})&&(e.cursor=o("cursor",e));return e})):[];if(r.pageInfo){const{pageInfo:e}=r;const{startCursor:t,endCursor:n}=e;const o=s[0];const i=s[s.length-1];o&&t&&(o.cursor=t);i&&n&&(i.cursor=n);const c=o&&o.cursor;c&&!t&&(r=a(r,{pageInfo:{startCursor:c}}));const u=i&&i.cursor;u&&!n&&(r=a(r,{pageInfo:{endCursor:u}}))}let i=e.edges;let c=[];if(t&&t.after){const e=i.findIndex((e=>e.cursor===t.after));e>=0&&(i=i.slice(0,e+1))}else if(t&&t.before){const e=i.findIndex((e=>e.cursor===t.before));c=e<0?i:i.slice(e);i=[]}else r.edges&&(i=[]);const u=[...i,...s,...c];const f={...r.pageInfo,...e.pageInfo};if(r.pageInfo){const{hasPreviousPage:e,hasNextPage:t,startCursor:n,endCursor:o,...s}=r.pageInfo;Object.assign(f,s);if(!i.length){void 0!==e&&(f.hasPreviousPage=e);void 0!==n&&(f.startCursor=n)}if(!c.length){void 0!==t&&(f.hasNextPage=t);void 0!==o&&(f.endCursor=o)}}return{...w(e),...w(r),edges:u,pageInfo:f}}}}const w=e=>d(e,A);const A=["edges","pageInfo"];function E(){return{edges:[],pageInfo:{hasPreviousPage:false,hasNextPage:true,startCursor:"",endCursor:""}}}
/**
 * Deeply removes all `__typename` properties in the given object or array.
 *
 * @param value - The object or array that should have `__typename` removed.
 * @returns The object with all `__typename` properties removed.
 *
 * @example
 *
 * ```ts
 * stripTypename({
 *   __typename: "User",
 *   id: 1,
 *   profile: { __typename: "Profile", name: "John Doe" },
 * });
 * // => { id: 1, profile: { name: "John Doe"}}
 * ```
 */function N(e){return c(e,"__typename")}function F(e){return e===7||e===8}function K(e){return!F(e)}export{DocumentTransform,D as addTypenameToDocument,f as cacheSizes,P as concatPagination,I as isFormattedExecutionResult,x as isMutationOperation,K as isNetworkRequestInFlight,F as isNetworkRequestSettled,_ as isQueryOperation,v as isReference,O as isSubscriptionOperation,T as offsetLimitPagination,C as print,j as relayStylePagination,N as stripTypename};

