Function.prototype.forEach=function(a,b,c){for(var d in a)"undefined"==typeof this.prototype[d]&&b.call(c,a[d],d,a)},String.forEach=function(a,b,c){Array.forEach(a.split(""),function(d,e){b.call(c,d,e,a)})};var forEach=function(a,b,c){if(a){var d=Object;if(a instanceof Function)d=Function;else{if(a.forEach instanceof Function)return void a.forEach(b,c);"string"==typeof a?d=String:"number"==typeof a.length&&(d=Array)}d.forEach(a,b,c)}};