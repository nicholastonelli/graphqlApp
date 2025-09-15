// fbjs/lib/areEqual@3.0.5 downloaded from https://ga.jspm.io/npm:fbjs@3.0.5/lib/areEqual.js

var e={};var r=[];var t=[];
/**
 * Checks if two values are equal. Values may be primitives, arrays, or objects.
 * Returns true if both arguments have the same keys and values.
 *
 * @see http://underscorejs.org
 * @copyright 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
 * @license MIT
 */function areEqual(e,a){var l=r.length?r.pop():[];var n=t.length?t.pop():[];var u=eq(e,a,l,n);l.length=0;n.length=0;r.push(l);t.push(n);return u}function eq(e,r,t,a){if(e===r)return 0!==e||1/e==1/r;if(null==e||null==r)return false;if("object"!=typeof e||"object"!=typeof r)return false;var l=Object.prototype.toString;var n=l.call(e);if(n!=l.call(r))return false;switch(n){case"[object String]":return e==String(r);case"[object Number]":return!isNaN(e)&&!isNaN(r)&&e==Number(r);case"[object Date]":case"[object Boolean]":return+e==+r;case"[object RegExp]":return e.source==r.source&&e.global==r.global&&e.multiline==r.multiline&&e.ignoreCase==r.ignoreCase}var u=t.length;while(u--)if(t[u]==e)return a[u]==r;t.push(e);a.push(r);var o=0;if("[object Array]"===n){o=e.length;if(o!==r.length)return false;while(o--)if(!eq(e[o],r[o],t,a))return false}else{if(e.constructor!==r.constructor)return false;if(e.hasOwnProperty("valueOf")&&r.hasOwnProperty("valueOf"))return e.valueOf()==r.valueOf();var s=Object.keys(e);if(s.length!=Object.keys(r).length)return false;for(var f=0;f<s.length;f++)if(!eq(e[s[f]],r[s[f]],t,a))return false}t.pop();a.pop();return true}e=areEqual;var a=e;export{a as default};

