function merge(a,b){var c=Array.isArray(b),d=c&&[]||{};return c?(a=a||[],d=d.concat(a),b.forEach(function(b,c){"undefined"==typeof a[c]?d[c]=b:"object"==typeof b?d[c]=merge(a[c],b):-1===a.indexOf(b)&&d.push(b)})):(a&&"object"==typeof a&&Object.keys(a).forEach(function(b){d[b]=a[b]}),Object.keys(b).forEach(function(c){d[c]="object"==typeof b[c]&&b[c]&&a[c]?merge(a[c],b[c]):b[c]})),d}