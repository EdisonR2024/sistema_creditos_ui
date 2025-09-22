import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Principal from './componentes/Principal';
import PrincipalOperaciones from './componentes/Operaciones/PrincipalOperaciones';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/operaciones" element={<PrincipalOperaciones />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
