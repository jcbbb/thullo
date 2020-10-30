import * as React from 'react';
import styles from './profilePic.module.scss';

const ProfilePic = (src: string) => {
  return (
    <div className={styles.profileContainer} style={{ backgroundImage: `url(${src})` }}>
      <img src={src} className={styles.profilePic} alt="default" />
    </div>
  );
};

export default ProfilePic;
