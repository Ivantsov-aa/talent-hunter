import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-phone-number-input/style.css";
import 'animate.css';
import './styles/index.scss';
import 'rc-slider/assets/index.css';

import ScrollToTop from './scroll-to-top';
import App from './App';

import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <ScrollToTop>
      <App store={store} />
    </ScrollToTop>
  </Router>
);