import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {ListStoryContextAPI, Story} from "./type";
import services from "./services";
import {useDevice} from "../device/Provider";
import {isMobile} from "react-device-detect";
import {useLocation} from "react-router-dom";

const ListStoryContext = createContext<ListStoryContextAPI>({} as ListStoryContextAPI)

const ListStoryProvider: React.FC = ({children}) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>()
    const [list, setList] = useState<Story[]>([])
    const [nav, setNav] = useState<number[]>([])
    const {infoDevice} = useDevice()
    const parser = new DOMParser()
    const url = infoDevice()
    const location = useLocation();

    useEffect(() => {
        if(error) window.location.href = '/404';
    }, [error])

    useEffect(() => {
        if (error) setError(null)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    const removeSameId = (res) => {
        const seen = new Set();

        return res.filter(item => {
            const duplicate = seen.has(item.id);
            seen.add(item.id);

            return !duplicate;
        })
    }

    const getDataInElement = (element) => {
        const urlImage = element
            .getElementsByTagName('div')[0]
            .style.background
            .replace(`${url.urlImage}`, '')
            .replace('.jpg") center center / cover', '')

        const urlView = element
            .getElementsByTagName('a')[isMobile ? 0 : 1]
            .getAttribute('href').replace(process.env.REACT_APP_URL_VIEW, '')

        const name = element
            .getElementsByTagName('a')[isMobile ? 0 : 1]
            .innerHTML.replace(`<br>
\t\t        <small></small>`, '')

        const chapter = element
            .getElementsByTagName('a')[isMobile ? 1 : 0]

        const chapterName = chapter.innerHTML
        const chapterId = chapter.getAttribute('href').replace(process.env.REACT_APP_URL_CHAPTER, '')

        return {
            chapter_id: chapterId,
            chapter_name: chapterName,
            id: urlView,
            name: name,
            thumb: urlImage,
        }
    }

    const getListStory = (element) => {
        const length = element.length
        const arr = []
        for (let i = 0; i < length; i++) {
            arr.push(getDataInElement(element[i]))
        }
        setList(removeSameId(arr))
    }

    const getNav = (navigation, id, page) => {
        const arrUrl = navigation.querySelectorAll('.page-link')
        const length = arrUrl.length
        const arr = []
        for (let i = 0; i < length; i++) {
            const pageNumber = arrUrl[i]
                .getAttribute('href')
                .replace(`cat.php?id=${id}&p=`, '')
                .replace('index.php?p=', '')
                .replace('search.php?key=&status=&flexCat=&&type=&p=', '')
            arr.push(pageNumber)
        }

        if (page > 1) {
            arr.shift()
        }

        setNav(arr)
    }

    const getUrl = (id) => {
        if (id === 'new') {
            return `${url.urlHome}`
        }

        return `${url.urlType}id=${id}`
    }

    const getData = (id, page) => {
        setLoading(true)
        services
            .getData(getUrl(id), page)
            .then(res => {
                const doc = parser
                    .parseFromString(res, 'text/html')
                getListStory(doc.querySelectorAll(`${url.tagSelector}`))

                document.title = doc.title

                const navigation = doc.getElementsByTagName('nav')[0]
                if (navigation)
                    getNav(doc.getElementsByTagName('nav')[0], id, page)
            })
            .catch(newError => setError(newError))
            .finally(() => setLoading(false))
    }

    const getStoryByAuthor = (author) => {
        setLoading(true)
        services
            .getStoryByAuthor(`story/search.php?type=tacgia&key=${author}&exact`)
            .then(res => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(res, 'text/html');
                const arr = [];
                let listStory = doc.querySelectorAll('div.col-4');
                if (!isMobile) {
                    listStory = doc.querySelectorAll('div.col-md-2');
                }
                Array.from(listStory).map(item => {
                    return arr.push(getDataInElement(item))
                });
                setList(arr);
            })
            .catch(e => setError(e))
            .finally(() => setLoading(false))
    }

    const memoValue = useMemo(
        () => ({
            list,
            nav,
            loading,
            error,
            getData,
            getStoryByAuthor,
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }), [list, nav, loading, error],
    )
    return <ListStoryContext.Provider value={memoValue}>{children}</ListStoryContext.Provider>
};

export const useListStory = (): ListStoryContextAPI => useContext(ListStoryContext)

export default ListStoryProvider;