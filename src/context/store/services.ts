import Api from "../../config/Api";

async function getDataStore(url) {
    const response = await Api.get(url)

    return response.data
}

export default {
    getDataStore,
}