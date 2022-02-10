import React from 'react';
import styled from 'styled-components';
import '../../styles/Home.scss';

const BackGroundHeader = styled.div`
    background-image: url('/chibi1.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 60vh;
    
    p{
        font-size: 100px;
        color: white;
        text-shadow: 2px 2px rgb(0 0 0 / 20%);
    }
    
    @media (max-width: 576px) {
        p{
            font-size: 50px!important;
        }
    }
`

const ImageHeader = () => {
    return (
        <BackGroundHeader className='d-flex align-items-center justify-content-center text-center'>
            <div>
                <p className='title nameStore'>
                    Welcome <br/> To <br/>CaoNhan Collection
                </p>
            </div>
        </BackGroundHeader>
    );
};

export default ImageHeader;