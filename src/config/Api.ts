import axios from "axios";
import {isMobile} from "react-device-detect";

const getApi = () => {
    if(isMobile)
        return process.env.REACT_APP_MOBILE_BASE_URL

    return process.env.REACT_APP_BASE_URL
}
export const axiosClient = axios.create({
    baseURL: getApi(),
    // withCredentials: true,
    // headers: {
    //     'Access-Control-Allow-Origin': '*'
    // }
})

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error.response.data.errors),
)

export default axiosClient
