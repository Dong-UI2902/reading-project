import React from 'react';
import {ItemProps} from "./type";

const SocialItem: React.FC<ItemProps> = ({links}) => (
    <>
        {links.map((link) => (
            <li key={link.id} className="nav-item">
                <a className="nav-link" target='_blank' href={link.to}>
                    <i className={`bi bi-${link.name}`}/>
                </a>
            </li>
        ))}
    </>
);

export default SocialItem;