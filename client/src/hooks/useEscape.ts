import { useEffect, useRef } from 'react';

const useEscape = (callback: Function) => {
    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    useEffect(() => {
        const handler = (ev: KeyboardEvent) => {
            const key = ev.key || ev.keyCode;
            if (key === 'Escape' || key === 'Esc' || key === 27) {
                callbackRef.current(ev)
            }
        }

        document.addEventListener('keyup', handler)
        return () => document.removeEventListener('keyup', handler)

    }, [callbackRef])
}
export default useEscape; 