import React from 'react';
import NavItem from "../NavItem/NavItem";
import {ItemProps} from "./type";

const SocialItem: React.FC<ItemProps> = ({links}) => (
    <>
        {links.map((link) => (
            <NavItem key={link.id} activeLink={false}
                     href={link.to}>
                <i className={`bi bi-${link.name}`}/>
            </NavItem>
        ))}
    </>
);

export default SocialItem;