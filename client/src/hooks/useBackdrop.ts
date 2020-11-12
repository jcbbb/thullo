import { useState } from 'react';


type IBackdropHook = {
    isActive: boolean;
    toggle: () => void;
}

const useBackdrop = (): IBackdropHook => {
    const [isActive, setIsActive] = useState(false);
    const toggle = () => setIsActive((prev) => !prev);

    return { isActive, toggle }
}

export default useBackdrop;