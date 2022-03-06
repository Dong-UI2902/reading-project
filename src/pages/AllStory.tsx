import React, {useEffect} from 'react';
import Cards from "../components/Cards/Cards";
import {useParams} from "react-router-dom";
import SearchBox from "../components/SearchBox/SearchBox";

const AllStory = () => {
    const params = useParams();

    useEffect(() => {
    }, [])

    return (
        <div>
            <SearchBox keys={''} type={'name'}/>
            <h3>
                Danh sách truyện (trang {params.p})
            </h3>
            <Cards id={'new'} page={params.p}/>
        </div>
    );
};

export default AllStory;