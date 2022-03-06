import React, {useEffect} from 'react';
import '../styles/Home.scss'
import {Link} from "react-router-dom";

const Home = () => {
    const accessUrl = (app) => {
        if (app === 'store') {
            return document.getElementById(app).click();
        }

        return document.getElementById(app).click();
    }

    useEffect(() => {
        document.title = 'Trang chủ'
    }, [])

    return <div>
        <section>
            <div>
                <img src='/logo.png' alt="" className="home__img"/>
                <div className="home__data">
                    <h1 className="home__title main-color">
                        CaoNhan Collection
                    </h1>
                    <p className="description">
                        Sở hữu bởi Namichu, người đứng đầu cộng đồng Cao Nhân Luôn Bay Group. Website được sáng lập với
                        mục đích phục vụ các nhu cầu của các thành viên trong group.
                    </p>
                </div>
            </div>
            <div className='platform'>
                <h2 className='title main-color'>Namitoys Applications</h2>

                <div className='row'>
                    <div className='col-6' onClick={() => accessUrl('store')}>
                        <Link id='store' className='name-platform' to='/store'>Store</Link>
                        <div className='box'>
                            <img src='/logo.png' alt='lỗi'/>
                        </div>

                    </div>
                    <div className='col-6' onClick={() => accessUrl('story')}>
                        <Link id='story' className='name-platform' to='/story'>Hai-Ten</Link>
                        <div className='box'>
                            <img
                                src='/haiten.png'
                                alt='lỗi'/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>;
};

export default Home;