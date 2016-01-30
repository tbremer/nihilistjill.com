'use strict';
/**
 * built in modules
 */
import {readFile} from 'fs';
import {resolve} from 'path';
import {parse as urlParse} from 'url';
import mime from 'mime';

/**
 * homebrewed modules
 */
import templator from '../micro-template';

const _readFile = (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, (err, data) => {
      if (err) return reject(err);

      return resolve(data.toString());
    });
  });
};


export function home (request, response) {
  let headers = request.headers,
  siteName = headers['x-site-name'];

  readFile(resolve(process.env.PWD, 'lib/html/index.html'), (err, data) => {
    if (err) return response.end(JSON.stringify(err));

    let responseHTML = templator(data.toString());
    response.end(responseHTML({siteName: siteName}));
  });
}

export function staticFiles (request, response) {
  const url = urlParse(request.url);
  let filePath = url.pathname.replace('assets', `${process.env.PWD}/dist`);

  _readFile(filePath)
    .then((data) =>{
      const mimeType = mime.lookup(filePath);

      response.writeHead(200, {
        'Content-Type': mimeType,
        'Content-Length': data.length,
        'Cache-Control': `public, max-age=604800`,
        'Expires': new Date(new Date().setDate(new Date().getDate() + 7))
      });

      response.end(data);
    })
    .then(null, (err) => {
      console.log(err);
      response.writeHead(404);
      response.end(JSON.stringify(err));
    });
}
