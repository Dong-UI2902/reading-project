export type infoDevice = {
    urlHome: string
    tagSelector: string
    urlImage: string
    urlType: string
}

export type DeviceContext = {
    infoDevice: () => infoDevice
}