import React from 'react';
import '../../../styles/Product.scss'
import styled from "styled-components";
import {Link} from "react-router-dom";

export const FormatMoney = (props: any) => {
    const formatter = new Intl.NumberFormat('vi', {
        style: 'currency',
        currency: 'VND',
    })
    if (isNaN(props.price) && props.price !== undefined) {
        return <>
            {formatter.format(props.price.substring(0, props.price.indexOf("-"))) + "-" + formatter.format(props.price.substring(props.price.indexOf("-") + 1, props.price.length))}
        </>
    }
    return <>
        {formatter.format(props.price)}
    </>
}

const Product = styled.div`
        .card {
            background-color: ${({theme}) => theme.colors.card.background}!important;
        }
    `

export const fixUrlImage = (image) => {
    if (image.search("https://drive.google.com/file/d/") !== -1) {
        image = image.replace("https://drive.google.com/file/d/", "https://drive.google.com/uc?export=view&id=");
        image = image.replace("/view?usp=sharing", "");
    }
    return image;
}

const checkNumberOfProd = (number) => {
    if(number > 0) {
        return 'Còn hàng';
    }

    return 'Hết hàng';
}

const CardProduct = ({card}) => {

    return (
        <Product>
            <div className="card">
                <img src={fixUrlImage(card.image[0].url)}
                     className="card-img-top" alt="..."/>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h6 className="title title-product main-color">{card.title}</h6>
                        <div className="d-flex align-items-end flex-column">
                            {card.sale ? (
                                <small className='text-decoration-line-through'>
                                    <FormatMoney price={card.sale}/>
                                </small>
                            ) : (<></>)}
                            <span className="text-price price">
                                        <FormatMoney price={card.price}/>
                                    </span>
                            <small className="text-muted">{checkNumberOfProd(card.numberofprod)}</small>
                        </div>
                    </div>
                    <Link type="button" className="btn btn-danger" to={`/store/product/${card.id}`}>Xem Ngay</Link>
                </div>
            </div>
        </Product>
    );
};

export default CardProduct;