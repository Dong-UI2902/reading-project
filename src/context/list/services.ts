import Api from "../../config/Api";
import {isMobile} from "react-device-detect";

const getApi = () => {
    if(isMobile)
        return process.env.REACT_APP_MOBILE_BASE_URL

    return process.env.REACT_APP_BASE_URL
}

async function getData(url, page): Promise<string> {
    const response = await Api.get(getApi() + url, {params: {p: page}})

    return response.data
}

async function getView(url, id): Promise<string> {
    const response = await Api.get(getApi() + url + id)

    return response.data
}

async function getStoryByAuthor(url): Promise<string> {
    const response = await Api.get(getApi() + url)

    return response.data
}

export default {
    getData,
    getView,
    getStoryByAuthor,
}