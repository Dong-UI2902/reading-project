import {Links} from "./type";

const AUTH_TYPE = 'auth'

const APP_TYPE = 'app'

const SOCIAL_TYPE = 'social'

export const LINKS: Links = [
    {
        id: 1,
        name: "Trang chủ",
        to: "/",
        type: APP_TYPE,
    },
    // {
    //     id: 2,
    //     name: "About",
    //     to: "/about",
    //     type: APP_TYPE,
    // },
    {
        id: 3,
        name: "Cửa hàng",
        to: '/store',
        type: APP_TYPE,
    },
    {
        id: 4,
        name: "Login",
        to: '/login',
        type: AUTH_TYPE,
    },
    // {
    //     id: 5,
    //     name: "Register",
    //     to: '/register',
    //     type: AUTH_TYPE,
    // },
    {
        id: 6,
        name: "discord",
        to: 'https://discord.gg/aucq647J',
        type: SOCIAL_TYPE,
    },
    {
        id: 7,
        name: "facebook",
        to: 'https://www.facebook.com/namitoyshop',
        type: SOCIAL_TYPE,
    },
    {
        id: 8,
        name: "instagram",
        to: '#',
        type: SOCIAL_TYPE,
    },
    {
        id: 9,
        name: "Hai-Ten",
        to: '/story',
        type: APP_TYPE,
    },
    {
        id: 10,
        name: "Thể loại",
        to: '/tag',
        type: APP_TYPE,
    },
    {
        id: 11,
        name: "Lịch sử",
        to: '/history',
        type: APP_TYPE,
    },
    {
        id: 12,
        name: "Theo dõi",
        to: '/follow',
        type: APP_TYPE,
    },
]

export const AuthLinks = () => LINKS.filter(link => link.type === AUTH_TYPE)

export const AppLinks = () => LINKS.filter(link => link.type === APP_TYPE)

export const SocialLinks = () => LINKS.filter(link => link.type === SOCIAL_TYPE)