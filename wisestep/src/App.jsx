
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Park from './components/Park'

function App() {
 

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/park" element={<Park />} />

      </Routes>
         
    </div>
  )
}

export default App
