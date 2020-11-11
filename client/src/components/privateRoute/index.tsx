import * as React from 'react';
import {Navigate, Route} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}: {component: React.ComponentType<any>}) => {
    return (
        <Route {...rest} element={true ? <Component /> : <Navigate to="/login" />} />
    )
}

export default PrivateRoute;
