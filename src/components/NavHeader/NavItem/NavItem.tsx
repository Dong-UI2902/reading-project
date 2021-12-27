import React from 'react';
import {NavItemProps} from "./type";

const NavItem: React.FC<NavItemProps> = ({activeLink, href, children}) => (
    <li className="nav-item">
        <a className={`nav-link ${(activeLink && 'active')}`} href={href}>
            {children}
        </a>
    </li>
);

export default NavItem;