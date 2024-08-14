import React from 'react';
import { Link } from 'react-router-dom';

interface ReturnLinkProps {
    url: string;
    text: string;
}

const ReturnLink: React.FC<ReturnLinkProps> = ({ url, text }) => {
    return (
        <div className="top__nav--buttons">
            <Link to={url} className="cursive">{`<< ${text}`}</Link>
        </div>
    );
}

export default ReturnLink;