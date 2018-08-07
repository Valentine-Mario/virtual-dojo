import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PersistentDrawer from './components/drawer/drawer';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const Index = () => {
  return (
    <BrowserRouter>
        <PersistentDrawer />
    </BrowserRouter>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
