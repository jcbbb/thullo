import * as React from 'react';
import styles from './indeterminate.module.scss';

const Indeterminate = () => {
  return <progress className={styles.indeterminateProgress}></progress>;
};

export default Indeterminate;
