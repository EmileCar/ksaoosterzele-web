import React from 'react';
import { useFormContext } from '../../contexts/FormContext';
import { classNames } from '../../utils/classNameUtil';

interface GroupProps {
    customClassName?: string;
    children: any;
}

const Group: React.FC<GroupProps> = ({ customClassName = "", children }) => {
    useFormContext();

    return (
        <div className={classNames('form-group', customClassName)}>
            {children}
        </div>
    );
}

export default Group;
