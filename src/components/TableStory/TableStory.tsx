import React, {useState} from 'react';
import {Item} from "../Cards/Cards";
import '../../styles/History.scss'
import {History_Story} from "../../context/list/type";

const TableStory = ({list, name}) => {
    const [track, setTrack] = useState<History_Story[]>(list)
    const handleClick = (item) => {
        window.location.href = `/view/${item.id}`
    }

    return (
        <div id='history' className='mt-5'>
            <Item>
                <div>
                    <div className='mb-5'>
                        <h2 className='main-color col-auto mb-3 text-center'>{name}</h2>
                        <div
                            className='text-center text-muted'>{list[list.length - 1]?.readDay} - {list[0]?.readDay}</div>
                        <div className='text-center text-muted'>Tổng {name}: {list?.length}</div>
                    </div>
                    <div className='row mb-5'>
                        {list.length > 0 ? (
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Đang đọc dở</th>
                                    <th scope="col">Thời gian</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    track.map((item, index) => (
                                        <tr key={index} onClick={() => handleClick(item)} className='row-tb'>
                                            <td>{item.name}</td>
                                            <td>{item.chapterRead ? (item.chapterRead) : ('Chưa đọc')}</td>
                                            <td>{item.readDay}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </Item>
        </div>
    );
};

export default TableStory;