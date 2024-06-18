import { useState, useEffect } from 'react';

type FetchCallback<T> = () => Promise<T>;

const useFetch = <T>(callback: FetchCallback<T>) =>{
    const [pending, setPending] = useState<boolean>(true);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setPending(true);
            try {
                const result = await callback();
                setData(result);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setPending(false);
            }
        };

        fetchData();
    }, [callback]);

    return { pending, data, error };
}

export default useFetch;