import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Container from './components/container';
import DashboardContainer from './components/dashboardContainer';

const Index = () => {
    return (
        <BrowserRouter>
            <Container />
        </BrowserRouter>
    )
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
