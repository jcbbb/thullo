import routes, { RouteType } from './configs';

const get_routes = (type: RouteType) => {
  return routes[type];
};

export default get_routes;
