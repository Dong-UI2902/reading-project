import React, {useState} from 'react';
import {useListStory} from "../context/list/Provider";
import {HistoryStory} from "../context/list/type";
import TableStory from "../components/TableStory/TableStory";

const History = () => {
    const {getHistory} = useListStory()
    const [list, setList] = useState<HistoryStory[]>(() => {
        const arr = getHistory()

        return arr.filter(item => item.chapterRead)
    })

    return (
        <>
            <div className='mb-5'>
                <h2 className='main-color col-auto mb-3 text-center'>Truyện đã đọc</h2>
                <div
                    className='text-center text-muted'>{list[0]?.readDay} - {list[list.length - 1]?.readDay}</div>
                <div className='text-center text-muted'>Tổng truyện đã đọc: {list?.length}</div>
            </div>
            <TableStory list={list.reverse()}/>
        </>
    );
};

export default History;