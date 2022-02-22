import React, {useEffect, useState} from 'react';
import CarouselProps from "../components/Home/Product/slides/CarouselProps";
import CardProduct from "../components/Home/Product/CardProduct";
import Pagination from "../components/Home/Pagination/Pagination";
import {useParams} from "react-router-dom";
import {useStore} from "../context/store/Provider";
import Loading from "../components/Loading/Loading";
import {toast} from "react-toastify";

toast.configure()
const SexToy = () => {
    const {products, loading, hot} = useStore()
    const [list, setList] = useState([])

    const params = useParams();

    const showList = (newsPerPage) => {
        const length = newsPerPage * 8;
        let currentPage = length - 8;
        if (currentPage < 8) {
            currentPage = 0;
        }

        const arr = [];
        for (let i = currentPage; i < length; i++) {
            if (products[i] !== undefined) {
                arr.push(products[i])
            }
        }
        setList(arr);
    }

    useEffect(() => {
        document.title = 'Namitoys Store'
    }, [])

    useEffect(() => {
        if (!params.page) {
            return showList(1);
        }

        return showList(params.page);
    }, [params.page, products])

    return (
        <div className='product'>
            <div className='m-3'>
                <h2 className='title main-color' style={{
                    fontFamily: `'Luckiest Guy', cursive`,
                    fontSize: '50px',
                    textAlign: 'center'
                }}>namitoys Store</h2>
                <Loading loading={loading}/>
            </div>
            {!loading && (
                <>
                    <div>
                        <p className='title'>🔥 Lựa Chọn Hot Trong Tuần</p>
                        {
                            hot.length > 0 ? (<CarouselProps>
                                {hot.map((card: any, index: any) => {
                                    return (
                                        <div className='col-md-12 pe-3 ps-3 p-1' key={card.id}>
                                            <CardProduct card={card}/>
                                        </div>
                                    );
                                })}
                            </CarouselProps>) : (
                                <p className='text-center'>Đang cập nhật...</p>
                            )
                        }

                    </div>

                    <div className='mt-5'>
                        <p className='title'>tất cả các mặt hàng</p>
                        <div className='row'>
                            {list.map((card: any) => {
                                return (
                                    <div className="col-sm-3 col-12 mb-3" key={card.id}>
                                        <CardProduct card={card}/>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className='mt-4'>
                        <Pagination pageNumber={4}/>
                    </div>
                </>
            )}
        </div>
    )
};

export default SexToy;