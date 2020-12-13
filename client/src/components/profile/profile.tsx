import * as React from 'react';
import { useRef, useState, useCallback } from 'react';
import ProfilePic from '../profilePic/profilePic';
import useClickOutside from '../../hooks/useClickOutside';
import useEscape from '../../hooks/useEscape';
import ChevronUpIcon from '../icons/chevron-up';
import ChevronDownIcon from '../icons/chevron-down';
import styles from './profile.module.scss';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null!);

  const handleClose = useCallback(
    (ev) => {
      ev.preventDefault();
      setOpen((open) => !open);
    },
    [setOpen]
  );

  useClickOutside(detailsRef, () => setOpen(false));
  useEscape(() => setOpen(false));

  return (
    <div className={styles.profile}>
      <ProfilePic />
      <details className={styles.dropdown} open={open} ref={detailsRef}>
        <summary className={styles.summary} onClick={handleClose}>
          <span className={styles.summaryText}>Xanthe Neal</span>
          {!open ? (
            <ChevronUpIcon color="var(--heading-text)" />
          ) : (
            <ChevronDownIcon color="var(--heading-text)" />
          )}
        </summary>
        <ul className={styles.links}>
          <li className={styles.linkItem}>
            <Link to="/settings" className={styles.link}>
              Settings
            </Link>
          </li>
          <li className={styles.linkItem}>
            <Link to="/logout" className={styles.link}>
              Log out
            </Link>
          </li>
        </ul>
      </details>
    </div>
  );
};

export default Profile;
