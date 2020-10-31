import * as React from 'react';
import styles from './profilePic.module.scss';

type IProps = {
    src?: string;
    alt?: string;
}

const ProfilePic = ({src, alt}: IProps) => {
    return (
        <div className={styles.profileContainer}>
            {src ? (
                <img src={src} className={styles.profilePic} alt={alt} />

            ) : (

                    <span className={styles.initials}>XN</span>
                )}
        </div>
    );
};

export default ProfilePic;
