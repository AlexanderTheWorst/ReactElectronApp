import React from 'react';
import ReactDOM from 'react-dom/client'; // 👈 Use React 18's new `createRoot`

import App from './App';

document.addEventListener("DOMContentLoaded", (event) => {
    let root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />)
})