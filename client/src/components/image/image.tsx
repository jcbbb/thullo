import * as React from 'react';
import styles from './image.module.scss';

type IProps = {
    size?: {
        width: string | number;
        height: string | number;
    };
    src?: string;
    alt?: string;
    [key: string]: any;
};

const Image = ({size = {width: 219, height: 130}, src, alt, ...rest}: IProps) => {
    return (
        <div
            className={styles.image}
            style={{...size, backgroundImage: `url(${src})`}}
            {...rest}
        ></div>
    );
};

export default Image;
