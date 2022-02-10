import Api from "../../config/Api";

async function getData(url, page): Promise<string> {
    const response = await Api.get(url, {params: {p: page}})

    return response.data
}

async function getView(url, id): Promise<string> {
    const response = await Api.get(url + id)

    return response.data
}

export default {
    getData,
    getView,
}