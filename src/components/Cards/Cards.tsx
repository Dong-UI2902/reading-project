import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Card from "./Card";

const Item = styled.div`
    .row > div {
        margin-bottom: 10px;
    }
`

type CardProps = {
    chapter_id: string
    chapter_name: string
    id: string
    name: string
    thumb: string
}

const Cards = () => {
    const [list, setList] = useState<CardProps[]>([])

    useEffect(() => {
        fetch('https://lxhentai.com/dashboard/api.php?act=get_home_tab&id=11')
            .then(res => res.json())
            .then(res => {
                setList(res)
            })
    }, [])

    return (
        <Item>
            <div className='row'>
                {list.length > 0 && list.map(item =>
                    <Card key={item.id} info={item}/>
                )}
            </div>
        </Item>
    );
};

export default Cards;