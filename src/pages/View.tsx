import React, {useEffect} from 'react';
import styled from "styled-components";
import '../styles/View.scss'
import Loading from "../components/Loading/Loading";
import AlertError from "../components/AlertError/AlertError";
import {useStory} from "../context/story/Provider";
import {useParams} from "react-router-dom";
import {isMobile} from "react-device-detect";
import {useListStory} from "../context/list/Provider";
import {toast} from "react-toastify";

export const ViewStyle = styled.div`
    #status {
        div.col-8 {
            color: ${({theme}) => theme.colors.text}!important;
        }
    }
    
    h2 {
        color: #db0075!important;
        border-bottom: 1px solid ${({theme}) => theme.colors.text};
        font-size: 16px;
        margin: 10px 0;
        text-align: center;
        font-weight: 600;
    }
    
    button {
        color: ${({theme}) => theme.colors.text}
    }
    
    #chapters {     
        ul {
            padding-left: 0;
        }
        
        a {
            color: ${({theme}) => theme.colors.text}!important;
        }
    }
`
toast.configure()
const View = () => {
    const {error, loading, getStory} = useStory()
    const {id} = useParams();

    const {flStory, isFl, unFlStory, history} = useListStory()

    const getProps = () => {
        const name = document.title;
        return {id, name}
    }

    const handleClickFl = () => {
        flStory(getProps(), {isFollow: true, source: 'tôi'})
        toast.success('Bạn đã theo dõi truyện này')
    }

    const handleClickUnFl = () => {
        unFlStory(id)
        toast.warning('Bạn đã huỷ theo dõi truyện này')
    }


    useEffect(() => {
        getStory(id)
    }, [])

    return (
        <>
            <Loading loading={loading}/>
            <AlertError>{error}</AlertError>
            <ViewStyle>
                <div className={`view ${loading && 'd-none'}`}>
                    {isMobile ? (
                        <>
                            <div className='row'>
                                <div id='image'/>
                            </div>
                            <div className='mt-4'>
                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="chapters-tab" data-bs-toggle="pill"
                                                data-bs-target="#chapters" type="button" role="tab"
                                                aria-controls="chapters"
                                                aria-selected="true">Danh Sách Chương
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                                data-bs-target="#infoStory" type="button" role="tab"
                                                aria-controls="infoStory" aria-selected="false">Thông Tin Truyện
                                        </button>
                                    </li>

                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="chapters" role="tabpanel"
                                         aria-labelledby="pills-home-tab">
                                        <div id='chapters'/>
                                    </div>
                                    <div className="tab-pane fade" id="infoStory" role="tabpanel"
                                         aria-labelledby="pills-profile-tab">
                                        <div id='infoStory'/>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='row'>
                                <div className='col-md-9'>
                                    <div id='title'/>
                                    <div className='row'>
                                        <div className='col-md-4' id='image'/>
                                        <div className='col-md-8'>
                                            <div className='row mt-2' id='status'/>
                                            {/*<div className='btn'>*/}
                                            {/*    <a href="#" className="btn btn-primary">Đọc từ đầu</a>*/}
                                            {/*    <a href="#" className="btn btn-primary">Đọc mới nhất</a>*/}
                                            {/*</div>*/}

                                            <div className="mt-2 mb-3 follow-btn">
                                                <div>
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
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-3 border border-1 rounded'>
                                    <div id='sameAuthor'/>
                                </div>
                            </div>
                            <div>
                                <div id='chapters'/>
                            </div>
                        </>
                    )}
                </div>
            </ViewStyle>
        </>
    );
};

export default View;