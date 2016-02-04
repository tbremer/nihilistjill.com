'use strict';

import phanPath from 'phantomjs-prebuilt';
import {parse as urlParse} from 'url';
import {spawn} from 'child_process';

export default function (request, response) {
  const urlObj = urlParse(request.url),
  url = `http://127.0.0.1:1337/${urlObj.pathname.replace('/images/','').replace('.png','')}`,
  phantomPath = phanPath.path,
  headers = request.headers,
  siteName = headers['x-site-name'],
  phantom = spawn(phantomPath, [`${process.env.PWD}/lib/image-server/phantom.js`, url, siteName]);

  let image = '';

  phantom.stdout.on('data', (data) => {
    image += data;
  });

  phantom.on('close', () => {
    image = new Buffer(image, 'base64');
    response.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': image.length
    });

    response.write(image, 'binary', () => response.end());
  });
}
