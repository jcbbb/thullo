import * as React from 'react';
import { useAuthStore } from '../../context/authContext'

type IProps = {
    children: React.ReactNode,
    shown?: () => boolean;
}

const Hidden = ({ children, shown = () => true }: IProps) => {
    const { isAuthenticated } = useAuthStore();
    return (isAuthenticated && shown) ? <>{children}</> : null;
}

export default Hidden;