import * as React from 'react';
import { useEffect } from 'react';
import useBackdrop from '../../hooks/useBackdrop';
import PlusIcon from '../icons/plus';
import AddBoard from '../addBoard/addBoard';
import BoardCard from '../boardCard/boardCard';
import Backdrop from '../backdrop/backdrop';
import styles from './boards.module.scss';
import buttonStyles from '../../styles/button.module.scss';
import useEscape from '../../hooks/useEscape';
import useAsync from '../../hooks/useAsync';
import useMounted from '../../hooks/useMounted';
import { useAuthStore } from '../../context/authContext';
import api from '../../api';

const Boards = () => {
  const { isActive, toggle, dismiss } = useBackdrop();
  const { isAuthenticated } = useAuthStore();
  const isMounted = useMounted();
  useEscape(dismiss);
  const [getUserBoards, { data }] = useAsync(api.board.getAllUserBoards);

  useEffect(() => {
    if (isMounted) {
      getUserBoards();
    }
  }, [getUserBoards, isMounted, isAuthenticated]);

  return (
    <>
      <Backdrop isActive={isActive} close={toggle}>
        <AddBoard toggle={toggle} />
      </Backdrop>
      <div className={styles.boardsContainer}>
        <div className={styles.header}>
          <h2 className={styles.heading}>All boards</h2>
          <div>
            <button className={buttonStyles.primary} onClick={toggle}>
              <PlusIcon size={{ width: 18, height: 18 }} />
              <span className={styles.btnText}>Add</span>
            </button>
          </div>
        </div>
        <div className={styles.boards}>
          {data?.map((board: any, index: any) => (
            <BoardCard board={board} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Boards;
