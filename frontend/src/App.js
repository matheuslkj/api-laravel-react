// src/App.js
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // ou qualquer outro tema que preferir
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "react-toastify/dist/ReactToastify.css";
import './styles/global.css';
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Devs from './components/Devs';
import Levels from './components/Levels';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <div className="container">
                    <Routes>
                        <Route path='/' index element={<Home />} />
                        <Route path='/devs' element={<Devs />} />
                        <Route path='/niveis' element={<Levels />} />
                    </Routes>
                </div>
            </BrowserRouter>
            <ToastContainer autoClose={3000} />
        </div>
    );
}

export default App;
