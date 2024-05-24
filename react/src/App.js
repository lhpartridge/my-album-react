import { Routes, Route } from 'react-router-dom'

import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from './components/Home'
import About from "./components/About"
import Artists from './components/Artists'
import Bands from './components/Bands'
import Albums from './components/Albums'
import Error from "./components/Error"

const App =()=> {

    return(
        <>
            <Header />
            <Routes>
                <Route path='/' element={ <Home />} />
                <Route path='/about' element={ <About />} />
                <Route path='/artists' element={ <Artists />} />
                <Route path='/bands' element={ <Bands />} />
                <Route path='/albums' element={ <Albums />} />
                <Route path='*' element={ <Error />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App