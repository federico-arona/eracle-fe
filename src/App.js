import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute'

import Login from './pages/Login'

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/dashboard"></PrivateRoute>
        {/* 
          <PrivateRoute path="/onlyAuthorizedAllowedHere/" component={MyComponent} />
        */}
        
      </BrowserRouter>
    </div>
  );
}

export default App;
