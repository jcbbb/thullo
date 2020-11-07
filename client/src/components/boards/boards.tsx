import * as React from 'react';
import PlusIcon from '../icons/plus';
import styles from './boards.module.scss';
import buttonStyles from '../../styles/button.module.scss';

const Boards = () => {
  return (
    <div className={styles.boards}>
      <div className={styles.header}>
        <h2 className={styles.heading}>All boards</h2>
        <div>
          <button className={buttonStyles.formBtn}>
            <PlusIcon size={{ width: 18, height: 18 }} />
            <span className={styles.btnText}>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Boards;
