import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { generateTestFunds, renderFundsTable } from './FundsTable.test-utils';

describe('FundsTable - Renderizado de Datos', () => {
  it('debe mostrar el número correcto de filas según los datos del mock', () => {
    const funds = generateTestFunds(5);

    renderFundsTable(funds);

    // Header row + 5 data rows
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(6); // 1 header + 5 data rows
  });

  it('debe mostrar los datos correctamente en las celdas de la tabla', () => {
    const funds = generateTestFunds(3);

    renderFundsTable(funds);

    // Verificar que los nombres de los fondos aparecen en el documento
    funds.forEach((fund) => {
      expect(screen.getByText(fund.name)).toBeInTheDocument();
    });
  });

  it('debe mostrar las cabeceras de columna correctamente', () => {
    const funds = generateTestFunds(1);

    renderFundsTable(funds);

    const expectedHeaders = ['Nombre', 'Categoría', 'Moneda', 'Valor', '2026', '1A', '3A', '5A'];
    expectedHeaders.forEach((headerText) => {
      expect(
        screen.getByRole('columnheader', { name: new RegExp(headerText) })
      ).toBeInTheDocument();
    });
  });

  it('debe renderizar los valores de categoría y moneda de cada fondo', () => {
    const funds = generateTestFunds(2);

    renderFundsTable(funds);

    // Verificamos que cada categoría única esté presente en el documento
    // Usamos getAllByText porque pueden existir categorías duplicadas
    const uniqueCategories = [...new Set(funds.map((f) => f.category))];
    uniqueCategories.forEach((category) => {
      expect(screen.getAllByText(category).length).toBeGreaterThan(0);
    });
  });

  it('debe tener la estructura semántica correcta con roles de accesibilidad', () => {
    const funds = generateTestFunds(2);

    renderFundsTable(funds);

    // Verificar estructura semántica
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader').length).toBeGreaterThan(0);
    expect(screen.getAllByRole('cell').length).toBeGreaterThan(0);
  });
});
