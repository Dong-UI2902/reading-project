import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Card from "./Card";
import Loading from "../Loading/Loading";
import AlertError from "../AlertError/AlertError";
import {MESSAGE_ERROR, URL_Chapter, URL_View} from "../../context/story/constant";
import {Link} from "react-router-dom";

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

const Cards = ({id, page, isHome = false}) => {
    const [list, setList] = useState<CardProps[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>()
    const [pages, setPages] = useState([])

    const getUrl = () => {
        if (id === 'new') {
            return `https://lxhentai.com/story/index.php?p=${page}`
        }

        return `https://lxhentai.com/story/cat.php?id=${id}&p=${page}`
    }

    const getTo = () => {
        if (id === 'new') {
            return `/all`
        }

        return `/type/${id}`
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

    const changeUrlNav = (navigation) => {
        const arrUrl = navigation.querySelectorAll('.page-link')
        const length = arrUrl.length
        const arr = []
        for (let i = 0; i < length; i++) {
            const pageNumber = arrUrl[i]
                .getAttribute('href')
                .replace(`cat.php?id=${id}&p=`, '')
                .replace('index.php?p=', '')
            arr.push(pageNumber)
        }

        if (page > 1) {
            arr.shift()
        }

        setPages(arr)
    }

    const getData = () => {
        setLoading(true)
        fetch(getUrl())
            .then(res => res.text())
            .then(res => {
                const parser = new DOMParser()
                const doc = parser.parseFromString(res, 'text/html')
                const box = doc
                    .querySelectorAll('.col-md-3')

                const navigation = doc.getElementsByTagName('nav')[0]
                changeUrlNav(navigation)

                const length = box.length
                const arr = []
                for (let i = 0; i < length; i++) {
                    arr.push(formatInfo(box[i]))
                }
                setList(removeSameId(arr))
            })
            .catch(newError => setError(MESSAGE_ERROR))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getData()
    }, [page])

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
                <ul className='pagination justify-content-center mt-4'>
                    <li className="page-item">
                        <Link className="page-link"
                              to={`${getTo()}/1`}
                              tabIndex={-1} aria-disabled="true">«
                        </Link>
                    </li>
                    {pages.map((item, index) => {
                        if (index < pages.length - 1)
                            return <li key={index} className={`page-item ${page === item && 'active'}`}>
                                <Link className="page-link" to={`${getTo()}/${item}`} replace>
                                    {item}
                                </Link>
                            </li>

                        return null
                    })}
                    <li className="page-item">
                        <Link className="page-link" to={`${getTo()}/${pages[pages.length - 1]}`} tabIndex={-1}
                              aria-disabled="true">»</Link>
                    </li>
                </ul>
            </>}
        </Item>
    )
}

export default Cards;