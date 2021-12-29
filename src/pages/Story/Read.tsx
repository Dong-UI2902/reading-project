import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useParams} from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import AlertError from "../../components/AlertError/AlertError";

const ViewStyles = styled.div`
        text-align: center;
        
        div {
            position: relative;
        }
        
        img {
            max-width: 100%;
            border-bottom
        }
    `

const Read = () => {
    const params = useParams();
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState()

    useEffect(() => {
        setLoading(true)
        fetch(`https://lxhentai.com/story/chapter.php?id=${params.id}`)
            .then(res => res.text())
            .then(res => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(res, 'text/html');
                const arr = Array.from(doc.querySelectorAll('div img')).map(img => img.getAttribute('src'))
                arr.splice(0, 2)
                arr.splice(arr.length - 1, 1)
                setImages(arr)
            })
            .catch(newError => setError(newError))
            .finally(() => setLoading(false))
    }, [])

    return (
        <ViewStyles>
            <Loading loading={loading}/>
            <AlertError>{error}</AlertError>
            {images.map((item, index) => <div key={index}>
                <img src={item}/>
            </div>)}
        </ViewStyles>
    );
};

export default Read;