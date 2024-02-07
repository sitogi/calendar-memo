import { render, screen } from '@testing-library/react';

import { App } from '~/App';

test('render App component', () => {
  // Arrange
  const sut = <App />;

  // Action
  render(sut);

  // Assert
  expect(screen.getByText('Hello Vite React boilerplate!')).toBeInTheDocument();
});
