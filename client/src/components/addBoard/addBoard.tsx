import * as React from 'react'
import { useEffect, useState, useCallback } from 'react';
import BoardStatus from '../boardStatus/boardStatus'
import PhotoSearch from '../photoSearch/photoSearch'
import Spacer from '../spacer'
import useAsync from '../../hooks/useAsync';
import useMounted from '../../hooks/useMounted';
import CloseIcon from '../icons/close'
import PlusIcon from '../icons/plus';
import api from '../../api';
import cn from 'classnames';
import styles from './addBoard.module.scss'
import buttonStyles from '../../styles/button.module.scss'

const initialFormValues = {
    cover_photo_url: '',
    title: '',
    status: 'Public'
}

type IProps = {
    toggle: () => void;
}

const AddBoard = ({ toggle }: IProps) => {
    const isMounted = useMounted()
    const [getRandom, { data }, reset] = useAsync(api.unsplash.getRandom);
    const [createBoard, submitState] = useAsync(api.board.create)

    useEffect(() => {
        if (isMounted) {
            getRandom()
        }
    }, [getRandom, isMounted])

    const [formValues, setFormValues] = useState(initialFormValues)

    const handleStatus = useCallback((status: string) => {
        setFormValues((prevState) => ({
            ...prevState,
            status
        }))
    }, [setFormValues])

    const handleCover = useCallback((cover_photo_url: string) => {
        setFormValues((prevState) => ({ ...prevState, cover_photo_url }))
    }, [setFormValues])

    const handleInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = ev.target;
        setFormValues((prevState) => ({
            ...prevState,
            title: value
        }))
    }

    const clear = useCallback(() => {
        setFormValues((prevState) => ({ ...prevState, cover_photo_url: '' }))
        reset();
    }, [reset, setFormValues])

    const onSubmit = useCallback((ev) => {
        ev.preventDefault();
        createBoard(formValues)
    }, [formValues, createBoard])

    return (
        <div className={styles.container}>
            <div className={styles.cover}>
                <div style={formValues.cover_photo_url || data ? { backgroundImage: `url(${formValues.cover_photo_url || data?.urls.small})` } : void 0} className={styles.image}></div>
                {(formValues.cover_photo_url || data) && (
                    <button className={cn(buttonStyles.primary, styles.btn)} onClick={clear}>
                        <CloseIcon size={{ width: 18, height: 18 }} />
                    </button>
                )}
                <Spacer top="0.6rem" bottom="0" left="0" right="0">
                    <form className={styles.form} onSubmit={onSubmit}>
                        <input name="title" className={styles.input} value={formValues.title} onChange={handleInput} type="text" placeholder="Add board title" />
                    </form>
                </Spacer>
                <div className={styles.settings}>
                    <Spacer left="0.5rem" right="0.5rem" top="1.2rem" bottom="1.2rem">
                        <BoardStatus status={formValues.status} setStatus={handleStatus} />
                    </Spacer>
                    <Spacer left="0.5rem" right="0.5rem" top="1.2rem" bottom="1.2rem">
                        <PhotoSearch setCover={handleCover} />
                    </Spacer>
                </div>
                <div className={styles.actions}>
                    <Spacer top="0" bottom="0" right="0.8em" width="auto">
                        <button className={buttonStyles.secondary} onClick={toggle}>Cancel</button>
                    </Spacer>
                    <button className={buttonStyles.primary} onClick={onSubmit} disabled={!formValues.title || submitState?.isLoading} >
                        <PlusIcon size={{ width: 18, height: 18 }} />
                        <span className={styles.btnText}>Create</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddBoard;
