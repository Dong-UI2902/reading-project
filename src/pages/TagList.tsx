import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import Cards from "../components/Cards/Cards";
import {Types} from "../context/list/constant";

const TagList = () => {
    const params = useParams();

    useEffect(() => {
        const title = Types.filter(item => item.id === Number(params.id))
        document.title = `Thể loại ${title[0].name}`
    }, [])

    return (
        <div>
            <Cards id={params.id} page={params.p}/>
        </div>
    );
};

export default TagList;