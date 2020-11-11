import {useState, useEffect} from 'react';
import useDebounce from './useDebounce'

const useLocalStorage = <T>(initialValue: T, key: string) => {
    const [value, setValue] = useState(() => {
        const savedValue = localStorage.getItem(key);

        return savedValue !== null
            ? JSON.parse(savedValue)
            : initialValue
    })

    const debouncedValue = useDebounce(value, 1000);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(debouncedValue))
    }, [key, debouncedValue])

    return [value, setValue]
}

export default useLocalStorage
