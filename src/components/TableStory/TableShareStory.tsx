import React, {useEffect, useState} from 'react';
import {Font} from "./TableStory";
import {ShareStory} from "../../context/list/type";

const TableShareStory = ({list}) => {
    const [share, setShare] = useState<ShareStory[]>(() => {
        const arr = [];
        list.forEach(item => {
            arr.push({...item, checked: false});
        })

        return arr;
    })

    useEffect(() => {
        setShare(() => {
            const arr = [];
            list.forEach(item => {
                arr.push({...item, checked: false});
            })

            return arr;
        })
    }, [list])

    const handleClick = () => {
        const arr = share.filter(item => item.checked)
        if (arr.length <= 0) {
            alert('Hãy chọn truyện bạn muốn chia sẻ')
        } else {
            arr.forEach(item => {
                delete item['checked'];
                delete item['source'];
                delete item['readDay'];
            })
            const data = new Blob([JSON.stringify(arr)], {type: 'text/csv'});
            const csvURL = window.URL.createObjectURL(data);
            const tempLink = document.createElement('a');
            tempLink.href = csvURL;
            tempLink.setAttribute('download', 'share.txt');
            tempLink.click();
        }
    }

    const handleSelectAll = (e) => {
        const {checked} = e.target
        const newArr = [];
        const length = share.length;
        for (let i = 0; i < length; i++) {
            newArr.push({...share[i], checked})
        }

        setShare(newArr);
    }

    const handleSelectItem = (e, item) => {
        const {checked} = e.target
        const newArr = [...share]
        const index = newArr.findIndex(story => story.id === item.id);
        newArr[index].checked = checked

        setShare(newArr);
    }

    return (
        <div>
            <div>
                <div>
                    <p className='main-color col-auto text-center title'>Lượm Lặt Để Cho</p>
                    <div className='description'>
                        <p>
                            Người ta có thể quên đi điều bạn nói,
                            <br/>
                            nhưng những gì bạn chia sẻ thì ko bao giờ nhạt phai.
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <button type="button" className="btn btn-link share-btn" onClick={handleClick}>Xuất file</button>
            </div>
            <Font>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Tên</th>
                        <th scope="col">Đang đọc</th>
                        <th scope="col">Nguồn</th>
                        <th scope="col">Thời gian</th>
                        <th scope="col">
                            Chọn
                            <input
                                className="form-check-input ms-2"
                                type="checkbox"
                                id="flexCheckDefault"
                                onChange={handleSelectAll}
                            />
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {share.map(item => (
                        <tr key={item.id}>
                            <th className='name'>{item.name}</th>
                            <td>{item.chapterRead ? (item.chapterRead) : ('Chưa đọc')}</td>
                            <td>{item.source}</td>
                            <td>{item.readDay}</td>
                            <td>
                                <div className="form-check">
                                    <input
                                        className="form-check-input ms-auto me-auto"
                                        type="checkbox"
                                        id="flexCheckDefault"
                                        onChange={(e) => handleSelectItem(e, item)}
                                        checked={item.checked}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Font>
        </div>
    );
};

export default TableShareStory;