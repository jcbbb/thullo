import * as React from 'react'
import {useEffect} from 'react';
import BoardStatus from '../boardStatus/boardStatus'
import PhotoSearch from '../photoSearch/photoSearch'
import Spacer from '../spacer'
import useAsync from '../../hooks/useAsync';
import useMounted from '../../hooks/useMounted';
import CloseIcon from '../icons/close'
import api from '../../api';
import cn from 'classnames';
import styles from './addBoard.module.scss'
import buttonStyles from '../../styles/button.module.scss'

const AddBoard = () => {
    const isMounted = useMounted()
    const [getRandom, {data}] = useAsync(api.unsplash.getRandom);

    useEffect(() => {
        if (isMounted) {
            getRandom()
        }
    }, [getRandom, isMounted])

    return <div className={styles.container}>
        <div className={styles.cover}>
            <div className={styles.image} style={{backgroundImage: `url(${data?.urls.small})`}}></div>
            <button className={cn(buttonStyles.formBtn, styles.btn)}>
                <CloseIcon size={{width: 18, height: 18}} />
            </button>
            <form className={styles.form}>
                <input className={styles.input} type="text" placeholder="Add board title" />
                <div className={styles.settings}>
                    <Spacer left="0.5rem" right="0.5rem" top="1.2rem" bottom="1.2rem">
                        <BoardStatus />
                    </Spacer>
                    <Spacer left="0.5rem" right="0.5rem" top="1.2rem" bottom="1.2rem">
                        <PhotoSearch />
                    </Spacer>
                </div>
            </form>
        </div>
    </div>
}

export default AddBoard;
