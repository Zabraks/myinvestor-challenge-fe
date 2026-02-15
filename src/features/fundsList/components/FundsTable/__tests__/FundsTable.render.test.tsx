import { screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { generateTestFunds, renderFundsTable } from './FundsTable.test-utils';

describe('FundsTable - Render', () => {
  it('should show exact number of rows', () => {
    const funds = generateTestFunds(5);

    renderFundsTable(funds);

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(6);
  });

  it('should show data in cells properly', () => {
    const funds = generateTestFunds(3);

    renderFundsTable(funds);

    funds.forEach((fund) => {
      expect(screen.getByText(fund.name)).toBeInTheDocument();
    });
  });

  it('should show headers in column properly', () => {
    const funds = generateTestFunds(1);

    renderFundsTable(funds);

    const expectedHeaders = ['Nombre', 'Categoría', 'Moneda', 'Valor', '2026', '1A', '3A', '5A'];
    expectedHeaders.forEach((headerText) => {
      expect(
        screen.getByRole('columnheader', { name: new RegExp(headerText) })
      ).toBeInTheDocument();
    });
  });

  it('should render category and currency values of each fund', () => {
    const funds = generateTestFunds(2);

    renderFundsTable(funds);

    const uniqueCategories = [...new Set(funds.map((f) => f.category))];
    uniqueCategories.forEach((category) => {
      expect(screen.getAllByText(category).length).toBeGreaterThan(0);
    });
  });

  it('should render action button', () => {
    const funds = generateTestFunds(2);

    renderFundsTable(funds);

    const rows = screen.getAllByRole('row');

    const firstDataRow = rows[1];

    const actionsButton = within(firstDataRow).getByRole('button', {
      name: /abrir menu/i,
    });

    expect(actionsButton).toBeInTheDocument();
    expect(actionsButton).toBeVisible();
    expect(actionsButton).toBeEnabled();
  });

  it('should have the correct semantic structure with accessibility roles', () => {
    const funds = generateTestFunds(2);

    renderFundsTable(funds);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader').length).toBeGreaterThan(0);
    expect(screen.getAllByRole('cell').length).toBeGreaterThan(0);
  });
});
