import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import App from './App';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Root from './Root';
import Data from './Data';
import ErrorBoundary from './ErrorBoundary';
import Auth from './Auth';
import Tickets from './Tickets';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorBoundary />}>
      <Route index element={<App />} />
      <Route path="/data" element={<Data />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/tickets" element={<Tickets />} />
    </Route>
  )
);

// Clear the existing HTML content
document.body.innerHTML = '<div id="root"></div>';

const rootElement = document.getElementById('root') as HTMLElement;

// Render your React component instead
const root = createRoot(rootElement);
root.render(<RouterProvider router={router} />);
