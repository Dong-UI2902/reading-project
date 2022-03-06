import React, {createContext, useContext, useMemo, useState} from 'react';
import {StoryContextAPI} from "./type";
import services from "../list/services";
import {isMobile} from "react-device-detect";

const StoryContext = createContext<StoryContextAPI>({} as StoryContextAPI)
const StoryProvider: React.FC = ({children}) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>()

    const changeUrlImage = (element) => {
        const images = element.querySelectorAll('img')

        const length = images.length
        for (let i = 0; i < length; i++) {
            const url = images[i].getAttribute('src')
            if (!isMobile) {
                images[i].setAttribute('src', `${process.env.REACT_APP_BASE_URL + url}`)
            }

            addAltImages(images[i])
        }
    }

    const changeUrl = (element, rmUrl, rpUrl) => {
        const allUrl = element.querySelectorAll('a')
        const urlLength = allUrl.length
        for (let i = 0; i < urlLength; i++) {
            const id = allUrl[i]
                .getAttribute('href')
                .replace(rmUrl, '')
            let newUrl = `${rpUrl + id}`

            if (rpUrl === '/tag/')
                newUrl = `${newUrl}/1`

            allUrl[i].setAttribute('href', newUrl)
        }
    }

    const addAltImages = (image) => {
        image.setAttribute('alt', `đã xảy ra lỗi`)
    }

    const formatDataMobile = (doc, id) => {
        changeUrlImage(doc.getElementsByClassName('flexRow pt-2')[0])
        document.getElementById('image').innerHTML = doc
            .getElementsByClassName('flexRow')[1]
            .innerHTML

        const infoStory = doc.getElementById('pills-ttt')
        changeUrl(infoStory, process.env.REACT_APP_URL_INFO, '/tag/')
        const author = infoStory.getElementsByTagName('div')[0];
        changeUrl(author, '/tag//story/search.php?type=tacgia&key=', '/author/')
        changeUrl(author, '&exact/1', '')
        document.getElementById('infoStory').innerHTML = infoStory.innerHTML

        const chapters = doc.getElementById('pills-new')
        changeUrl(chapters, process.env.REACT_APP_URL_CHAPTER, `${id}/read/`)
        document.getElementById('chapters').innerHTML = chapters.innerHTML
    }

    const formatDataDesktop = (doc, id) => {
        document.getElementById('title').innerHTML = doc
            .getElementsByClassName('text-center mb-3')[0]
            .innerHTML

        changeUrlImage(doc.getElementsByClassName('row')[2])

        document.getElementById('image').innerHTML = doc
            .getElementsByClassName('col-md-4 text-center')[0]
            .innerHTML

        const info = doc.getElementsByClassName('row mt-2')[0]
        changeUrl(info, process.env.REACT_APP_URL_INFO, '/tag/')
        const author = info.getElementsByClassName('col-8')[0]
        changeUrl(author, '/tag//story/search.php?type=tacgia&key=', '/search/tacgia/')
        changeUrl(author, '&exact/1', '')
        document.getElementById('status').innerHTML = info.innerHTML

        const chapters = doc.getElementsByClassName('detail-content mt-3')[0]
        changeUrl(chapters, process.env.REACT_APP_URL_CHAPTER, `${id}/read/`)

        document.getElementById('chapters').innerHTML = chapters.innerHTML

        const sameAuthor = doc.getElementsByClassName('darkbox')[0]
        changeUrl(sameAuthor, process.env.REACT_APP_URL_VIEW, `/view/`)
        document.getElementById('sameAuthor').innerHTML = sameAuthor.innerHTML
    }

    const getStory = (id) => {
        setLoading(true)
        services
            .getView(process.env.REACT_APP_URL_VIEW, id)
            .then(res => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(res, 'text/html');

                document.title = doc.title;

                if (isMobile) {
                    formatDataMobile(doc, id)
                } else {
                    formatDataDesktop(doc, id)
                }
            })
            .catch(newError => setError('Đã xảy ra lỗi'))
            .finally(() => setLoading(false));
    }

    const memoValue = useMemo(
        () => ({
            error,
            loading,
            getStory,
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }), [loading, error],
    )
    return <StoryContext.Provider value={memoValue}>{children}</StoryContext.Provider>
};

export const useStory = () => useContext(StoryContext)

export default StoryProvider;