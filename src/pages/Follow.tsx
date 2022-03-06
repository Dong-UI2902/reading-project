import React, {useState} from 'react';
import {useListStory} from "../context/list/Provider";
import {History_Story} from "../context/list/type";
import TableStory from "../components/TableStory/TableStory";

const Follow = () => {
    const {getHistory} = useListStory()
    const [list, setList] = useState<History_Story[]>(() => {
        const arr = getHistory()

        return arr.filter(item => item.isFollow)
    })

    return <TableStory list={list.reverse()} name={'Truyện đã theo dõi'}/>;
};

export default Follow;