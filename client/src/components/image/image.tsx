import * as React from 'react';
import styles from './image.module.scss';

type IProps = {
  size?: {
    width: string | number;
    height: string | number;
  };
  src?: string;
  alt?: string;
};

const Image = ({ size = { width: 219, height: 130 }, src, alt, ...rest }: IProps) => {
  return (
    <div className={styles.imageContainer} style={{ ...size }} {...rest}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default Image;
