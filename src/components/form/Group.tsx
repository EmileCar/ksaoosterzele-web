import React from 'react';
import { useFormContext } from '../../contexts/FormContext';

interface GroupProps {
    customClassName?: string;
    children: any;
}

const Group: React.FC<GroupProps> = ({ customClassName = "", children }) => {
    useFormContext();

    return (
        <div className={`form-group ${customClassName}`}>
            {children}
        </div>
    );
}

export default Group;
