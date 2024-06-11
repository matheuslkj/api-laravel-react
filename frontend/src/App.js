import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';  // ou qualquer outro tema que preferir
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";     
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
            <ToastContainer autoClose={3000} />
        </div>
    );
}

export default App;
