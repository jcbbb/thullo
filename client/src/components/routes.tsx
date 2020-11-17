import * as React from 'react';
import { Routes, Route } from 'react-router-dom'
import useRoutes from '../hooks/useRoutes';

const RenderedRoutes = () => {
    const routes = useRoutes();
    return <Routes>
        {
            routes.map((route, i) => (
                <Route key={i} element={<route.element />} path={route.path} />
            ))
        }
    </Routes>
}

export default RenderedRoutes;
