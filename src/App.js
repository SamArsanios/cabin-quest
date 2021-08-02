import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/container/Home';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Home />
    </div>
  </BrowserRouter>
);

export default App;
