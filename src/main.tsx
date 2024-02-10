import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '~/main.css';
import { MonthCalendar } from '~/features/MonthCalendar';
import { Root } from '~/routes/Root';

const router = createBrowserRouter([
  {
    path: '/month/:year/:month',
    element: <MonthCalendar />,
  },
  {
    path: '/month',
    element: <MonthCalendar />,
  },
  {
    path: '/',
    element: <Root />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
