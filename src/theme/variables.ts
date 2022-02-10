import {baseColors, Colors} from "./types";

export const colors = (darkMode: boolean): Colors => ({
    ...baseColors,
    background: darkMode ? '#212529' : '#f8f9fa',
    text: darkMode ? '#fff' : '#212529',
    navLinks: {
        color: darkMode ? '#fff' : '#0000008c',
        hover: darkMode ? '#ffffff80' : '#212529b5',
        active: darkMode ? '#fff' : '#212529',
    },
    card: {
        background: darkMode ? '#1f1f1f' : '#fff',
    },
})