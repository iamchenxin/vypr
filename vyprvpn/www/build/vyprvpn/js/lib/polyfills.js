!function(){window.console||(window.console={});for(var a=["log","info","warn","error","debug","trace","dir","group","groupCollapsed","groupEnd","time","timeEnd","profile","profileEnd","dirxml","assert","count","markTimeline","timeStamp","clear"],b=0;b<a.length;b++)window.console[a[b]]||(window.console[a[b]]=function(){})}(),Object.keys||(Object.keys=function(){"use strict";var a=Object.prototype.hasOwnProperty,b=!{toString:null}.propertyIsEnumerable("toString"),c=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],d=c.length;return function(e){if("object"!=typeof e&&("function"!=typeof e||null===e))throw new TypeError("Object.keys called on non-object");var f,g,h=[];for(f in e)a.call(e,f)&&h.push(f);if(b)for(g=0;d>g;g++)a.call(e,c[g])&&h.push(c[g]);return h}}()),Array.isArray||(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)}),Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){if(void 0===this||null===this)throw new TypeError('"this" is null or not defined');var c=this.length>>>0;for(b=+b||0,1/0===Math.abs(b)&&(b=0),0>b&&(b+=c,0>b&&(b=0));c>b;b++)if(this[b]===a)return b;return-1}),function(a){"use strict";var b=a.prototype,c=b.parseFromString;try{if((new a).parseFromString("","text/html"))return}catch(d){}b.parseFromString=function(a,b){if(/^\s*text\/html\s*(?:;|$)/i.test(b)){var d=document.implementation.createHTMLDocument("");return a.toLowerCase().indexOf("<!doctype")>-1?d.documentElement.innerHTML=a:d.body.innerHTML=a,d}return c.apply(this,arguments)}}(DOMParser),String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)},function(a){if("content"in a.createElement("template"))return!1;for(var b,c,d,e,f=a.getElementsByTagName("template"),g=f.length,h=0;g>h;++h){for(b=f[h],c=b.childNodes,d=c.length,e=a.createDocumentFragment();c[0];)e.appendChild(c[0]);b.content=e}}(document);