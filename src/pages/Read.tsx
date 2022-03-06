import React, {ReactElement, useEffect, useState} from 'react';
import styled from "styled-components";
import {useLocation, useParams} from "react-router-dom";
import Loading from "../components/Loading/Loading";
import AlertError from "../components/AlertError/AlertError";
import {isMobile} from "react-device-detect";
import LazyLoad from 'react-lazyload';
import {useListStory} from "../context/list/Provider";
import {toast} from "react-toastify";

const ViewStyles = styled.div`
        text-align: center;
        
        div {
            position: relative;
        }
        
        img {
            max-width: 100%;
            border-bottom
        }
        
        #title {
            
        }
        .changeChap {
            height: 48px;
            background: #df3434;
            text-align: center;
            line-height: 48px;
            font-size: 18px;
            color: #fff;
            padding: 0 20px;
            border: none;
            display: inline-block;
            font-family: utmcons;
        }
        
        .flex1 {
            flex: 1;
        }
        
        .info {
            ${!isMobile && (`button {
                position: absolute;
                bottom: 30px;
                right: 18%;
            }`)}
        }
    `

const Read = () => {
    const {id, chapter} = useParams();
    const location = useLocation();
    const {flStory, isFl, unFlStory, history} = useListStory()

    const [images, setImages] = useState([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState()
    const [aTag, setATag] = useState<ReactElement>()

    const getTitleOnPc = (doc) => {
        setATag(<a className='title main-color' href={`/view/${id}`}>{doc.title}</a>)
    }

    const fixUrlChapterSelect = (doc) => {
        const url = doc.getElementById('selectChapter').getAttribute('onchange')
        doc.getElementById('selectChapter').setAttribute('onchange', url
            .replace('chapter.php?id=', `${location.pathname.replace(chapter, '')}`))
    }

    const fixUrlChapterNextOrBack = (a) => {
        a.forEach(element => {
            const href = element.getAttribute('href');
            element.setAttribute('href', href
                .replace('/story/chapter.php?id=', `${location.pathname.replace(chapter, '')}`))
        })
    }

    const getChaptersOnPc = (doc) => {
        const chapters = doc.getElementById('mainpage').getElementsByClassName('row py-2')[0];
        const btn = chapters.getElementsByClassName('flexRow mt-2 mb-3')[0]
        const text = chapters.getElementsByTagName('p')[0]
        btn.remove()
        text.remove()
        const avt = chapters.getElementsByTagName('img')[0];
        const avtUrl = avt.getAttribute('src');
        avt.setAttribute('src', avtUrl.replace('/assets', 'https://lxhentai.com/assets'))
        fixUrlChapterSelect(doc)

        document.getElementById('chapters').innerHTML = chapters.innerHTML
        document.getElementById('chapters2').innerHTML = `<div class='col-6 ms-auto me-auto mt-5 mb-5'>
                    Chuyển Chapter Nhanh:
                    ${chapters.getElementsByTagName('select')[0].outerHTML}
                </div>`
    }

    const getChaptersOnMobile = (doc) => {
        const chapters = doc.getElementById('mainContent').getElementsByClassName('mt-4')[0];
        fixUrlChapterSelect(doc)

        const a = chapters.querySelectorAll('a')
        fixUrlChapterNextOrBack(a)

        document.getElementById('chapters').innerHTML = `<div class='d-flex'>
            ${chapters.innerHTML}
        </div>`
        document.getElementById('chapters2').innerHTML = `<div class='d-flex'>
            ${chapters.innerHTML}
        </div>`
    }

    const handleClickFl = () => {
        flStory({id}, {isFollow: true})
        toast.success('Bạn đã theo dõi truyện này')
    }

    const handleClickUnFl = () => {
        unFlStory(id)
        toast.warning('Bạn đã huỷ theo dõi truyện này')
    }

    useEffect(() => {
        setLoading(true)
        fetch(`https://${isMobile ? 'm.' : ''}lxhentai.com/story/chapter.php?id=${chapter}`)
            .then(res => res.text())
            .then(res => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(res, 'text/html');

                const title = doc.title
                document.title = title
                const story = {id, name: title.substring(0, title.lastIndexOf('-') - 1)}
                flStory(story, {chapterRead: title.substring(title.lastIndexOf('-') + 2, title.length)})

                if (!isMobile) {
                    getTitleOnPc(doc);
                    getChaptersOnPc(doc);
                } else {
                    getChaptersOnMobile(doc)
                }

                const images = doc.getElementsByClassName('reader text-center py-2')[0]
                const arr = Array.from(images.querySelectorAll('img')).map(img => img.getAttribute('src'))
                setImages(arr)
            })
            .catch(newError => setError(newError))
            .finally(() => setLoading(false))
    }, [])

    return (
        <ViewStyles>
            <Loading loading={loading}/>
            <AlertError>{error}</AlertError>
            <div className='position-relative'>
                <div>
                    <h2>{aTag}</h2>
                </div>
                <div className='info'>
                    <div id='chapters' className='row mb-4' />
                    {history[isFl(id)]?.isFollow ? (

                        <button className="btn btn-warning" onClick={handleClickUnFl}>
                            <i className="fa fa-times-circle fa-fw"/>
                            Bỏ theo dõi
                        </button>
                    ) : (
                        <button className="btn btn-success" onClick={handleClickFl}>
                            <i className="fa fa-heart fa-fw"/>
                            Theo dõi
                        </button>
                    )}
                </div>
            </div>
            {images.map((item, index) => <div key={index} style={{minHeight: '200px'}}>
                <LazyLoad once={true} height={200} offset={400}>
                    <img src={item} alt='Đã có lỗi xảy ra'/>
                </LazyLoad>
            </div>)}
            <div id='chapters2' className='mt-3'>
            </div>
        </ViewStyles>
    );
};

export default Read;