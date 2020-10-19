import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../icons/thullo';
import ArrowUp from '../icons/arrow-up';
import ArrowDown from '../icons/arrow-down';
import Application from '../icons/application';
import styles from './header.module.scss';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <Link to="/">
          <Logo viewBox="0 0 98 29" size={{ width: 96, height: 54 }} />
        </Link>
        <div className={styles.headerLeftInner}>
          <div className={styles.boardName}>
            <h2 className={styles.boardNameText}>Devchallenges Board</h2>
          </div>
          <span className={styles.seperator}></span>
          <Link className={styles.boards} to="/">
            <Application size={{ width: 14, height: 14 }} color="var(--gray-3)" />
            <span className={styles.boardsText}>All board</span>
          </Link>
        </div>
      </div>
      <div className={styles.headerRight}>
        <form className={styles.form}>
          <input
            className={styles.input}
            name="search"
            type="text"
            placeholder="Keyword"
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
          />
          <button className={styles.formBtn} disabled={!value}>
            Search
          </button>
        </form>
        <div className={styles.profile}>
          <div className={styles.profilePic}></div>
          <details className={styles.dropdown}>
            <summary className={styles.summary} onClick={() => setOpen((open) => !open)}>
              <span className={styles.summaryText}>Xanthe Neal</span>
              {!open ? (
                <ArrowUp color="var(--heading-text)" />
              ) : (
                <ArrowDown color="var(--heading-text)" />
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
      </div>
    </div>
  );
};

export default Header;
