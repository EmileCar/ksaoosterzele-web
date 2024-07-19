import { useState } from 'react';

type ValueMethods = {
    notEmpty: () => boolean;
};

type ExtendedValues<T> = T & ValueMethods;

const useForm = <T extends Record<string, any>>(initialValues: T, submitFunction: (request: T, method: "POST" | "PUT") => Promise<void>) => {
    const isNotEmpty = (values: T) => {
        return Object.values(values).some(value => value !== null && value !== undefined && value !== '');
    };

    const [values, setValues] = useState<T>(initialValues);
    const extendedValues: ExtendedValues<T> = {
        ...values,
        notEmpty: () => isNotEmpty(values),
    };

    const [errorStates, setErrorStates] = useState<any>([]);
    const [isPending, setIsPending] = useState<boolean>(false);

    const handleValueChange = (e: any) => {
        const { name, value } = e.target ? e.target : e;
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
    };

    const setErrors = (errors: any | null) => {
        setErrorStates(errors || []);
    };

    const handleSubmitForm = async (method: 'POST' | 'PUT', onSuccess?: () => void, onFailure?: (errors: any) => void) => {
        setIsPending(true);
        setErrors(null);
        try {
            await submitFunction(values, method);
            setIsPending(false);
            if (onSuccess) {
                onSuccess();
            }
        } catch (errors: any) {
            setTimeout(() => {
                let errorfields = errors.errorFields ?? {};
                errorfields.general = errors.message;
                setErrors(errorfields);
                console.log(errorfields);
                setIsPending(false);
                if (onFailure) {
                    onFailure(errors);
                }
            }, 800);
        }
    };

    return {
        values: extendedValues,
        errorStates,
        handleValueChange,
        setErrors,
        setValues,
        changeValue,
        handleSubmitForm,
        submitPending: isPending,
    };
};

export default useForm;