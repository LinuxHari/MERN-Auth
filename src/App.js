import './App.css';
import { Routes,Route } from 'react-router-dom';
import Login from './Forms/Login';
import Signup from './Forms/Signup';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='*' element={<Signup/>}/>
        <Route/>
     </Routes>
    </div>
  );
}

export default App;
