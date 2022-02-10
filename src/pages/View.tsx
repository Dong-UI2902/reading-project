import React, {useEffect} from 'react';
import styled from "styled-components";
import '../styles/View.scss'
import Loading from "../components/Loading/Loading";
import AlertError from "../components/AlertError/AlertError";
import {useStory} from "../context/story/Provider";
import {useParams} from "react-router-dom";

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
const View = () => {
    const {error, loading, getStory} = useStory()
    const params = useParams();

    useEffect(() => {
        getStory(params.id)
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
                                    {/*<div className='btn'>*/}
                                    {/*    <a href="#" className="btn btn-primary">Đọc từ đầu</a>*/}
                                    {/*    <a href="#" className="btn btn-primary">Đọc mới nhất</a>*/}
                                    {/*</div>*/}
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
                </div>
            </ViewStyle>
        </>
    );
};

export default View;