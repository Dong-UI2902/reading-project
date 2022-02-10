import React from 'react';
import {Link, useParams} from "react-router-dom";

const Li = ({props, children}) => {
    const params = useParams();
    const page = Number(params.page);

    return (
        <li className={`page-item ${props} p-1`}>
            <Link className="page-link" to={`/store/${children !== 'Previous' ? children : page - 1}`}>
                {children}
            </Link>
        </li>
    );
};

export default Li;