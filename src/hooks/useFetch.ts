import { useState, useEffect, useCallback } from 'react';

type FetchCallback<T> = () => Promise<T>;

const useFetch = <T>(callback: FetchCallback<T>) => {
    const [pending, setPending] = useState<boolean>(true);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setPending(true);
        try {
            const result = await callback();
            setData(result);
            setError(null);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setPending(false);
        }
    }, [callback]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { pending, data, error, refetch: fetchData };
}

export default useFetch;