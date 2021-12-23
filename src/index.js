import React from 'react';
import ReactDOM from 'react-dom';
import App from './App Component/App';
import './index.css';
import { StateProvider }  from './StateProvider/StateProvider'
import reducer from './StateProvider/reducer';
import { initialState } from './StateProvider/reducer'
ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState}
      reducer = {reducer}>
      <App />
      </StateProvider>  
  </React.StrictMode>,
  document.getElementById('root')
);
