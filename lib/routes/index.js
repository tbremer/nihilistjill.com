'use strict';

import {readFile} from 'fs';
import {parse as queryParse} from 'querystring';


const home = function(request, response) {
  response.end('Home Page!');
};

const staticFiles = function(request, response) {
  response.end('Static File!');
};

export {home, staticFiles};
