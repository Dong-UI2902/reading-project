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
                    <h1 className="home__title">
                        CaoNhan Collection
                    </h1>
                    <p className="description">
                        Sở hữu bởi Namichu, người đứng đầu cộng đồng Cao Nhân Luôn Bay Group. Website được sáng lập với
                        mục đích phục vụ các nhu cầu của các thành viên trong group.
                    </p>
                </div>
            </div>
            <div className='platform'>
                <h2 className='title'>Namitoys Applications</h2>

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
            <div className='mt-4'>
                <p className="greeting description">
                    Chúng tôi luôn cung cấp cho bạn những dịch vụ tốt nhất.
                    <br/>
                    Hãy tận hưởng chúng, chúc các bạn vui vẻ!
                </p>
            </div>
            <p className="greeting description">
                ©
                <script>
                    document.write(new Date().getFullYear())
                </script>2022, made with
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>
                by
                <a href="https://discord.gg/xUyWPsx" target="_blank">CAOX</a> for a better web.
            </p>
        </section>
    </div>;
};

export default Home;