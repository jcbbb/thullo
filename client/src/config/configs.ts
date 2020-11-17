import Boards from '../components/boards/boards'
import Login from '../components/login/login';
import Signup from '../components/signup/signup';

export type RouteType = 'private' | 'public';

type IRouteConfig = {
    [key in RouteType]: any[]
}

const routes: IRouteConfig = {
    private: [
        {
            path: '/',
            element: Boards
        }
    ],
    public: [
        {
            path: '/',
            element: Signup
        },
        {
            path: '/login',
            element: Login,
        },
        {
            path: '/signup',
            element: Signup
        }
    ]
}

export default routes;