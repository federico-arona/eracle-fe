import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'

import Login from './pages/Login'
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
        <PrivateRoute path="/dashboard" component={Dashboard} />
        {/* 
          <PrivateRoute path="/onlyAuthorizedAllowedHere/" component={MyComponent} />
        */}
      </BrowserRouter>
    </div>
  );
}

export default App;
