import {useRef, useEffect} from 'react';

const useClickOutside = (elRef: React.RefObject<any>, callback: Function): void => {
    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    useEffect(() => {
        const handler = (ev: MouseEvent | KeyboardEvent) => {
            if (!elRef?.current.contains(ev.target as Node)) {
                callbackRef.current(ev)
            }
            if ('keyCode' in ev && ev.keyCode === 27) {
                callbackRef.current(ev);
            }
        }

        document.addEventListener('click', handler);
        document.addEventListener('keyup', handler)
        return () => {
            document.removeEventListener('click', handler)
            document.removeEventListener('keyup', handler)
        }
    }, [elRef, callbackRef])
}

export default useClickOutside
