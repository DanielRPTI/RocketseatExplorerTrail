//users/:id

export function buildRoutePath(path) {
  const routeParamteresRegex = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(routeParamteresRegex, '(?<$1>[a-z0-9\-_]+)')
  
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}