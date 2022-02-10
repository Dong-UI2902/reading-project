import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {ViewStyle} from "./View";
import Loading from "../components/Loading/Loading";
import AlertError from "../components/AlertError/AlertError";
import {useStory} from "../context/story/Provider";

const ViewMobile = () => {
    const {error, loading, getStory} = useStory()
    const params = useParams();

    useEffect(() => {
        getStory(params.id)
    }, [])

    return (
        <div>
            <Loading loading={loading}/>
            <AlertError>{error}</AlertError>
            <ViewStyle>
                <div className={`view ${loading && 'd-none'}`}>
                    <div className='row'>
                        <div id='image'/>
                    </div>
                    <div className='mt-4'>
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="chapters-tab" data-bs-toggle="pill"
                                        data-bs-target="#chapters" type="button" role="tab" aria-controls="chapters"
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
                </div>
            </ViewStyle>
        </div>
    );
};

export default ViewMobile;