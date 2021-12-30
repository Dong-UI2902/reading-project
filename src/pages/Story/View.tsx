import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import styled from "styled-components";
import '../../styles/View.scss'
import Loading from "../../components/Loading/Loading";
import AlertError from "../../components/AlertError/AlertError";
import {URL_Chapter, URL_Info, URL_View} from "../../context/story/constant";

const ViewStyle = styled.div`
    #title {
        text-align: center;       
        margin-bottom: 30px;
        
        h1 {
            color: #db0075!important;
            font-weight: 600;
        }
    }
    
    #status {
        div.col-8 {
            color: ${({theme}) => theme.colors.text}!important;
        }
    }
    
    .btn {
        margin: 10px 10px 0 0;
        color: #fff;
    }
    
    h2 {
        color: #db0075!important;
        border-bottom: 1px solid ${({theme}) => theme.colors.text};
        font-size: 16px;
        margin: 10px 0;
        text-align: center;
        font-weight: 600;
    }
    
    .flexRow {
        display: flex;
        
        .flex1 {
            margin-left: 10px;
        }
    }
    .flex1 {
        flex: 1;
    }
    
    .list-title {
        color: #db0075!important;
        margin-top: 20px; 
    }
    
    #chapters {     
        ul {
            padding-left: 0;
            
            .seen {
                color: ${({theme}) => theme.colors.text}!important;
            }
        }
    }
`
const View = () => {
    const params = useParams();
    const baseUrl = 'https://lxhentai.com'
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState()

    const render = (id, data) => {
        const image = data.getElementsByTagName('img')
        if (image.length > 0) {
            const length = image.length
            for (let i = 0; i < length; i++) {
                const newUrl = `${baseUrl + image[i].getAttribute('src')}`
                image[i].setAttribute('src', newUrl)
                image[i].setAttribute('alt', 'lỗi')
            }
        }

        const href = data.getElementsByTagName('a')
        if (href.length > 0) {
            const length = href.length
            let rmUrl = URL_Chapter
            let rmUrl2 = URL_Info
            let replaceUrl = 'read/'
            if (id === 'sameAuthor') {
                rmUrl = URL_View
                replaceUrl = '/view/'
            }

            for (let i = 0; i < length; i++) {
                const url = href[i].getAttribute('href')
                let newUrl = ''

                if (url.indexOf(rmUrl) < 0) {
                    replaceUrl = '/type/'
                    newUrl = `${replaceUrl + url.replace(rmUrl2, '') +'/1'}`
                } else {
                    newUrl = `${replaceUrl + url.replace(rmUrl, '')}`
                }

                href[i].setAttribute('href', newUrl)
            }
        }

        document.getElementById(id).innerHTML = data.innerHTML
    }

    useEffect(() => {
        setLoading(true)
        fetch(`https://lxhentai.com/story/view.php?id=${params.id}`)
            .then(res => res.text())
            .then(res => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(res, 'text/html');
                const box = doc.getElementById('mainpage')
                const info = box.getElementsByClassName('row')
                const detail = info[0].getElementsByClassName('col-md-8')
                const sameAuthor = info[0].getElementsByClassName('col-md-4')[1]

                const title = detail[0].getElementsByClassName('text-center')[0]
                const image = detail[0].getElementsByClassName('row')[0].getElementsByClassName('col-md-4')[0]
                const status = detail[0]
                    .getElementsByClassName('row')[0]
                    .getElementsByClassName('col-md-8')[0]
                    .getElementsByClassName('row')[0]

                const chapters = doc.getElementById('listChuong')

                render('title', title)
                render('image', image)
                render('status', status)
                render('chapters', chapters)
                render('sameAuthor', sameAuthor)
            })
            .catch(newError => setError(newError))
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            <Loading loading={loading}/>
            <AlertError>{error}</AlertError>
            <ViewStyle>
                <div className={`view ${loading && 'd-none'}`}>
                    <div className='row'>
                        <div className='col-md-9'>
                            <div id='title'/>
                            <div className='row'>
                                <div className='col-md-4' id='image'/>
                                <div className='col-md-8'>
                                    <div className='row mt-2' id='status'/>
                                    <div className='btn'>
                                        <a href="#" className="btn btn-primary">Đọc từ đầu</a>
                                        <a href="#" className="btn btn-primary">Đọc mới nhất</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3 border border-1 rounded'>
                            <div id='sameAuthor'/>
                        </div>
                    </div>
                    <div>
                        <h5 className="list-title">
                            <i className="fa fa-list fa-fw"/>
                            DANH SÁCH CHƯƠNG
                        </h5>
                        <div id='chapters'/>
                    </div>
                </div>
            </ViewStyle>
        </>
    );
};

export default View;