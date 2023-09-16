
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Screens/Home';
import Addres from './Components/Screens/Addres';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/address/:id' element={<Addres />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
