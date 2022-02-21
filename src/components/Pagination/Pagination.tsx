import React from 'react';
import {Link} from "react-router-dom";
import {useListStory} from "../../context/list/Provider";

const Pagination = ({id, page}) => {
    const {nav} = useListStory()

    const getTo = () => {
        if (id === 'new') {
            return `/story`
        }

        return `/tag/${id}`
    }

    return (
        <div>
            {nav.length > 0 && (
                <ul className='pagination justify-content-center mt-4'>
                    <li className="page-item">
                        <Link className="page-link"
                              to={`${getTo()}/1`}
                              tabIndex={-1} aria-disabled="true">«
                        </Link>
                    </li>
                    {nav.map((item, index) => {
                        if (index < nav.length - 1)
                            return <li key={index} className={`page-item ${page === item && 'active'}`}>
                                <Link className="page-link" to={`${getTo()}/${item}`} replace>
                                    {item}
                                </Link>
                            </li>

                        return null
                    })}
                    <li className="page-item">
                        <Link className="page-link" to={`${getTo()}/${nav[nav.length - 1]}`} tabIndex={-1}
                              aria-disabled="true">»</Link>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Pagination;