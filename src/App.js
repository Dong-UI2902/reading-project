import "./App.css";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Providers from "./pages/Provider";
import NavHeader from "./components/NavHeader";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/main/Main";
import {createGlobalStyle} from "styled-components";

const GlobalStyle =createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.colors.background}!important;
    }
`

const App = () => {
    return (
        <Providers>
            <GlobalStyle/>
            <NavHeader/>
            <Main>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </Main>
        </Providers>
    );
}

export default App;
