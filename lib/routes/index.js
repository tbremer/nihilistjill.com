'use strict';
/**
 * built in modules
 */
import {readFile} from 'fs';
import {resolve} from 'path';
import {parse as urlParse} from 'url';
import {parse as queryParse} from 'querystring';
import mime from 'mime';

/**
 * homebrewed modules
 */
import templator from '../micro-template';
import nihilism from '../nihilism';
import shuffle from '../shuffle-array';
import between from '../between-two-numbers';

const _readFile = (path) => {
  return new Promise((resolve, reject) => {
    readFile(path, (err, data) => {
      if (err) return reject(err);

      return resolve(data.toString());
    });
  });
};

export function home (request, response) {
  const url = urlParse(request.url);
  console.log(url);
  let headers = request.headers,
  siteName = headers['x-site-name'];

  readFile(resolve(process.env.PWD, 'lib/html/index.html'), (err, data) => {
    if (err) return response.end(JSON.stringify(err));


    let loadedStory = new Buffer(url.pathname.replace(/\//, ''), 'base64').toString();

    let responseHTML = templator(data.toString()),
      siteData = {
        pageUrl: `http://nihilist${siteName.toLowerCase()}.com${url.pathname}`,
        siteName: siteName,
        loadedStory: loadedStory.length ? loadedStory : '',
        hasLoadedStory: loadedStory.length ? 'contains-story' : ''
      };

    response.end(responseHTML(siteData));
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

export function createNihilism (request, response) {
  let formData = '';

  request.on('data', (d) => { formData += d; });
  request.on('end', () => {
    let formDataObj = queryParse(formData),
    opener = nihilism.openers[0],
    closer = nihilism.closers[0],
    middle = shuffle(nihilism.middle).slice(0, between(2, ((nihilism.middle.length - 1) / 4))).join('\n'),
    responseData = templator(String(opener + '\n' + middle + '\n' + closer))(formDataObj).replace(/\n/g, '<br>');

    response.writeHead(200, {
      'Content-Type': 'text/plain',
      'Content-Length': responseData.length,
      'Cache-Control': `public, max-age=604800`,
      'Expires': new Date(new Date().setDate(new Date().getDate() + 7))
    });

    response.end(responseData);
  });
}
