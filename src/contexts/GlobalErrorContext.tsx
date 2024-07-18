import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';

interface GlobalErrorContextProps {
    setError: (error: string) => void;
    GlobalError: React.FC;
}

export const GlobalErrorContext = createContext<GlobalErrorContextProps>({
    setError: () => {},
    GlobalError: () => null,
});

export const GlobalErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [errorLines, setErrorLines] = useState<string[]>([]);

    const deleteErrorLine = useCallback((index: number) => {
        setErrorLines((prevLines) => prevLines.filter((_, i) => i !== index));
    }, []);

    const setError = useCallback((error: string) => {
        setErrorLines((prevLines) => [...prevLines, error]);
    }, []);

    const GlobalError = useMemo(() => {
        return () => {
            if (errorLines.length === 0) {
                return null;
            }

            return (
                <div>
                    {errorLines.map((error, index) => (
                        <div key={index}>
                            <span className='error'>{error}</span>
                            <span className='error delete pi pi-times' onClick={() => deleteErrorLine(index)}></span>
                        </div>
                    ))}
                </div>
            );
        };
    }, [errorLines, deleteErrorLine]);

    return (
        <GlobalErrorContext.Provider value={{ setError, GlobalError }}>
            {children}
        </GlobalErrorContext.Provider>
    );
};

export const useGlobalErrorContext = (): GlobalErrorContextProps => {
    return useContext(GlobalErrorContext);
};
