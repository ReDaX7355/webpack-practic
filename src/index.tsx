import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import App from './App';

const sum = (a: number, b: number): number => a + b;

console.log(sum(3, 6));

// Clear the existing HTML content
document.body.innerHTML = '<div id="root"></div>';

const rootElement = document.getElementById('root') as HTMLElement;

// Render your React component instead
const root = createRoot(rootElement);
root.render(<App />);
