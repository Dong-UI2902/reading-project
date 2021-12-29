import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Card from "./Card";
import Loading from "../Loading/Loading";
import AlertError from "../AlertError/AlertError";
import {URL_Chapter, URL_View} from "../../context/story/constant";

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

const Cards = ({id}) => {
    const [list, setList] = useState<CardProps[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState()

    const getUrl = () => {
        if (id === 'new')
            return 'https://lxhentai.com/story/index.php?p=1'

        return `https://lxhentai.com/dashboard/api.php?act=get_home_tab&id=${id}`
    }

    const removeSameId = (res) => {
        const seen = new Set();

        return res.filter(item => {
            const duplicate = seen.has(item.id);
            seen.add(item.id);

            return !duplicate;
        })
    }

    const formatInfo = (element) => {
        const urlImage = element
            .getElementsByTagName('div')[0]
            .style.background
            .replace('url("/assets/hentai/', '')
            .replace('.jpg") center center / cover', '')

        const urlView = element
            .getElementsByTagName('a')[1]
            .getAttribute('href').replace(URL_View, '')

        const name = element
            .getElementsByTagName('a')[1]
            .innerHTML

        const chapter = element
            .getElementsByTagName('a')[0]

        const chapterName = chapter.innerHTML
        const chapterId = chapter.getAttribute('href').replace(URL_Chapter, '')

        return {
            chapter_id: chapterId,
            chapter_name: chapterName,
            id: urlView,
            name: name,
            thumb: urlImage,
        }
    }

    useEffect(() => {
        setLoading(true)
        fetch(getUrl())
            .then(res => {
                if (id === 'new')
                    return res.text()
                return res.json()
            })
            .then(res => {
                if (id !== 'new')
                    return setList(removeSameId(res))

                const parser = new DOMParser()
                const doc = parser.parseFromString(res, 'text/html')
                const box = doc
                    .querySelectorAll('.col-md-3')

                const length = box.length
                for (let i = 0; i < length; i++) {
                    list.push(formatInfo(box[i]))
                }
            })
            .catch(newError => setError(newError))
            .finally(() => setLoading(false))
    }, [])

    return (
        <Item>
            <Loading loading={loading}/>
            <AlertError>{error}</AlertError>
            <div className='row'>
                {list.length > 0 && list.map(item =>
                    <Card key={item.id} info={item}/>
                )}
            </div>
        </Item>
    );
};

export default Cards;