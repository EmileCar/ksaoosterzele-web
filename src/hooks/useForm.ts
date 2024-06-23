import { useState } from 'react';

type ValueMethods = {
    notEmpty: () => boolean;
};

type ExtendedValues<T> = T & ValueMethods;

const useForm = <T extends Record<string, any>>(initialValues: T) => {
    const isNotEmpty = (values: T) => {
        return Object.values(values).some(value => value !== null && value !== undefined && value !== '');
    };

    const [values, setValues] = useState<T>(initialValues);
    const extendedValues: ExtendedValues<T> = {
        ...values,
        notEmpty: () => isNotEmpty(values),
    };
    
    const [errorStates, setErrorStates] = useState<any>([]);

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement >) => {
        const { name, value } = e.target;
        setValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        setErrorStates((prevErrors: any) => ({
            ...prevErrors,
            [`${name}Error`]: '',        
        }));
    };

    const changeValue = (name: string, value: any) => {
        setValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        setErrorStates((prevErrors: any) => ({
            ...prevErrors,
            [`${name}Error`]: '',
        }));
    }

    const setErrors = (errors: any | null) => {
        setErrorStates(errors || []);
    };

    return {
        values: extendedValues,
        errorStates,
        handleValueChange,
        setErrors,
        setValues,
        setErrorStates,
        changeValue,
    };
};

export default useForm;