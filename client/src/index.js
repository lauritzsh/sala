import React from 'react';
import ReactDOM from 'react-dom';
import 'react-input-range/lib/css/index.css';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// Will help load assets much faster
serviceWorker.register();
