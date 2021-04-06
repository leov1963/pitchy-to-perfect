import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import Logout from './views/auth/Logout'; 
import Game from './views/app/Game'; 
import LandingPage from './views/app/LandingPage';
import ScoreBoard from './views/app/ScoreBoard'
import NotFoundPage from './views/app/NotFoundPage'

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/scoreboard' component={ScoreBoard} exact />
          <Route path='/game' component={Game} exact />
          <Route path='/login' component={Login} exact />
          <Route path='/signup' component={Signup} exact />
          <Route path='/logout' component={Logout} exact />
          <Route path='/' component={LandingPage} exact />
          <Route path='/404' component={NotFoundPage} exact />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;