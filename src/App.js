import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TaskPage from './Pages/TaskPage/TaskPage';
import MainPage from './Pages/MainPage/MainPage';

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/:id' element={<TaskPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
