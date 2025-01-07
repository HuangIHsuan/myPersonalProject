import { Route, Routes } from 'react-router-dom'
// import './css/style.min.css'
import SongList from './pages/SongList'
import Home from './pages/Home'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/songlist' element={<SongList />}></Route>
    </Routes>
  )
}

export default App
