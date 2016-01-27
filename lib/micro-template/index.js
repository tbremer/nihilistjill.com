'use strict';

/*jshint evil:true*/
export default (string) => new Function(`obj`, `(obj=obj?obj:{}); return ${JSON.stringify(string).replace(/\${(.*?)}/g, (m, g) => `"+(obj["${g}"] ? obj["${g}"] : "${m}")+"`)}`);
