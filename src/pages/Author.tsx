import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useListStory} from "../context/list/Provider";
import {Item} from "../components/Cards/Cards";
import Loading from "../components/Loading/Loading";
import AlertError from "../components/AlertError/AlertError";
import Card from "../components/Cards/Card";

const Author = () => {
    const params = useParams();
    const {getStoryByAuthor, loading, error, list} = useListStory()

    useEffect(() => {
        getStoryByAuthor(params.keys)
        document.title = `Tác giả ${params.keys}`
    }, [])

    return (
        <div>
            <Loading loading={loading}/>
            {!loading && (
                <>
                    <div id='searchAlert' className="alert alert-info mb-2">
                        Có <b>${list.length}</b> kết quả với từ khóa <b>${params.keys}</b>
                    </div>
                    <Item>
                        <AlertError>{error}</AlertError>
                        <div className='row'>
                            {list.length > 0 && list.map(item =>
                                <Card key={item.id} info={item}/>
                            )}
                        </div>
                    </Item>
                </>
            )}
        </div>
    );
};

export default Author;