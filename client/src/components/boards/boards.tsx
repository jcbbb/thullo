import * as React from 'react';
import useBackdrop from '../../hooks/useBackdrop'
import PlusIcon from '../icons/plus';
import AddBoard from '../addBoard/addBoard';
import Backdrop from '../backdrop/backdrop';
import styles from './boards.module.scss';
import buttonStyles from '../../styles/button.module.scss';
import useEscape from '../../hooks/useEscape';

const Boards = () => {
    const { isActive, toggle } = useBackdrop()
    useEscape(toggle)

    return (
        <>
            <Backdrop isActive={isActive} close={toggle}>
                <AddBoard toggle={toggle} />
            </Backdrop>
            <div className={styles.boards}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>All boards</h2>
                    <div>
                        <button className={buttonStyles.primary} onClick={toggle}>
                            <PlusIcon size={{ width: 18, height: 18 }} />
                            <span className={styles.btnText}>Add</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Boards;
