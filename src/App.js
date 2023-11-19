import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <HashRouter>
      <Routes>

        <Route path='/' element={<>home page</>} />
        <Route path='/about' element={<>About page</>} />
        <Route path='/contact' element={<>contact page</>} />

      </Routes>
    </HashRouter>
  )
}

export default App