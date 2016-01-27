'use strict';

/*jshint evil:true*/
export default (s) => new Function(`obj`, `(obj=obj?obj:{}); return ${JSON.stringify(s).replace(/\${(.*?)}/g, (m, g) => `"+(obj["${g}"] ? obj["${g}"] : "${m}")+"`)}`);
