import '../../assets/scss/App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import SignUp from './SignUp';
import SignIn from './SignIn';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route path="/" component={Dashboard} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
