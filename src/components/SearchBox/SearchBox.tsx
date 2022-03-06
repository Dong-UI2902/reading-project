import React, {useState} from 'react';

const SearchBox = ({type, keys}) => {
    const [input, setInput] = useState({text: keys, type: type});

    const handleChange = (e) => {
        const {name, value} = e.target
        setInput(prevState => ({...prevState, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = `/search/${input.type}/${input.text}`;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='col-12 col-md-5 ms-auto me-auto'>
                    <div className='row'>
                        <div className='col-12 col-md-7 mb-3'>
                            <input
                                type="text"
                                name='text'
                                className="form-control"
                                placeholder='Nhập từ cần tìm'
                                defaultValue={input.text}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='col-md-5 d-flex justify-content-between mb-3'>
                            <select
                                className="form-select"
                                name='type'
                                aria-label="Default select example"
                                defaultValue={input.type}
                                onChange={handleChange}
                                style={{width: 'unset'}}
                            >
                                <option value="name">Tên truyện</option>
                                <option value="tacgia">Tác giả</option>
                                <option value="doujinshi">Doujinshi</option>
                            </select>
                            <button type="submit" className="btn btn-primary" disabled={input.text.length <= 0}>Tìm kiếm</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SearchBox;