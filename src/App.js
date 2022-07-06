import { Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AddPage from './pages/AddPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div className='App'>
      <Header />

      <Switch>
        <Route exact path={'/register'}>
          <RegisterPage />
        </Route>
        <Route exact path={'/login'}>
          <LoginPage />
        </Route>
        <ProtectedRoute exact path={'/add'}>
          <AddPage />
        </ProtectedRoute>
        <ProtectedRoute exact path={'/'}>
          <HomePage />
        </ProtectedRoute>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
