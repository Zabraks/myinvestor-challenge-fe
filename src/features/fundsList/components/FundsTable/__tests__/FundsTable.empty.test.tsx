import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { renderFundsTable } from './FundsTable.test-utils';

describe('FundsTable - Estado Vacío', () => {
  it('debe mostrar mensaje informativo cuando no hay fondos disponibles', () => {
    renderFundsTable([]);

    expect(screen.getByText('No results.')).toBeInTheDocument();
  });

  it('debe renderizar solo la fila de cabecera y la de mensaje vacío', () => {
    renderFundsTable([]);

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(2); // 1 header + 1 empty state row
  });
});
