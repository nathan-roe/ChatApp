import Main from './views/main/Main';
import Login from './views/log_and_reg/Login';
import Register from './views/log_and_reg/Register';
import NewRoom from './components/main/NewRoom';

import {Router} from '@reach/router';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <Router>
        < Login path="/"/>
        < Register path="/register"/>
        < Main path="/main/:userId/:roomId"/>
        < NewRoom path='/newRoom/:userId/:roomId'/>
      </Router>
    </div>
  );
}

export default App;
