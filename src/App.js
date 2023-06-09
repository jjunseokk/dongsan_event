import './App.css';
import { Route, Routes } from "react-router-dom";
import Event from './pages/Event';
import Login from './pages/Login';
import Manager from './pages/Manager';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/event' element={<Event />} />
        <Route path='/manager' element={<Manager/>} />
      </Routes>
    </div>
  );
}

export default App;
