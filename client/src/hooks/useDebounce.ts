import {useState, useEffect} from 'react';

const useDebounce = <T>(value: T, delay: number = 500): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (value) {
                setDebouncedValue(value);
            }
        }, delay);

        return () => clearTimeout(timeout);
    }, [delay, value]);

    return debouncedValue;
};

export default useDebounce;
