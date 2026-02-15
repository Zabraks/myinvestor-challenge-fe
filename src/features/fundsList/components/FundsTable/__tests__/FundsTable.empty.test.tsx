import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { renderFundsTable } from './FundsTable.test-utils';

describe('FundsTable - Estado Vacío', () => {
  it('should show an info message when there is not any available fund', () => {
    renderFundsTable([]);

    expect(screen.getByText('No results.')).toBeInTheDocument();
  });

  it('should render only header and an empty message', () => {
    renderFundsTable([]);

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(2);
  });
});
