import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashborad';
import Products from './components/Pages/Products'
import Blogs from './components/Pages/Blogs';
import SignUp from './components/Credentials/SignUp';
import Login from './components/Credentials/Login';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';


function App() {

  return (
    <div>
      <Router>
      <Routes>
      <Route path='/signUp' element={<SignUp/>} />
      <Route path='/login' element={<Login/>} />
      <Route path = '/' element={<ProtectedRoute element={<Dashboard/>} />} />
      <Route path = '/products' element={<ProtectedRoute element={<Products/>} />} />
      <Route path = '/blogs' element={<ProtectedRoute element={<Blogs/>} />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
