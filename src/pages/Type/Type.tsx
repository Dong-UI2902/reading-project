import React from 'react';
import {useParams} from "react-router-dom";
import Cards from "../../components/Cards/Cards";

const Type = () => {
    const params = useParams();

    return (
        <div>
            <Cards id={params.id} page={params.p}/>
        </div>
    );
};

export default Type;