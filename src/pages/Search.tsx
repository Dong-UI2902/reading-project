import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useListStory} from "../context/list/Provider";
import Loading from "../components/Loading/Loading";
import {Item} from "../components/Cards/Cards";
import AlertError from "../components/AlertError/AlertError";
import Card from "../components/Cards/Card";
import SearchBox from "../components/SearchBox/SearchBox";

const Search = () => {
    const {type, keys} = useParams();
    const {searchStory, loading, error, list} = useListStory();

    const setTitle = () => {
        document.title = `Tìm kiếm ${keys}`
    }

    useEffect(() => {
        const text =
            `key=${keys.replaceAll(' ', '+')}&type=${type}`;
        setTitle()

        return searchStory(text)
    }, [])

    return (
        <div>
            <SearchBox type={type} keys={keys}/>
            <div>
                <Loading loading={loading}/>
                {!loading && (
                    <>
                        <div id='searchAlert' className="alert alert-info mb-2">Có <b
                            className='text-danger'>{list.length}</b> kết quả với từ khóa <b
                            className='main-color'>{keys}</b>
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
        </div>
    );
};

export default Search;