import React from 'react';
import '../styles/Login.scss'

const Login = () => {

    const changeForm = () => {
        const element = document.getElementById('mode')
        element.classList.toggle('sign-up-mode')
    }

    return (
        <div className='loginForm'>
            <div className="container" id='mode'>
                <div className="forms-container">
                    <div className="signin-signup">
                        <form action="#" className="sign-in-form">
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">
                                <i className="fas fa-user"/>
                                <input type="text" placeholder="Username"/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"/>
                                <input type="password" placeholder="Password"/>
                            </div>
                            <input type="submit" value="Login" className="btn solid"/>
                            <p className="social-text">Or Sign in with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon">
                                    <i className="fab fa-facebook-f"/>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-twitter"/>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-google"/>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-linkedin-in"/>
                                </a>
                            </div>
                        </form>
                        <form action="#" className="sign-up-form">
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <i className="fas fa-user"/>
                                <input type="text" placeholder="Username"/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope"/>
                                <input type="email" placeholder="Email"/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"/>
                                <input type="password" placeholder="Password"/>
                            </div>
                            <input type="submit" className="btn" value="Sign up"/>
                            <p className="social-text">Or Sign up with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon">
                                    <i className="fab fa-facebook-f"/>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-twitter"/>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-google"/>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-linkedin-in"/>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New here ?</h3>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                                ex ratione. Aliquid!
                            </p>
                            <button className="btn transparent" id="sign-up-btn" onClick={changeForm}>
                                Sign up
                            </button>
                        </div>
                        {/*<img src={loginImage} className="image" alt=""/>*/}
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>One of us ?</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                                laboriosam ad deleniti.
                            </p>
                            <button className="btn transparent" id="sign-in-btn" onClick={changeForm}>
                                Sign in
                            </button>
                        </div>
                        <img src="img/register.svg" className="image" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;