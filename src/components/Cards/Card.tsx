import React from 'react';
import '../../styles/Card.scss'
import styled from "styled-components";

const CardStyle = styled.div`
        position: relative;
        display: flex;
        flex-direction: column;
        max-width: 224px;
        margin: 0 auto;
        word-wrap: break-word;
        background-color: ${({theme}) => theme.colors.card.background};
        background-clip: border-box;
        border: 1px solid rgba(0,0,0,.125);
        border-radius: 0.25rem;
        cursor: pointer;
`

const Card = ({info}) => {
    const showImage = (idImage) => {
        return `https://lxhentai.com/assets/hentai/${idImage}.jpg?`
    }

    const goToView = (id) => {
        window.open(`/view/${id}`, '_blank')
    }

    return (
            <div className='col-6 col-sm-4 col-md-2 boxStory' onClick={() => goToView(info.id)}>
                <CardStyle>
                    <div className='box-img'>
                        <img src={showImage(info.thumb)} className="card-img-top" alt="đã xảy ra lỗi"/>
                        <p>{info.chapter_name}</p>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{info.name}</h5>
                    </div>
                </CardStyle>
            </div>
    );
};

export default Card;