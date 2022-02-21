import {cssTransition} from "react-toastify";

export const NAME_STORE = 'Namitoys'
export const TOAST_MESSAGE = {
    greeting: (attribute) => <div>👋👋 Welcome to {attribute}!</div>,
    success: (attribute) => `${attribute} thành công 👌`,
    warn: (attribute) => attribute,
    error: (attribute) => `${attribute} không thành công 🤯`,
}

export const fastfade = cssTransition({
    enter: "animate__fadeinfast",
    exit: "animate__fadeoutfast"
});

export const PRODUCT = {
    "id": '',
    "image": [],
    "title": "",
    "producer": "",
    "madeof": "",
    "type": "",
    "detail": "",
    "userfor": "Nam",
    "numberofprod": "20",
    "price": "",
    "sale": ""
}

export const PATH = '/PHP/auth/';