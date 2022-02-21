import React, {ChangeEvent, useState} from 'react';
import '../styles/Login.scss'
import {AuthCredential, useAuth} from "../context/auth";

const Login = () => {
    const {login} = useAuth()

    const [input, setInput] = useState<AuthCredential>({
        username: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        login(input)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setInput({...input, [name]: value})
    }

    return (
        <div className='loginForm'>
            <div className="container" id='mode'>
                <div className="signin-signup">
                    <form onSubmit={handleSubmit} className="sign-in-form">
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-user"/>
                            <input type="text" onChange={handleChange} defaultValue={input.username} name='username'
                                   placeholder="Username"/>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"/>
                            <input type="password" onChange={handleChange} defaultValue={input.password} name='password'
                                   placeholder="Password"/>
                        </div>
                        <input type="submit" value="Login" className="btn solid"/>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;