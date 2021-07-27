import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import './chat.css';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import { useState } from 'react';
import { useStateValue } from './StateProvider';
const App=()=> {
  const [{user}, dispatch] = useStateValue();
 
  return (
    <div className="app">
      {!user ? (
       <Login/>
      ):(<div className="app_body">
        <Router>
         <Sidebar/>
          <Switch>
            <Route path='/ChatRooms/:ChatRoomsId'>
              <Chat />
            </Route>
            <Route path='/'>
             <Chat/>
            </Route>
            </Switch>
          </Router>
      </div>
      )}
      
    </div>
  );
}

export default App;
