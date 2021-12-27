export type NavLinks = {
    color: string
    hover: string
    active: string
}

export type Card = {
    background: string
}

export const baseColors = {
    background: '#fafafa',
    primary: '#0d6efd',
    primaryBright: '#53DEE9',
    primaryDark: '#0098A1',
    secondary: '#6c757d',
    success: '#198754',
    warning: '#ffc107',
    info: '#0dcaf0',
    danger: '#dc3545',
    muted: '#6c757d',
    text: '#212529',
}

export type Colors = {
    background: string
    primary: string
    primaryBright: string
    primaryDark: string
    secondary: string
    success: string
    warning: string
    info: string
    danger: string
    muted: string
    text: string
    navLinks: NavLinks
    card: Card
}

export interface Theme {
    isDark: boolean
    colors: Colors
}