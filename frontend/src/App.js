import React from 'react';
import logo from './logo.svg';
import './App.css';

import Contacts from './components/Contacts';
import Edit from './components/Edit';
import {Route ,Switch} from 'react-router-dom'; 

function App() {
  return (
    <div>
      

          <Switch>
          <Route  exact={true} path="/" component={Contacts}/>
          <Route path="/edit/:id" component={Edit}/>
          </Switch>




    </div>
  );
}

export default App;
