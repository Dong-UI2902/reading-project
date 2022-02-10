import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {StoreContextAPI} from "./type";
import {Product} from "../../pages/ViewProduct";

const StoreContext = createContext<StoreContextAPI>({} as StoreContextAPI)
const StoreProvider: React.FC = ({children}) => {
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState()
    const [products, setProducts] = useState<Product[]>([]);

    const getData = () => {
        setLoading(true)
        fetch('/data/data.txt')
            .then(r => r.text())
            .then(text => {
                setProducts(JSON.parse(text))
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getData()
    }, [])

    const memoValue = useMemo(
        () => ({
            loading,
            error,
            product,
            setProduct,
            products,
            getData
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }), [product, products, loading],
    )

    return <StoreContext.Provider value={memoValue}>{children}</StoreContext.Provider>
};
export const useStore = () => useContext(StoreContext)

export default StoreProvider;