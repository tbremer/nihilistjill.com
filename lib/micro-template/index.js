'use strict';

/*jshint evil:true*/
export default (s) => {
  return new Function(
    `obj`,
    `(obj=obj?obj:{}); return ${JSON.stringify(s).replace(/\${(.*?)}/g, (undefined, g) => `"+(obj["${g}"] ? obj["${g}"] : "")+"`)}`);
};
