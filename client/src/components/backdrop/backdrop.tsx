import * as React from 'react';
import ReactDOM from 'react-dom';
import styles from './backdrop.module.scss'

type IProps = {
    isActive: boolean;
    close: () => void;
    children: React.ReactNode;
}

const Backdrop: React.FC<IProps> = ({ children, isActive, close }) => {
    const onClose = React.useCallback((ev) => {
        if (ev.target == ev.currentTarget) close()
    }, [close])

    const backdrop = (
        <div className={styles.backdrop} onClick={onClose}>{children}</div>
    )
    return isActive ? ReactDOM.createPortal(backdrop, document.body) : null;
}

export default Backdrop;
