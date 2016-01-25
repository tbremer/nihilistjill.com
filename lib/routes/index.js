'use strict';

import {readFile} from 'fs';
import {parse as urlParse} from 'url';


const home = function(request, response) {
  let url = urlParse(request.url),
  headers = request.headers;

  response.end(`<pre>${JSON.stringify(headers, null, 2)}</pre>`);
};

const staticFiles = function(request, response) {
  response.end('Static File!');
};

export {home, staticFiles};
