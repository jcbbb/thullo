import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Image from '../image/image';
import Indeterminate from '../indeterminate/indeterminate';
import Spacer from '../spacer';
import SearchIcon from '../icons/search';
import ImageIcon from '../icons/image';
import styles from './photoSearch.module.scss';
import useDebounce from '../../hooks/useDebounce';
import useAsync from '../../hooks/useAsync';
import useMounted from '../../hooks/useMounted';
import api from '../../api';

type IUrl = 'raw' | 'regular' | 'full' | 'thumb' | 'small';

type IResult = {
  id: string;
  created_at: Date;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: false;
  description: string;
  urls: {
    [key in IUrl]: string;
  };
};

const PhotoSearch = () => {
  const [query, setQuery] = useState('');
  const [search, { data, isLoading }] = useAsync(api.unsplash.search);
  const isMounted = useMounted();
  const debouncedQuery = useDebounce(query);

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    setQuery(value);
  };

  const onSubmit = useCallback(
    (ev: React.FormEvent<HTMLFormElement>) => {
      ev.preventDefault();
      if (isMounted) {
        search(debouncedQuery);
      }
    },
    [debouncedQuery, isMounted, search]
  );

  useEffect(() => {
    if (isMounted && debouncedQuery) {
      search(debouncedQuery);
    }
  }, [debouncedQuery, isMounted, search]);

  return (
    <details className={styles.photoSearch}>
      <summary className={styles.summary}>
        <ImageIcon size={{ width: 16, height: 16 }} color="var(--gray-3)" />
        <span className={styles.summaryText}>Cover</span>
      </summary>
      <div className={styles.dropdown}>
        {isLoading && <Indeterminate />}
        <h4 className={styles.dropdownHeading}>Photo Search</h4>
        <p className={styles.dropdownDetails}>Search Unsplash for photos</p>
        <Spacer bottom="1.25em" top="0.75em" left="0" right="0">
          <form className={styles.form} onSubmit={onSubmit}>
            <input
              onChange={onChange}
              className={styles.input}
              name="search"
              type="text"
              placeholder="Keywords..."
            />
            <button className={styles.formBtn}>
              <SearchIcon size={{ width: 18, height: 18 }} />
            </button>
          </form>
        </Spacer>
        <div className={styles.images}>
          {data?.results.map((result: IResult) => (
            <Spacer top="0.4em" bottom="0.4em" left="0" right="0">
              <Image size={{ width: 50, height: 50 }} src={result.urls.thumb} />
            </Spacer>
          ))}
        </div>
      </div>
    </details>
  );
};

export default PhotoSearch;
