import React, {useEffect} from 'react';
import styled from "styled-components";
import Card from "./Card";
import Loading from "../Loading/Loading";
import AlertError from "../AlertError/AlertError";
import {useListStory} from "../../context/list/Provider";
import Pagination from "../Pagination/Pagination";

export const Item = styled.div`
    .row > div {
        margin-bottom: 10px;
    }
`

const Cards = ({id, page}) => {
    const {getData, loading, error, list} = useListStory()


    useEffect(() => {
        getData(id, page)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id, page])

    return (
        <Item>
            <Loading loading={loading}/>
            {!(loading) && <>
                <AlertError>{error}</AlertError>
                <div className='row'>
                    {list.length > 0 && list.map(item =>
                        <Card key={item.id} info={item}/>
                    )}
                </div>
                <Pagination id={id} page={page}/>
            </>}
        </Item>
    )
}

export default Cards;