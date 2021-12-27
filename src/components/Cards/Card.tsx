import React from 'react';
import '../../styles/Card.scss'
import styled from "styled-components";

const CardStyle = styled.div`
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: ${({theme}) => theme.colors.card.background};
        background-clip: border-box;
        border: 1px solid rgba(0,0,0,.125);
        border-radius: 0.25rem;
        color: ${({theme}) => theme.colors.text};
`

const Card = ({url, title}) => {

    return (
        <div className='col-6 col-sm-4 col-md-3'>
            <CardStyle>
                <div className='box-img'>
                    <img src={url} className="card-img-top" alt="image"/>
                    <p>OneShot</p>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk
                        of the card's content.</p>
                    <button type="button" className="btn btn-primary">Xem Ngay</button>
                </div>
            </CardStyle>
        </div>
    );
};

export default Card;