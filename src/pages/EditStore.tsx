import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Product} from "./ViewProduct";

const EditStore = () => {
    const [product, setProduct] = useState<Product>({
        "id": 0,
        "image": [
            {
                "url": "https://drive.google.com/uc?export=view&id=1kJ3eg4SqmJra-Fz3NaJSGXJF0z6_vLEc",
                "form": "1"
            }
        ],
        "title": "",
        "producer": "",
        "madeof": "",
        "type": "",
        "detail": "",
        "userfor": "Nam",
        "numberofprod": "20",
        "price": "",
        "sale": ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setProduct({...product, [name]: value})
    }

    const getImage = (imageUrls) => {
        return imageUrls.split('\n');
    }

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        const arr = getImage(product.image)
        setProduct({...product, image: arr})
    }

    useEffect(() => {
        document.title = 'Chỉnh sửa sản phẩm'
    }, [])



    useEffect(() => {
        // fetch(txt).then(r => r.text())
        //     .then(text => {
        //         console.log('text decoded:', JSON.parse(text));
        //     });
    }, [])
    console.log(product)

    return (
        <div>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className='row'>
                    <div className="col-12 col-sm-6">
                        <label htmlFor="input1" className="form-label">Tiêu đề</label>
                        <input type="text" onChange={handleChange} name='title' className="form-control" id="input1" value={product.title}/>
                    </div>
                    <div className="col-6 col-sm-3">
                        <label htmlFor="input2" className="form-label">Nhà sản xuất</label>
                        <input type="text" onChange={handleChange} name='producer' className="form-control"
                               id="input2" value={product.producer}/>
                    </div>
                    <div className="col-6 col-sm-3">
                        <label htmlFor="input3" className="form-label">Chất liệu</label>
                        <input type="text" onChange={handleChange} name='madeof' className="form-control" id="input3" value={product.madeof}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 col-sm-3">
                        <label htmlFor="input4" className="form-label">Dùng cho</label>
                        <select id="input4" name='userfor' onChange={handleChange} className="form-select"
                                value={product.userfor}>
                            <option>Nam</option>
                            <option>Nữ</option>
                        </select>
                    </div>
                    <div className="col-6 col-sm-3">
                        <label htmlFor="input5" className="form-label">Số lượng</label>
                        <input type="number" onChange={handleChange} name='numberofprod' className="form-control"
                               id="input5" value={product.numberofprod}/>
                    </div>
                    <div className="col-6 col-sm-3">
                        <label htmlFor="input6" className="form-label">Giá sale</label>
                        <input type="number" onChange={handleChange} name='sale' className="form-control" id="input6" value={product.sale}/>
                        <div id="emailHelp" className="form-text">Nếu có sale thì sẽ điền giá gốc vào đây, không có thì
                            khỏi điền.
                        </div>
                    </div>
                    <div className="col-6 col-sm-3">
                        <label htmlFor="input7" className="form-label">Giá</label>
                        <input type="number" onChange={handleChange} name='price' className="form-control" id="input7" value={product.price}/>
                        <div id="emailHelp" className="form-text">Nếu có sale thì sẽ điền giá đã sale vào đây.</div>
                    </div>
                </div>
                <div className="mt-3">
                    <div>
                        <label htmlFor="input8" className="form-label mb-0">Link ảnh</label>
                        <div id="emailHelp" className="form-text text-danger mt-0">Xuống dòng sau mỗi link</div>
                        <textarea onChange={handleChange} name='image' className="form-control" id="input8" rows={6} value={product.numberofprod}/>
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <button type="submit" className="btn btn-primary">Lưu</button>
                </div>
            </form>
        </div>
    );
};

export default EditStore;