import React, {SyntheticEvent, useCallback, useEffect} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {NAME_STORE, PRODUCT, TOAST_MESSAGE} from "../context/constant/constants";
import {useStore} from "../context/store/Provider";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import FullEditor from 'ckeditor5-build-full'
import {DelayInput} from 'react-delay-input';
import {useAuth} from "../context/auth";

toast.configure()
const EditStore = () => {
        const {
            products,
            addProduct,
            updateProduct,
            deleteProduct,
            product,
            setProduct,
            findProduct,
            addHOT,
            rmHOT,
            backUp
        } = useStore();
        const {user} = useAuth();

        const getImage = useCallback((imageUrls) => {
            const arr = [];
            imageUrls.split('\n').forEach(image => {
                if (image) {
                    arr.push({url: image});
                }
            })

            return arr;
        }, [])

        const handleChange = (e) => {
            const {name, value} = e.target;
            if (name === 'image') {
                return setProduct(prevState => ({...prevState, image: getImage(value)}))
            }

            return setProduct(prevState => ({...prevState, [name]: value}));
        }

        const imageToText = useCallback((images) => {
            let str = '';

            images.forEach(image => {
                if (image.url) {
                    str = str + image.url + '\n'
                } else {
                    str = str + image + '\n'
                }
            })
            return str;
        }, [])

        const disableBtn = () => {
            const keys = ['detail', 'image', 'price', 'title', 'userfor'];

            for (let i = 0; i < keys.length; i++) {
                if (keys[i] === 'image') {
                    if (product[keys[i]].length === 0)
                        return true;
                }

                if (product[keys[i]] === null || product[keys[i]] === "")
                    return true;
            }

            return false;
        }

        const onSubmit = (e: SyntheticEvent) => {
            e.preventDefault();
            addProduct(product)
        }


        const updateProd = (e: SyntheticEvent) => {
            e.preventDefault();
            if (JSON.stringify(findProduct(product.id)) === JSON.stringify(product)) {
                return toast.info('Kh??ng c?? thay ?????i n??o ????? c???p nh???t')
            }

            return updateProduct(product)
        }

        const deleteProd = (e: SyntheticEvent) => {
            e.preventDefault();
            deleteProduct(product)
        }

        const resetForm = () => {
            setProduct(PRODUCT);
            (document.getElementById('search') as HTMLInputElement).value = ''
        }

        useEffect(() => {
            if (!user) {
                window.location.href = '/login'
            }
            document.title = 'Ch???nh s???a s???n ph???m';
            toast(TOAST_MESSAGE.greeting(<label className='main-color fw-bold'>{NAME_STORE} Store</label>));
        }, [])

        const handleSearch = (e) => {
            const {value} = e.target;
            if (!value) {
                return setProduct(PRODUCT);
            }

            const found = findProduct(value)
            if (found) {
                return setProduct(found)
            }

            return setProduct(PRODUCT);
        }

        const selectedText = (e) => {
            const {value} = e.target;
            const length = value.length;
            e.target.selectionStart = 0;
            e.target.selectionEnd = length;
        }

        const handleAdd = () => {
            addHOT()
        }

        const handleRemove = () => {
            rmHOT()
        }

        return (
            <div>
                <div className='row'>
                    <div className="col-md-4 col-12">
                        <DelayInput id='search'
                                    list="product"
                                    className="form-control"
                                    autoComplete='off'
                                    type="search"
                                    placeholder="T??m ki???m..."
                                    minLength={0}
                                    delayTimeout={1000}
                                    onChange={handleSearch}
                                    onFocus={selectedText}
                        />
                    </div>
                    <div className='col-12 col-md-8'>
                        {product.id && <>
                            <button type="button" className="btn btn-success" onClick={handleAdd}>Th??m v??o HOT
                            </button>
                            <button type="button" className="btn btn-danger ms-4" onClick={handleRemove}>Xo?? kh???i
                                HOT
                            </button>
                        </>}
                        <div className='float-end'>
                            <button type="button" className="btn btn-primary" onClick={() => backUp()}>Backup data
                            </button>
                        </div>
                    </div>
                </div>
                <div id="myDIV" className="mt-3">
                    <datalist id="product">
                        {products.map(
                            item => <option key={item.id} value={item.id}>{item.title}</option>,
                        )}
                    </datalist>
                </div>
                <form onSubmit={onSubmit}>
                    <div className='row'>
                        <div className="col-12 col-sm-6">
                            <label htmlFor="input1" className="form-label">Ti??u ?????</label>
                            <input type="text" onChange={handleChange} name='title' className="form-control" id="input1"
                                   value={product.title}/>
                        </div>
                        <div className="col-6 col-sm-3">
                            <label htmlFor="input2" className="form-label">Nh?? s???n xu???t</label>
                            <input type="text" onChange={handleChange} name='producer' className="form-control"
                                   id="input2" value={product.producer ? product.producer : ''}/>
                        </div>
                        <div className="col-6 col-sm-3">
                            <label htmlFor="input3" className="form-label">Ch???t li???u</label>
                            <input type="text" onChange={handleChange} name='madeof' className="form-control" id="input3"
                                   value={product.madeof ? product.madeof : ''}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 col-sm-3">
                            <label htmlFor="input4" className="form-label">D??ng cho</label>
                            <select id="input4" name='userfor' onChange={handleChange} className="form-select"
                                    value={product.userfor}>
                                <option>Nam</option>
                                <option>N???</option>
                            </select>
                        </div>
                        <div className="col-6 col-sm-3">
                            <label htmlFor="input5" className="form-label">S??? l?????ng</label>
                            <input type="number" onChange={handleChange} name='numberofprod' className="form-control"
                                   id="input5" value={product.numberofprod}/>
                        </div>
                        <div className="col-6 col-sm-3">
                            <label htmlFor="input6" className="form-label">Gi?? sale</label>
                            <input type="number" onChange={handleChange} name='sale' className="form-control" id="input6"
                                   value={product.sale ? product.sale : ''}/>
                            <div id="emailHelp" className="form-text">N???u c?? sale th?? s??? ??i???n gi?? g???c v??o ????y, kh??ng c?? th??
                                kh???i ??i???n.
                            </div>
                        </div>
                        <div className="col-6 col-sm-3">
                            <label htmlFor="input7" className="form-label">Gi??</label>
                            <input type="number" onChange={handleChange} name='price' className="form-control" id="input7"
                                   value={product.price}/>
                            <div id="emailHelp" className="form-text">N???u c?? sale th?? s??? ??i???n gi?? ???? sale v??o ????y.</div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className='row'>
                            <div className='col-12 col-sm-6'>
                                <div>
                                    <label htmlFor="input8" className="form-label mb-0">Link ???nh</label>
                                    <label className="form-label text-danger mb-0">(Xu???ng d??ng sau m???i link)</label>
                                    <textarea onChange={handleChange} name='image' className="form-control" id="input8"
                                              rows={10}
                                              value={imageToText(product.image)}/>
                                </div>
                                <div className='mt-1'>
                                    <p className='mb-0'>Log</p>
                                    <textarea id='log' className="form-control" rows={6} disabled/>
                                </div>
                                <div className="col-12 mt-3">
                                    {
                                        product.id ? <>
                                            <button type="button" className={`btn btn-primary`}
                                                    onClick={updateProd}>C???p nh???t
                                            </button>
                                            <button data-bs-toggle="modal" data-bs-target="#exampleModal" type="button"
                                                    className={`btn btn-danger ms-5`}
                                            >Xo??
                                            </button>
                                            <button type="button" className="btn btn-primary float-end"
                                                    onClick={resetForm}>L??m m???i
                                            </button>
                                        </> : <button type="submit" className="btn btn-primary" disabled={disableBtn()}>L??u
                                        </button>
                                    }
                                </div>
                            </div>
                            <div className='col-12 col-sm-6'>
                                <label htmlFor="input8" className="form-label mb-0">M?? t???</label>

                                <CKEditor
                                    editor={FullEditor}
                                    onChange={(event, editor) => {
                                        setProduct(prevState => {
                                            return {...prevState, detail: editor.getData()}
                                        })
                                    }}
                                    data={product.detail}
                                />
                            </div>
                        </div>
                    </div>
                </form>

                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger" id="exampleModalLabel">Th??ng b??o!</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                            </div>
                            <div className="modal-body">
                                D??? li???u b???n xo?? s??? kh??ng th??? kh??i ph???c l???i!<br/>
                                B???n v???n mu???n xo???
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                        onClick={deleteProd}>C??
                                </button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hu???</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
;

export default EditStore;