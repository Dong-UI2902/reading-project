import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Card from "./Card";

const Item = styled.div`
    .row > div {
        margin-bottom: 10px;
    }
`

type CardProps = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

const Cards = () => {
    const [list, setList] = useState<CardProps[]>([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(res => res.json())
            .then(photo => {
                setList(photo)
            })
    }, [])

    return (
        <Item>
            <div className='row'>
                {list.length > 0 && list.map(item =>
                    <Card key={item.id} url={item.url} title={item.title}/>
                )}
            </div>
        </Item>
    );
};

export default Cards;