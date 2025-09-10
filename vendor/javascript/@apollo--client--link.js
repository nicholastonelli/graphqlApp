// @apollo/client/link@4.0.4 downloaded from https://ga.jspm.io/npm:@apollo/client@4.0.4/link/index.js

import{EMPTY as t}from"rxjs";import{createOperation as o}from"@apollo/client/link/utils";import{__DEV__ as n}from"@apollo/client/utilities/environment";import{invariant as e,newInvariantError as i}from"@apollo/client/utilities/invariant";class ApolloLink{static empty(){return new ApolloLink((()=>t))}
/**
     * Composes multiple links into a single composed link that executes each
     * provided link in serial order.
     *
     * @example
     *
     * ```ts
     * import { from, HttpLink, ApolloLink } from "@apollo/client";
     * import { RetryLink } from "@apollo/client/link/retry";
     * import MyAuthLink from "../auth";
     *
     * const link = ApolloLink.from([
     *   new RetryLink(),
     *   new MyAuthLink(),
     *   new HttpLink({ uri: "http://localhost:4000/graphql" }),
     * ]);
     * ```
     *
     * @param links - An array of `ApolloLink` instances or request handlers that
     * are executed in serial order.
     */static from(t){if(t.length===0)return ApolloLink.empty();const[o,...n]=t;return o.concat(...n)}
/**
     * Creates a link that conditionally routes a request to different links.
     *
     * @example
     *
     * ```ts
     * import { ApolloLink, HttpLink } from "@apollo/client";
     *
     * const link = ApolloLink.split(
     *   (operation) => operation.getContext().version === 1,
     *   new HttpLink({ uri: "http://localhost:4000/v1/graphql" }),
     *   new HttpLink({ uri: "http://localhost:4000/v2/graphql" })
     * );
     * ```
     *
     * @param test - A predicate function that receives the current `operation`
     * and returns a boolean indicating which link to execute. Returning `true`
     * executes the `left` link. Returning `false` executes the `right` link.
     *
     * @param left - The link that executes when the `test` function returns
     * `true`.
     *
     * @param right - The link that executes when the `test` function returns
     * `false`. If the `right` link is not provided, the request is forwarded to
     * the next link in the chain.
     */static split(t,o,i=new ApolloLink(((t,o)=>o(t)))){const r=new ApolloLink(((r,l)=>{const s=t(r);n&&typeof s!=="boolean"&&n&&e.warn(61,s);return s?o.request(r,l):i.request(r,l)}));return Object.assign(r,{left:o,right:i})}
/**
     * Executes a GraphQL request against a link. The `execute` function begins
     * the request by calling the request handler of the link.
     *
     * @example
     *
     * ```ts
     * const observable = ApolloLink.execute(link, { query, variables }, { client });
     *
     * observable.subscribe({
     *   next(value) {
     *     console.log("Received", value);
     *   },
     *   error(error) {
     *     console.error("Oops got error", error);
     *   },
     *   complete() {
     *     console.log("Request complete");
     *   },
     * });
     * ```
     *
     * @param link - The `ApolloLink` instance to execute the request.
     *
     * @param request - The GraphQL request details, such as the `query` and
     * `variables`.
     *
     * @param context - The execution context for the request, such as the
     * `client` making the request.
     */static execute(i,r,l){return i.request(o(r,l),(()=>{n&&n&&e.warn(62);return t}))}
/**
     * Combines multiple links into a single composed link.
     *
     * @example
     *
     * ```ts
     * const link = ApolloLink.concat(firstLink, secondLink, thirdLink);
     * ```
     *
     * @param links - The links to concatenate into a single link. Each link will
     * execute in serial order.
     *
     * @deprecated Use `ApolloLink.from` instead. `ApolloLink.concat` will be
     * removed in a future major version.
     */static concat(...t){return ApolloLink.from(t)}constructor(t){t&&(this.request=t)}
/**
     * Concatenates a link that conditionally routes a request to different links.
     *
     * @example
     *
     * ```ts
     * import { ApolloLink, HttpLink } from "@apollo/client";
     *
     * const previousLink = new ApolloLink((operation, forward) => {
     *   // Handle the request
     *
     *   return forward(operation);
     * });
     *
     * const link = previousLink.split(
     *   (operation) => operation.getContext().version === 1,
     *   new HttpLink({ uri: "http://localhost:4000/v1/graphql" }),
     *   new HttpLink({ uri: "http://localhost:4000/v2/graphql" })
     * );
     * ```
     *
     * @param test - A predicate function that receives the current `operation`
     * and returns a boolean indicating which link to execute. Returning `true`
     * executes the `left` link. Returning `false` executes the `right` link.
     *
     * @param left - The link that executes when the `test` function returns
     * `true`.
     *
     * @param right - The link that executes when the `test` function returns
     * `false`. If the `right` link is not provided, the request is forwarded to
     * the next link in the chain.
     */split(t,o,n){return this.concat(ApolloLink.split(t,o,n))}concat(...t){return t.length===0?this:t.reduce(this.combine.bind(this),this)}combine(t,o){const n=new ApolloLink(((n,e)=>t.request(n,(t=>o.request(t,e)))));return Object.assign(n,{left:t,right:o})}request(t,o){throw i(63)}
/**
    * @internal
    * Used to iterate through all links that are concatenations or `split` links.
    * 
    * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
    */left;
/**
    * @internal
    * Used to iterate through all links that are concatenations or `split` links.
    * 
    * @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
    */
right}
/**
 * @deprecated Use `ApolloLink.empty` instead. `empty` will be removed in a
 * future major version.
 */const r=ApolloLink.empty;
/**
 * @deprecated Use `ApolloLink.from` instead. `from` will be removed in a
 * future major version.
 */const l=ApolloLink.from;
/**
 * @deprecated Use `ApolloLink.split` instead. `split` will be removed in a
 * future major version.
 */const s=ApolloLink.split;
/**
 * @deprecated Use `ApolloLink.from` instead. `concat` will be removed in a
 * future major version.
 */const c=ApolloLink.concat;const p=ApolloLink.execute;export{ApolloLink,c as concat,r as empty,p as execute,l as from,s as split};

