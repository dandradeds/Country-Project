import React from 'react' 
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/home'

function Rotas() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' exact element={<Home/>} />
                    
                </Routes>
            </BrowserRouter>
        

        
     );
}

export default Rotas;
