'use strict';

import {createServer as server} from 'http';
import {parse as urlParse} from 'url';

import {home as Home, staticFiles as Assets, createNihilism as FuckIt} from './lib/routes';
import pickRoute from './lib/pick-route';

const port = 1337;

server((req, res) => {
  const url = urlParse(req.url),
  Router = {
    '/assets/(js|css)/(.+)\.(js|css)': Assets,
    '/fuckit': FuckIt,
    '/(.*?)': Home
  };

  let routes = Object.keys(Router),
  validRoute = pickRoute(url.pathname, routes);

  if (!validRoute) {
    res.writeHead(404);
    res.end();
    return;
  }

  return Router[validRoute].call(null, req, res);
})
.listen(port, () => { console.log(`Listening on ${port}`); });
