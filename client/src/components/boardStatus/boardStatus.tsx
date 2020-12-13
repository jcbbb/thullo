import * as React from 'react';
import { useState, useRef, useMemo } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import useEscape from '../../hooks/useEscape';
import Globe from '../icons/globe';
import Lock from '../icons/lock';
import styles from './boardStatus.module.scss';

type IProps = {
  status: string;
  setStatus: (status: string) => void;
};

const BoardStatus = ({ status, setStatus }: IProps) => {
  const [open, setOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null!);

  const isPrivate = useMemo(() => status === 'Private', [status]);

  useClickOutside(detailsRef, () => setOpen(false));
  useEscape(() => setOpen(false));

  const handleClose = (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    setOpen((open) => !open);
  };

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    const { value } = (ev.target as HTMLLIElement).dataset;
    const key = ev.key || ev.keyCode;
    if (key === 'Enter' || key === 13) {
      setStatus(value!);
    }
  };

  const handleStatusChange = (ev: React.MouseEvent<HTMLLIElement>) =>
    setStatus((ev.target as HTMLLIElement).dataset.value!);

  return (
    <details className={styles.boardStatus} open={open} ref={detailsRef}>
      <summary className={styles.summary} onClick={handleClose}>
        {isPrivate ? (
          <Lock size={{ width: 14, height: 14 }} color="var(--gray-3)" />
        ) : (
          <Globe size={{ width: 14, height: 14 }} color="var(--gray-2)" />
        )}
        <span className={styles.summaryText}>{status}</span>
      </summary>
      <div className={styles.dropdown}>
        <h4 className={styles.dropdownHeading}>Visibility</h4>
        <p className={styles.dropdownDetails}>Choose who can view this board</p>
        <ul className={styles.options}>
          <li
            className={styles.option}
            data-value="Public"
            onKeyDown={handleKeyDown}
            onClick={handleStatusChange}
            tabIndex={0}
          >
            <div className={styles.optionHeading}>
              <Globe size={{ width: 14, height: 14 }} color="var(--gray-2)" />
              <span className={styles.optionHeadingText}>Public</span>
            </div>
            <p className={styles.optionDetails}>Anyone on the internet can see this.</p>
          </li>
          <li
            onKeyDown={handleKeyDown}
            className={styles.option}
            data-value="Private"
            onClick={handleStatusChange}
            tabIndex={0}
          >
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

export default React.memo(BoardStatus);
