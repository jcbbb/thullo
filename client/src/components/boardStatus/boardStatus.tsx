import * as React from 'react';
import { useState, useCallback, useEffect, useRef } from 'react';
import Globe from '../icons/globe';
import Lock from '../icons/lock';
import styles from './boardStatus.module.scss';

const BoardStatus = () => {
  const detailsRef = useRef<HTMLDetailsElement>(null!);
  const [open, setOpen] = useState(false);

  const handleEscape = useCallback(
    (ev) => {
      if (ev.keyCode === 27 && open) {
        setOpen(false);
      }
    },
    [open, setOpen]
  );

  const handleOutside = useCallback(
    (ev) => {
      if (!detailsRef?.current.contains(ev.target as Node)) {
        setOpen(false);
      }
    },
    [setOpen]
  );

  const handleClick = useCallback(
    (ev: React.MouseEvent<HTMLElement>) => {
      ev.preventDefault();
      setOpen((open) => !open);
    },
    [setOpen]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  useEffect(() => {
    document.addEventListener('click', handleOutside);
    return () => document.removeEventListener('click', handleOutside);
  }, [handleOutside]);

  return (
    <details className={styles.boardStatus} open={open} ref={detailsRef}>
      <summary className={styles.summary} onClick={handleClick}>
        <Lock size={{ width: 14, height: 14 }} color="var(--gray-3)" />
        <span className={styles.summaryText}>Private</span>
      </summary>
      <div className={styles.dropdown}>
        <h4 className={styles.dropdownHeading}>Visibility</h4>
        <p className={styles.dropdownDetails}>Choose who can view this board</p>
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
