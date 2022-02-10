import React from "react";
import {Product} from "../../pages/ViewProduct";

export interface StoreContextAPI {
    error: string
    loading: boolean
    product: Product
    setProduct: React.Dispatch<React.SetStateAction<Product>>
    products: Product[]
    getData: () => void
}