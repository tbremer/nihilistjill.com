export default function (requestedRoute, routesArrayy) {
  let length = routesArrayy.length,
  count = -1,
  validRoute = false;

  while (++count < length) {
    let _route = routesArrayy[count];

    if (new RegExp(`^${_route}$`).test(requestedRoute)) {
      validRoute = _route;
      break;
    }
  }

  return validRoute;
}
