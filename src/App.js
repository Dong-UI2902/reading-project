import "./App.css";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Providers from "./pages/Provider";
import NavHeader from "./components/NavHeader";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Main from "./components/main/Main";
import {createGlobalStyle} from "styled-components";
import View from "./pages/View";
import Read from "./pages/Read";
import Type from "./pages/Type";
import Tag from "./pages/Tag";
import AllStory from "./pages/AllStory";
import ViewMobile from "./pages/ViewMobile";
import {isMobile} from "react-device-detect";
import Story from "./pages/Story";
import ViewProduct from "./pages/ViewProduct";
import {ThemeProvider} from "./theme/Provider";
import SexToy from "./pages/SexToy";
import About from "./pages/About";
import EditStore from "./pages/EditStore";

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${({theme}) => theme.colors.background}!important;
        * {
            color: ${({theme}) => theme.colors.text};
        }
    }
`

const App = () => {
    return (
        <ThemeProvider>
            <GlobalStyle/>
            <NavHeader/>
            <Main>
                <Providers>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route path="/store" element={<SexToy/>}/>
                        <Route path="/store/:page" element={<SexToy/>}/>
                        <Route path="/store/edit" element={<EditStore/>}/>
                        <Route path="/store/product/:id" element={<ViewProduct/>}/>
                        <Route path="/story" element={<Story/>}/>
                        <Route path="/story/:p" element={<AllStory/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/tag" element={<Tag/>}/>
                        <Route path="/type/:id/:p" element={<Type/>}/>
                        <Route path="/view/:id" element={isMobile ? <ViewMobile/> : <View/>}/>
                        <Route path="/view/:id/read/:chapter" element={<Read/>}/>
                    </Routes>
                </Providers>
            </Main>
        </ThemeProvider>
    );
}

export default App;
