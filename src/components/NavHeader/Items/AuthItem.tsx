import React from 'react';
import NavItem from "../NavItem/NavItem";
import {ItemProps} from "./type";

const AuthItem: React.FC<ItemProps> = ({activeLinkId, links}) => {

    return (
        <>
            {links.map((link) => (
                <NavItem key={link.id} activeLink={link.id === activeLinkId}
                         href={link.to}>
                    {link.name}
                </NavItem>
            ))}
        </>
    );
}

export default AuthItem;