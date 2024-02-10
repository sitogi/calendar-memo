import { JSX } from 'react';

import { Link } from 'react-router-dom';

export const Root = (): JSX.Element => {
  return (
    <div className="grid place-content-center w-dvw h-dvh bg-green-50">
      <h1 className="text-blue-300 text-4xl font-bold">Hello world!</h1>
      <Link to="/month/2024/2" className="p-2 border rounded">
        Month Calendar
      </Link>
    </div>
  );
};
