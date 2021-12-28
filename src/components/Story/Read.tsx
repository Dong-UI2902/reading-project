import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useParams} from "react-router-dom";

const ViewStyles = styled.div`
        margin: 10 auto;
        
        div {
            position: relative;
        }
        
        .cen {
            position: absolute;
            bottom: 0;
            height: 4%;
            background-color: white;
            width: 100%;
        }
        
        img {
            max-width: 100%;
            border-bottom
        }
    `

const Read = () => {
    const params = useParams();
    const [images, setImages] = useState([])

    useEffect(() => {
        fetch(`https://lxhentai.com/story/chapter.php?id=${params.id}`)
            .then(res => res.text())
            .then(res => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(res, 'text/html');
                const arr = Array.from(doc.querySelectorAll('div img')).map(img => img.getAttribute('src'))
                arr.splice(0, 6)
                arr.splice(arr.length - 1, 1)
                setImages(arr)
            })
    }, [])

    return (
        <ViewStyles>
            {images.map((item, index) => <div key={index}>
                <div className='cen'/>
                <img src={item}/>
            </div>)}
        </ViewStyles>
    );
};

export default Read;