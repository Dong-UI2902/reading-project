import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import ImageCarousel from "../components/Home/Product/slides/CarouselDetail";
import '../styles/Product.scss'
import {FormatMoney} from "../components/Home/Product/CardProduct";
import styled from "styled-components";
import {useStore} from "../context/store/Provider";
import Loading from "../components/Loading/Loading";
import {Product} from "../context/store/type";
import {PRODUCT} from "../context/constant/constants";

const ProductStyles = styled.div `
    .rounded {
        background-color: ${({theme}) => theme.colors.card.background};
        
        .price {
            color: ${({theme}) => theme.colors.text};
        }
    }
`

const ViewProduct = () => {
    const params = useParams();
    const id = Number(params.id);
    const {products, loading, findProduct} = useStore()

    const [product, setProduct] = useState<Product>(PRODUCT)

    useEffect(() => {
        const temp = findProduct(id)
        if(temp) {
            setProduct(temp)
        }
    }, [products])


    useEffect(() => {
        document.getElementById('detail').innerHTML = product.detail
        document.title = product.title
    }, [product])

    const replaceText = (text) => {
        if(!text) {
            return 'Đang cập nhật...';
        }

        return text;
    }

    return (
        <ProductStyles className='product'>
            <Loading loading={loading}/>
            <div className={`row detail ${loading && 'd-none'}`}>
                <div className='col-md-6'>
                    {
                        product.image.length > 0 && <ImageCarousel images={product.image}/>
                    }
                </div>
                <div className='col-md-6'>
                    <h2 className='title main-color'>
                        {product.title}
                    </h2>
                    <div>
                        <div className='props'>Nhà sản xuất: <p className='props'>{replaceText(product.producer)}</p></div>
                        <div className='props'>Chất liệu: <p className='props'>{replaceText(product.madeof)}</p></div>
                    </div>
                    <div>
                        <div className='props'>Sử dụng cho: <p className='props'>{replaceText(product.userfor)}</p></div>
                        <div className='props'>Loại: <p
                            className='props'>{replaceText(product.type)}</p></div>
                    </div>

                    <div className="p-2 rounded">
                        <p className='price'>Giá: <FormatMoney price={product.price}/></p>
                        <small>
                            <strong className="text-danger">Lưu ý</strong>: Vui lòng đặt hàng qua messenger trên
                            Website. Nếu messenger trên Website không hoạt động, vui lòng truy cập vào
                            <a target="_blank" className='text-primary' href="https://www.facebook.com/namitoyshop"> địa
                                chỉ này!</a>
                        </small>
                    </div>
                    <div>
                        <p className='props'>Mô tả sản phẩm: </p>
                        <div className="collapse" id="collapseExample">
                            <div id='detail'/>
                        </div>
                        {product.detail.length > 1100 ? <p>
                            <button className="btn btn-primary readmore" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseExample" aria-expanded="false"
                                    aria-controls="collapseExample" />
                        </p> : <></>}

                    </div>
                </div>
            </div>
        </ProductStyles>
    );
};

export default ViewProduct;