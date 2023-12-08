import "./App.css";
import FirstPage from './pages/FirstPage'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import SecondPage from './pages/SecondPage';

function App() {
  return (
    <>
     
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<FirstPage/>} />
          <Route path='/second-page' element={<SecondPage/>} />
        </Routes>
        </BrowserRouter>
      
    </>
  )
}

export default App
