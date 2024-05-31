import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Link, Route} from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import Home from './components/Home';
import Devs from './components/Devs';
import Levels from './components/Levels';

function App() {
    // Defina o estado para armazenar os níveis

    return (
        <div className="App">
            <BrowserRouter>
                <Nav variant='tabs'>
                    <Nav.Link as={Link} to="/" >Home</Nav.Link>
                    <Nav.Link as={Link} to="/devs" >Desenvolvedores</Nav.Link>
                    <Nav.Link as={Link} to="/niveis" >Níveis</Nav.Link>
                </Nav>

                <Routes>
                    <Route path='/' index element={<Home/>}></Route>
                    <Route path='/devs' element={<Devs/>}></Route>
                    <Route path='/niveis' element={<Levels/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
