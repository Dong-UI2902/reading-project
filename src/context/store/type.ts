
export type Image = {
    form?: string
    url: string
}
export type Product = {
    detail: string
    id: number | string
    image: Image[]
    madeof?: string
    numberofprod?: string
    price: string
    producer?: string
    title: string
    type?: string
    userfor: string
    sale?: string
}

export interface StoreContextAPI {
    loading: boolean
    product: Product
    setProduct: React.Dispatch<React.SetStateAction<Product>>
    products: Product[]
    getData: () => void
    addProduct: (product: Product) => void
    updateProduct: (product: Product) => void
    deleteProduct: (product: Product) => void
    findProduct: (id) => Product | undefined | null
    rmHOT: () => void
    addHOT: () => void
    hot: Product[]
    backUp: () => void
}