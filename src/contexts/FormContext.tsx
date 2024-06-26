import React, { createContext, useContext } from 'react';

const FormContext = createContext<boolean | null>(null);

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (context === null) {
        throw new Error('Group component must be used within a Form component');
    }
    return context;
};

export default FormContext;