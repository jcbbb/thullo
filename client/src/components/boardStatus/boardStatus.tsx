import * as React from 'react';
import Globe from '../icons/globe';
import Lock from '../icons/lock';
import styles from './boardStatus.module.scss';

const BoardStatus = () => {
  return (
    <details className={styles.boardStatus}>
      <summary className={styles.summary}>
        <Lock size={{ width: 14, height: 14 }} color="var(--gray-3)" />
        <span className={styles.summaryText}>Private</span>
      </summary>
      <div className={styles.dropdown}>
        <h4 className={styles.dropdownHeading}>Visibility</h4>
        <p className={styles.dropdownDetails}>Choose who can this board</p>
        <ul className={styles.options}>
          <li className={styles.option}>
            <div className={styles.optionHeading}>
              <Globe size={{ width: 14, height: 14 }} color="var(--gray-2)" />
              <span className={styles.optionHeadingText}>Public</span>
            </div>
            <p className={styles.optionDetails}>Anyone on the internet can see this.</p>
          </li>
          <li className={styles.option}>
            <div className={styles.optionHeading}>
              <Lock size={{ width: 14, height: 14 }} color="var(--gray-2)" />
              <span className={styles.optionHeadingText}>Private</span>
            </div>
            <p className={styles.optionDetails}>Only board members can see this.</p>
          </li>
        </ul>
      </div>
    </details>
  );
};

export default BoardStatus;
