import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../profile/profile'
import Hidden from '../hidden/hidden'
import LogoIcon from '../icons/thullo';
import ApplicationIcon from '../icons/application';
import styles from './header.module.scss';

const Header = () => {
    const [value, setValue] = useState('');

    return (
        <div className={styles.header}>
            <div className={styles.headerLeft}>
                <Link to="/">
                    <LogoIcon viewBox="0 0 98 29" size={{ width: 96, height: 54 }} />
                </Link>
                <Hidden>
                    <div className={styles.headerLeftInner}>
                        <div className={styles.boardName}>
                            <h2 className={styles.boardNameText}>Devchallenges Board</h2>
                        </div>
                        <span className={styles.seperator}></span>
                        <Link className={styles.boards} to="/">
                            <ApplicationIcon size={{ width: 14, height: 14 }} color="var(--gray-3)" />
                            <span className={styles.boardsText}>All board</span>
                        </Link>
                    </div>
                </Hidden>
            </div>
            <Hidden>
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
                        <button className={styles.formBtn} style={{ width: 'fit-content' }} disabled={!value}>
                            Search
                        </button>
                    </form>
                    <Profile />
                </div>
            </Hidden>
        </div>
    );
};

export default Header;
