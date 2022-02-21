import {AuthCredential, User} from './types'
import Api from "../../config/Api";
import Cookies from 'js-cookie'
import {PATH} from "../constant/constants";

const getCookie = () => {
    const cookie = Cookies.get('jwt')
    if (cookie) return Promise.resolve(cookie);
    return null;
}

async function login(credential: AuthCredential): Promise<User> {
    const response = await Api.post<User>(`${PATH}login.php`, credential)

    return response.data
}

async function logout(): Promise<unknown> {
    const response = await Api.post(`${PATH}logout.php`)

    return response.data
}

async function getCurrentUser(){
    const response = await Api.get<User>(`${PATH}me.php`)
    return response.data
}

export default {
    getCurrentUser,
    login,
    logout,
}