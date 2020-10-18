import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../icons/thullo";
import ArrowUp from "../icons/arrow-up";
import ArrowDown from "../icons/arrow-down";
import Application from "../icons/application";
import styles from "./header.module.scss";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <Logo viewBox="0 0 98 29" size={{ width: 96, height: 54 }} />
        <div className={styles.headerLeftInner}>
          <div className={styles.boardName}>
            <h2 className={styles.boardNameText}>Devchallenges Board</h2>
          </div>
          <span className={styles.seperator}></span>
          <Link className={styles.boards} to="/">
            <Application
              size={{ width: 14, height: 14 }}
              color="var(--gray-3)"
            />
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
          />
          <button className={styles.formBtn}>Search</button>
        </form>
        <div className={styles.profile}>
          <div className={styles.profilePic}></div>
          <details className={styles.dropdown}>
            <summary
              className={styles.summary}
              onClick={() => setOpen((open) => !open)}
            >
              <span className={styles.summaryText}>Xanthe Neal</span>
              {!open ? (
                <ArrowUp color="var(--heading-text)" />
              ) : (
                <ArrowDown color="var(--heading-text)" />
              )}
            </summary>
            <ul className={styles.links}>
              <li className={styles.linkItem}>
                <a href="#" className={styles.link}>
                  Settings
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="#" className={styles.link}>
                  Log out
                </a>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
};

export default Header;
