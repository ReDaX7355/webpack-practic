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
import Tickets from './components/Tickets/Tickets';
import TicketPage from './TicketPage';
import Todos from './Todos';
import { QueryClient, QueryClientProvider } from 'react-query';

const ticket_number = localStorage.getItem('currentTicketId');

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorBoundary />}>
      <Route index element={<Auth />} />
      <Route path="/data" element={<Data />} />
      <Route path="/tickets" element={<Tickets />} />
      <Route path="/ticket/:ticket_number" element={<TicketPage />} />
      <Route path="/todos" element={<Todos />} />
    </Route>
  )
);

const queryClient = new QueryClient();

// Clear the existing HTML content
document.body.innerHTML = '<div id="root"></div>';

const rootElement = document.getElementById('root') as HTMLElement;

// Render your React component instead
const root = createRoot(rootElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
