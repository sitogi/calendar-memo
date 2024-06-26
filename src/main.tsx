import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '~/main.css';
import { MonthCalendar } from '~/features/MonthCalendar';
import { WeekCalendar } from '~/features/WeekCalendar';
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
    path: '/week/:year/:month/:day',
    element: <WeekCalendar />,
  },
  {
    path: '/week',
    element: <WeekCalendar />,
  },
  {
    path: '/',
    element: <Root />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="text-gray-500">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
);
