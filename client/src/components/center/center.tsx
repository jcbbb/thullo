import React, { FunctionComponent } from 'react';
import styles from './center.module.css';

const Center: FunctionComponent = ({ children }) => {
    return <div className={styles.center}>{children}</div>;
};

export default Center;
