import React from 'react';
import Cards from "../components/Cards/Cards";
import {useParams} from "react-router-dom";

const AllStory = () => {
    const params = useParams();

    return (
        <div>
            <Cards id={'new'} page={params.p}/>
        </div>
    );
};

export default AllStory;