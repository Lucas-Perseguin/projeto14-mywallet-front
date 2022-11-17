import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login.js';
import SignUp from './Pages/SignUp/SignUp.js';
import Statement from './Pages/Statement/Statement.js';
import Insert from './Pages/Insert/Insert.js';
import Edit from './Pages/Edit/Edit.js';
import './Assets/reset.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<SignUp />} />
        <Route path="/extrato" element={<Statement />} />
        <Route path="/inserir/:isIncome" element={<Insert />} />
        <Route path="/editar/:entryId" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
