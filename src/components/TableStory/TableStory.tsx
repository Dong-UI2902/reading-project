import React from 'react';
import '../../styles/History.scss'
import styled from "styled-components";
import {isMobile} from "react-device-detect";

export const Font = styled.div`
    font-size: ${isMobile ? '10px' : 'unset'};
    
    .name {
        max-width: 132px;
        text-overflow: ellipsis;
        overflow: hidden;
    }
`
const TableStory = ({list}) => {
    const handleClick = (item) => {
        window.location.href = `/view/${item.id}`
    }

    return (
        <div className='mt-3'>
            <Font>
                <div className='row mb-5'>
                    {list.length > 0 ? (
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Tên</th>
                                <th scope="col">Đang đọc</th>
                                <th scope="col">Nguồn</th>
                                <th scope="col">Thời gian</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                list.map(item => (
                                    <tr key={item.id} onClick={() => handleClick(item)} className='row-tb'>
                                        <th className='name'>{item.name}</th>
                                        <td>{item.chapterRead ? (item.chapterRead) : ('Chưa đọc')}</td>
                                        <td>{item.source}</td>
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
            </Font>
        </div>
    );
};

export default TableStory;