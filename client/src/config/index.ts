import routes, { RouteType } from './configs'

const getRoutes = (type: RouteType) => {
    return routes[type];
}

export default getRoutes;