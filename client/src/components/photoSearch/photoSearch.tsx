import * as React from 'react';
import Image from '../image/image';
import buttonStyles from '../../styles/button.module.scss';
import styles from './photoSearch.module.scss';

const PhotoSearch = () => {
  return (
    <details className={styles.photoSearch}>
      <summary className={styles.summary}>
        <div className={styles.summaryText}>Cover</div>
      </summary>
      <div>
        <h4>Photo Search</h4>
        <p>Search Unsplash for photos</p>
        <form>
          <input name="search" type="text" />
          <button className={buttonStyles.formBtn}></button>
        </form>
        <Image size={{ width: 50, height: 50 }} />
        <Image size={{ width: 50, height: 50 }} />
        <Image size={{ width: 50, height: 50 }} />
        <Image size={{ width: 50, height: 50 }} />
      </div>
    </details>
  );
};

export default PhotoSearch;
