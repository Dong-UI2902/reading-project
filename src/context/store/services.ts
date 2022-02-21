import Api from "../../config/Api";

async function sleep() {
    await new Promise(resolve => {
        setTimeout(resolve, 1000)
    })
}

async function getDataStore(url) {
    const response = await Api.get(url, {params: (Math.random() * 100) + 1})
    await sleep()
    return response.data
}

async function getHOT(url) {
    const response = await Api.get(url, {params: (Math.random() * 100) + 1})
    await sleep()
    return response.data
}

async function update(url, product) {
    const response = await Api.post(url, product)
    await sleep()

    return response.data
}

async function add(url, product) {
    const response = await Api.post(url, product)
    await sleep()

    return response.data
}

async function deleteProd(url, id) {
    const response = await Api.post(url, id)
    await sleep()

    return response.data
}

async function addHOT(url, id) {
    const response = await Api.post(url, id)
    await sleep()

    return response.data
}

async function rmHOT(url, id) {
    const response = await Api.post(url, id)
    await sleep()

    return response.data
}

async function backUp(url) {
    const response = await Api.post(url)
    await sleep()

    return response.data
}

export default {
    getDataStore,
    update,
    add,
    deleteProd,
    addHOT,
    rmHOT,
    getHOT,
    backUp
}