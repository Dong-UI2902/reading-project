import React, {ReactElement, useEffect, useState} from 'react';
import styled from "styled-components";
import {useLocation, useParams} from "react-router-dom";
import Loading from "../components/Loading/Loading";
import AlertError from "../components/AlertError/AlertError";
import {isMobile} from "react-device-detect";

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
    `

const Read = () => {
    const params = useParams();
    const location = useLocation();

    const [images, setImages] = useState([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState()
    const [aTag, setATag] = useState<ReactElement>()

    const getTitleOnPc = (doc) => {
        setATag(<a className='title main-color' href={`/view/${params.id}`}>{doc.title}</a>)
    }

    const fixUrlChapterSelect = (doc) => {
        const url = doc.getElementById('selectChapter').getAttribute('onchange')
        doc.getElementById('selectChapter').setAttribute('onchange', url
            .replace('chapter.php?id=', `${location.pathname.replace(params.chapter, '')}`))
    }

    const fixUrlChapterNextOrBack = (a) => {
        a.forEach(element => {
            const href = element.getAttribute('href');
            element.setAttribute('href', href
                .replace('/story/chapter.php?id=', `${location.pathname.replace(params.chapter, '')}`))
        })
    }

    const getChaptersOnPc = (doc) => {
        const chapters = doc.getElementById('mainpage').getElementsByClassName('row py-2')[0];
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

    useEffect(() => {
        setLoading(true)
        fetch(`https://${isMobile ? 'm.' : ''}lxhentai.com/story/chapter.php?id=${params.chapter}`)
            .then(res => res.text())
            .then(res => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(res, 'text/html');

                document.title = doc.title

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
            <div>
                <div>
                    <h2>{aTag}</h2>
                </div>
                <div id='chapters' className='row mb-4'/>
            </div>
            {images.map((item, index) => <div key={index}>
                <img src={item} alt='Đã có lỗi xảy ra'/>
            </div>)}
            <div id='chapters2' className='mt-3'>
            </div>
        </ViewStyles>
    );
};

export default Read;