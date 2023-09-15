import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';

const sum = (a: number, b: number): number => a + b;

console.log(sum(3, 6));

// Clear the existing HTML content
document.body.innerHTML = '<div id="root"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('root'));
root.render(<h1>Hello, world</h1>);
