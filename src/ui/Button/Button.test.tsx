import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders the label', () => {
    const label = 'Click me';

    render(<Button>{label}</Button>);

    expect(screen.getByRole('button', { name: label })).toBeInTheDocument();
  });
});
