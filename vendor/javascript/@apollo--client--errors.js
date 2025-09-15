// @apollo/client/errors@4.0.4 downloaded from https://ga.jspm.io/npm:@apollo/client@4.0.4/errors/index.js

function r(r,e){return typeof r==="object"&&r!==null&&r[Symbol.for("apollo.error")]===e}function e(r){Object.defineProperty(r,Symbol.for("apollo.error"),{value:r.name,enumerable:false,writable:false,configurable:false})}function o(r){return r.map((r=>r.message||"Error message not found.")).join("\n")}class CombinedProtocolErrors extends Error{static is(e){return r(e,"CombinedProtocolErrors")}
/**
    * A function that formats the error message used for the error's `message`
    * property. Override this method to provide your own formatting.
    * 
    * @remarks
    * 
    * The `formatMessage` function is called by the `CombinedProtocolErrors`
    * constructor to provide a formatted message as the `message` property of the
    * `CombinedProtocolErrors` object. Follow the ["Providing a custom message
    * formatter"](https://www.apollographql.com/docs/react/api/errors/CombinedProtocolErrors#providing-a-custom-message-formatter) guide to learn how to modify the message format.
    * 
    * @param errors - The array of GraphQL errors returned from the server in the
    * `errors` field of the response.
    * @param options - Additional context that could be useful when formatting
    * the message.
    */static formatMessage=o;errors;constructor(r){super(CombinedProtocolErrors.formatMessage(r,{defaultFormatMessage:o}));this.name="CombinedProtocolErrors";this.errors=r;e(this);Object.setPrototypeOf(this,CombinedProtocolErrors.prototype)}}function t(r){return r!==null&&typeof r==="object"&&typeof r.message==="string"&&typeof r.name==="string"&&(typeof r.stack==="string"||typeof r.stack==="undefined")}class UnconventionalError extends Error{static is(e){return r(e,"UnconventionalError")}constructor(r){super("An error of unexpected shape occurred.",{cause:r});this.name="UnconventionalError";e(this);Object.setPrototypeOf(this,UnconventionalError.prototype)}}function s(r){return r.filter((r=>r)).map((r=>r.message||"Error message not found.")).join("\n")}class CombinedGraphQLErrors extends Error{static is(e){return r(e,"CombinedGraphQLErrors")}
/**
    * A function that formats the error message used for the error's `message`
    * property. Override this method to provide your own formatting.
    * 
    * @remarks
    * 
    * The `formatMessage` function is called by the `CombinedGraphQLErrors`
    * constructor to provide a formatted message as the `message` property of the
    * `CombinedGraphQLErrors` object. Follow the ["Providing a custom message
    * formatter"](https://www.apollographql.com/docs/react/api/errors/CombinedGraphQLErrors#providing-a-custom-message-formatter) guide to learn how to modify the message format.
    * 
    * @param errors - The array of GraphQL errors returned from the server in
    * the `errors` field of the response.
    * @param options - Additional context that could be useful when formatting
    * the message.
    */static formatMessage=s;errors;data;extensions;constructor(r,o=r.errors||[]){super(CombinedGraphQLErrors.formatMessage(o,{result:r,defaultFormatMessage:s}));this.errors=o;this.data=r.data;this.extensions=r.extensions;this.name="CombinedGraphQLErrors";e(this);Object.setPrototypeOf(this,CombinedGraphQLErrors.prototype)}}const n=new WeakSet;
/**
* @internal Please do not use directly.
* 
* @deprecated This is an internal API and should not be used directly. This can be removed or changed at any time.
*/function a(r){n.add(r)}const i={is:r=>n.has(r)};class LocalStateError extends Error{static is(e){return r(e,"LocalStateError")}path;constructor(r,o={}){super(r,{cause:o.sourceError});this.name="LocalStateError";this.path=o.path;e(this);Object.setPrototypeOf(this,LocalStateError.prototype)}}class ServerError extends Error{static is(e){return r(e,"ServerError")}response;statusCode;bodyText;constructor(r,o){super(r);this.name="ServerError";this.response=o.response;this.statusCode=o.response.status;this.bodyText=o.bodyText;e(this);Object.setPrototypeOf(this,ServerError.prototype)}}class ServerParseError extends Error{static is(e){return r(e,"ServerParseError")}response;statusCode;bodyText;constructor(r,o){super(r instanceof Error?r.message:"Could not parse server response",{cause:r});this.name="ServerParseError";this.response=o.response;this.statusCode=o.response.status;this.bodyText=o.bodyText;e(this);Object.setPrototypeOf(this,ServerParseError.prototype)}}const c=Symbol();function p(r){return"extensions"in r&&CombinedProtocolErrors.is(r.extensions[c])}function u(r){return t(r)?r:typeof r==="string"?new Error(r,{cause:r}):new UnconventionalError(r)}export{CombinedGraphQLErrors,CombinedProtocolErrors,i as LinkError,LocalStateError,c as PROTOCOL_ERRORS_SYMBOL,ServerError,ServerParseError,UnconventionalError,p as graphQLResultHasProtocolErrors,t as isErrorLike,a as registerLinkError,u as toErrorLike};

