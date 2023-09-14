import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home';
import LogInPage from './pages/login';

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LogInPage/>} />
          {/* <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/contact" element={<ContactPage/>} /> */}
        </Routes>
    </>
  );
}

export default App;
