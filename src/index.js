import React from 'react';
import ReactDOM from 'react-dom';

import { configureStore } from './store/configureStore';
import Root from './components/Root';

// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
