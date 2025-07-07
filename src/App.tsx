import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Link} from 'react-router-dom';
import Login from './pages/login';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Link to="/login">로그인</Link>
      </Routes>
    </Router>

  )
}

export default App
