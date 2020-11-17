import { useRef, useEffect } from 'react';

const useClickOutside = (elRef: React.RefObject<any>, callback: Function): void => {
    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    useEffect(() => {
        const handler = (ev: MouseEvent) => {
            if (!elRef?.current?.contains(ev.target)) {
                callbackRef.current(ev)
            }
        }
        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler)
    }, [elRef, callbackRef])
}

export default useClickOutside
