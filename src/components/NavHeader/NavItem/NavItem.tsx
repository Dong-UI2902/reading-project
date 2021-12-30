import React from 'react';
import {NavItemProps} from "./type";
import {Link} from "react-router-dom";

const NavItem: React.FC<NavItemProps> = ({activeLink, href, children}) => (
    <li className="nav-item">
        <Link className={`nav-link ${(activeLink && 'active')}`} to={href}>
            {children}
        </Link>
    </li>
);

export default NavItem;