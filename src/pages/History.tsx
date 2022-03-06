import React, {useState} from 'react';
import {useListStory} from "../context/list/Provider";
import {History_Story} from "../context/list/type";
import TableStory from "../components/TableStory/TableStory";

const History = () => {
    const {getHistory} = useListStory()
    const [list, setList] = useState<History_Story[]>(() => {
        const arr = getHistory()

        return arr.filter(item => item.chapterRead)
    })

    return <TableStory list={list.reverse()} name={'Truyện đã đọc'}/>;
};

export default History;