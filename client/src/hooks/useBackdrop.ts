import { useState } from 'react';


type IBackdropHook = {
    isActive: boolean;
    toggle: () => void;
    dismiss: () => void;
}

const useBackdrop = (): IBackdropHook => {
    const [isActive, setIsActive] = useState(false);
    const toggle = () => setIsActive((prev) => !prev);
    const dismiss = () => setIsActive(false)

    return { isActive, toggle, dismiss }
}

export default useBackdrop;