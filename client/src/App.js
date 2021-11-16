import './App.css';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import Nav from './components/Nav';
import Routing from './components/Routing';
import store from './Redux/store'
import Login from './components/Screens/login'

function App() {
  return (
    <Provider store ={store}>
      <BrowserRouter>
        <Nav/>
        <Routing/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
