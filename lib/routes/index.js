'use strict';
/**
 * built in modules
 */
import {readFile} from 'fs';
import {resolve} from 'path';
import {parse as urlParse} from 'url';

/**
 * homebrewed modules
 */
import templator from '../micro-template';


const home = function(request, response) {
  let headers = request.headers,
  siteName = headers['x-site-name'];

  readFile(resolve(process.env.PWD, 'lib/html/index.html'), (err, data) => {
    if (err) return response.end(JSON.stringify(err));

    let responseHTML = templator(data.toString());
    response.end(responseHTML({siteName: siteName}));
  });
};

const staticFiles = function(request, response) {
  response.end('Static File!');
};

export {home, staticFiles};
