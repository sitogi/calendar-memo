import { render, screen } from '@testing-library/react';

import { Root } from '~/routes/Root';

test('render Root component', () => {
  // Arrange
  const sut = <Root />;

  // Action
  render(sut);

  // Assert
  expect(screen.getByText('Hello world!')).toBeInTheDocument();
});
