import {useState, useEffect} from 'react';

export default function useLocalStorageState(key, defaultValue) {
    // https://dev.to/selbekk/persisting-your-react-state-in-9-lines-of-code-9go
    
    const [state, setState] = useState(() => JSON.parse(localStorage.getItem(key)) || defaultValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}