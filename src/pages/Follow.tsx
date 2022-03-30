import React, {useState} from 'react';
import {useListStory} from "../context/list/Provider";
import {HistoryStory} from "../context/list/type";
import TableStory from "../components/TableStory/TableStory";
import TableShareStory from "../components/TableStory/TableShareStory";
import {toast} from "react-toastify";

toast.configure()
const Follow = () => {
    const {history, flStory, getHistory} = useListStory()

    const [list, setList] = useState<HistoryStory[]>(() => {
        const arr = getHistory()

        return arr.filter(item => item.isFollow)
    })

    const [list2, setList2] = useState<HistoryStory[]>([])

    const handleChange = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result as string;
            setList2(() => {
                const arr = JSON.parse(text)
                const newArr = []
                arr.forEach(item => {
                    newArr.push({...item, source: 'khác'})
                })

                return newArr;
            })
        };
        reader.readAsText(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        list2.forEach(item => {
            const found = list.find(story => story.id === item.id)
            if (!found) {
                flStory(item, {isFollow: true})
            }
        })
        setList2([]);
        (document.getElementById('formFileSm') as HTMLInputElement).value = null
        toast.success('Tích hợp thành công!')
        setList(() => getHistory().filter(item => item.isFollow))
    }

    return (
        <div id='history'>
            <div className="alert alert-primary" role="alert">
                Tải lại trang nếu danh sách chưa cập nhật!
            </div>
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-list-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-list" type="button" role="tab" aria-controls="pills-list"
                            aria-selected="true">Danh sách
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-share-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-share" type="button" role="tab" aria-controls="pills-share"
                            aria-selected="false">Chia sẻ
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-integrate-tab" data-bs-toggle="pill"
                            data-bs-target="#pills-integrate" type="button" role="tab" aria-controls="pills-integrate"
                            aria-selected="false">Tích hợp
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="list-tabContent">
                <div className="tab-pane fade show active" id="pills-list" role="tabpanel"
                     aria-labelledby="pills-list-tab">
                    <div>
                        <p className='main-color col-auto text-center title'>Truyện đã theo dõi</p>
                        <div className='description'>
                            <div>{list[0]?.readDay} - {list[list.length - 1]?.readDay}</div>
                            <div>Tổng truyện đã theo dõi: {list?.length}</div>
                        </div>
                    </div>
                    <TableStory list={list.reverse()}/>
                </div>
                <div className="tab-pane fade" id="pills-share" role="tabpanel"
                     aria-labelledby="pills-share-tab">
                    <TableShareStory list={list}/>
                </div>
                <div className="tab-pane fade" id="pills-integrate" role="tabpanel"
                     aria-labelledby="pills-integrate-tab">
                    <div>
                        <p className='main-color col-auto text-center title'>Kiến tha lâu cũng đầy tổ.</p>
                        <div className='description'>
                            <p>
                                Chúng ta tồn tại nhờ những gì ta nhận
                                <br/>
                                nhưng chúng ta sống nhờ những gì cho đi
                            </p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className='mt-3'>
                        <div className='col-sm-6 col-12 ms-auto me-auto'>
                            <label htmlFor="formFileSm" className="form-label">Tải lên file share</label>
                            <div className='row'>
                                <div className="mb-3 col-10">
                                    <input
                                        className="form-control form-control-sm"
                                        id="formFileSm"
                                        type="file"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='col-2'>
                                    <button type="submit" className="btn btn-primary btn-sm"
                                            disabled={list2.length <= 0}>Tích hợp
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <h4>Truyện trong file</h4>
                    <TableStory list={list2}/>
                </div>
            </div>
        </div>
    );
};

export default Follow;