import { useState } from 'react'
import{BrowserRouter as Router,Route,Routes} from 'react-router-dom'

import Footer from './components/estructura/Footer'
import NavBar from './components/estructura/NavBar'
import Incio from './components/estructura/Incio'
import Categoria from './components/paginas/Categoria'
import Libros from './components/paginas/Libros'

const App = () => {


  return (
    <>
        <Router>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Incio/>}/>
            <Route path="/categorias" element={<Categoria/>}/>
            <Route path="/libros" element={<Libros/>}/>
           
          </Routes>

        </Router> 
    </>
  )
}

export default App
