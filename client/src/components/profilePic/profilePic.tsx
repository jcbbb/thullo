import * as React from 'react';
import styles from './profilePic.module.scss';

type IProps = {
  src?: string;
  alt?: string;
  size?: {
    width: string | number;
    height: string | number;
  };
};

const ProfilePic = ({ src, alt, size }: IProps) => {
  return (
    <div className={styles.profileContainer} style={{ ...size }}>
      {src ? (
        <img src={src} className={styles.profilePic} alt={alt} />
      ) : (
        <span className={styles.initials}>XN</span>
      )}
    </div>
  );
};

export default ProfilePic;
