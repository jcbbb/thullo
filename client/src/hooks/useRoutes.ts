import { useAuthStore } from '../context/authContext'
import routeConfig from '../config';

const useRoutes = () => {
    const { isAuthenticated } = useAuthStore()
    const routeType = isAuthenticated ? 'private' : 'public'
    return routeConfig(routeType)
}

export default useRoutes;