import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';

const main = document.createElement('div');
main.id = 'root';
document.body.appendChild(main);

ReactDOM.render(<App />, main);