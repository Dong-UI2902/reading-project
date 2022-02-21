import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {Product, StoreContextAPI} from "./type";
import services from "./services";
import {toast} from "react-toastify";
import {PRODUCT, TOAST_MESSAGE} from "../constant/constants";

const StoreContext = createContext<StoreContextAPI>({} as StoreContextAPI)
const StoreProvider: React.FC = ({children}) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [products, setProducts] = useState<Product[]>([]);
    const [hot, setHot] = useState<Product[]>([]);
    const [product, setProduct] = useState<Product>(() => PRODUCT)

    const logMessage = (message) => {
        const text = (document.getElementById('log') as HTMLInputElement);
        if (text) {
            const log = (document.getElementById('log') as HTMLInputElement).value;
            const arr = [];
            log.split('\n').forEach(item => {
                if (item) {
                    arr.push(item);
                }
            })

            if (arr.length >= 6) {
                arr.shift();
            }
            arr.push(message);

            (document.getElementById('log') as HTMLInputElement).value = arr.join("\n");
        }
    }

    const getData = () => {
        setLoading(true)
        const NAME = 'Lấy dữ liệu';
        let arr1 = [];
        toast.promise(
            services
                .getDataStore('/data/store/data.txt')
            ,
            {
                pending: 'Đang lấy dữ liệu!',
                success: `${TOAST_MESSAGE.success(NAME)}`,
                error: `${TOAST_MESSAGE.error(NAME)}`
            }
        )
            .then(res => {
                res.reverse();
                res.sort(function (a, b) {
                    if (a.numberofprod > b.numberofprod) return -1;
                    if (a.numberofprod < b.numberofprod) return 1;
                    return 0;
                });
                setProducts(res)
                arr1 = res
                return services
                    .getHOT('/data/store/hot.txt')
            })
            .then(res => {
                const arr = [];
                res.forEach(id => {
                    const found = arr1.find(item => item.id === id)
                    if (found) arr.push(found);
                })

                setHot(arr);
            })
            .finally(() => {
                logMessage('Lấy dữ liệu thành công')
                setLoading(false)
            })
    }

    const findProduct = (id) => {
        return products.find(item => item.id === Number(id))
    }

    const addProduct = (product) => {
        setLoading(true)
        const NAME = 'Thêm mới';
        toast.promise(
            services
                .add('/PHP/sextoy/new.php', product)
            ,
            {
                pending: 'Đang thêm mới sản phẩm',
                success: `${TOAST_MESSAGE.success(NAME)}`,
                error: `${TOAST_MESSAGE.error(NAME)}`
            }
        )
            .then(res => {
                console.log(res)
                setProducts(prevState => [...prevState, res])
                setProduct(res)
                logMessage(TOAST_MESSAGE.success(NAME));
            })
            .catch(e => logMessage(TOAST_MESSAGE.error(`${NAME + ' ' + product.title}`) + ': ' + e))
            .finally(() => setLoading(false))
    }

    const updateProduct = (product) => {
        setLoading(true)
        const NAME = 'Cập nhật';
        toast.promise(
            services
                .update('/PHP/sextoy/update.php', product)
            ,
            {
                pending: 'Đang cập nhật',
                success: `${TOAST_MESSAGE.success(NAME)}`,
                error: `${TOAST_MESSAGE.error(NAME)}`
            }
        )
            .then(() => {
                const index = products.findIndex(item => item.id === product.id);
                products[index] = product;
                logMessage(TOAST_MESSAGE.success(NAME))
            })
            .catch(e => logMessage(TOAST_MESSAGE.error(`${NAME + ' ' + product.title}`) + ': ' + e))
            .finally(() => setLoading(false))
    }

    const deleteProduct = (product) => {
        setLoading(true)
        const NAME = 'Xoá';
        toast.promise(
            services
                .deleteProd('/PHP/sextoy/delete.php', product.id)
            ,
            {
                pending: `Đang xoá ${product.title}`,
                success: `${TOAST_MESSAGE.success(`${NAME + ' ' + product.title}`)}`,
                error: `${TOAST_MESSAGE.error(`${NAME + ' ' + product.title}`)}`
            }
        )
            .then(res => {
                const index = products.findIndex(item => item.id === product.id);
                products.splice(index, 1);
                setProduct(PRODUCT);
                logMessage(TOAST_MESSAGE.success(`${NAME + ' ' + product.title}`))
            })
            .catch(e => logMessage(TOAST_MESSAGE.error(`${NAME + ' ' + product.title}`) + ': ' + e))
            .finally(() => setLoading(false))
    }

    const addHOT = () => {
        setLoading(true)
        const found = hot.find(item => item.id === product.id)
        if (found) {
            toast.info(`${product.title} đã là sản phẩm HOT`)
        } else {
            toast.promise(
                services
                    .addHOT('/PHP/hot/addHotProds.php', product.id)
                ,
                {
                    pending: `Đang thêm ${product.title} vào HOT`,
                    success: `${TOAST_MESSAGE.success(`thêm ${product.title} vào HOT`)}`,
                    error: `${TOAST_MESSAGE.error(`thêm ${product.title} vào HOT`)}`
                }
            )
                .then(() => {
                    setHot(prevState => ([...prevState, product]));
                    logMessage(TOAST_MESSAGE.success(`${'thêm ' + product.title + ' vào HOT'}`))
                })
                .catch()
                .finally(() => setLoading(false))
        }
    }

    const rmHOT = () => {
        const found = hot.find(item => item.id === product.id)
        if (!found) {
            toast.info(`${product.title} không phải là sản phẩm HOT`)
        } else {
            toast.promise(
                services
                    .rmHOT('/PHP/hot/rmHotProds.php', product.id)
                ,
                {
                    pending: `Đang xoá ${product.title} khỏi HOT`,
                    success: `${TOAST_MESSAGE.success(`xoá ${product.title} khỏi HOT`)}`,
                    error: `${TOAST_MESSAGE.error('xoá khỏi HOT')}`
                }
            )
                .then(res => {
                    const index = hot.findIndex(item => item.id === res);
                    hot.splice(index, 1);
                    logMessage(TOAST_MESSAGE.success(`${'xoá ' + product.title + ' khỏi HOT'}`))
                })
                .catch()
                .finally(() => setLoading(false))
        }
    }

    const backUp = () => {
        setLoading(true)
        toast.promise(
            services
                .backUp('/PHP/sextoy/backup.php')
            ,
            {
                pending: `đang backup dữ liệu`,
                success: `${TOAST_MESSAGE.success(`backup dữ liệu`)}`,
                error: `${TOAST_MESSAGE.error('backup dữ liệu')}`
            }
        )
            .then(() => TOAST_MESSAGE.success(`backup dữ liệu`))
            .catch(e => logMessage(TOAST_MESSAGE.error(e)))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getData()
    }, [])

    const memoValue = useMemo(
        () => ({
            loading,
            product,
            setProduct,
            products,
            getData,
            addProduct,
            updateProduct,
            deleteProduct,
            findProduct,
            addHOT,
            rmHOT,
            hot,
            backUp
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }), [products, loading, product, hot],
    )

    return <StoreContext.Provider value={memoValue}>{children}</StoreContext.Provider>
};
export const useStore = () => useContext(StoreContext)

export default StoreProvider;