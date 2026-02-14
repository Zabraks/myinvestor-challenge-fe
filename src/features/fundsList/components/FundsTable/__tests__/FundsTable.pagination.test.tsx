import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import {
  generateTestFunds,
  renderFundsTable,
  getSortButtonForColumn,
} from './FundsTable.test-utils';

describe('FundsTable - Paginación', () => {
  it('debe mostrar controles de paginación cuando hay más datos que el límite por página', () => {
    const funds = generateTestFunds(25);

    renderFundsTable(funds, 10);

    // Verificar que aparece la navegación de paginación
    expect(screen.getByRole('navigation', { name: /pagination/i })).toBeInTheDocument();
  });

  it('no debe mostrar controles de paginación cuando los datos caben en una página', () => {
    const funds = generateTestFunds(5);

    renderFundsTable(funds, 10);

    // No debería haber navegación de paginación
    expect(screen.queryByRole('navigation', { name: /pagination/i })).not.toBeInTheDocument();
  });

  it('debe mostrar solo los primeros N registros en la primera página', () => {
    const funds = generateTestFunds(15);
    const pageSize = 5;

    renderFundsTable(funds, pageSize);

    // Solo debe haber 5 filas de datos + 1 header
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(pageSize + 1);

    // Verificar que se muestran los primeros 5 fondos
    const expectedNames = funds.slice(0, pageSize).map((f) => f.name);
    expectedNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('debe navegar a la siguiente página al hacer clic en "Next"', async () => {
    const user = userEvent.setup();
    const funds = generateTestFunds(15);
    const pageSize = 5;

    renderFundsTable(funds, pageSize);

    // Obtener nombres de la primera página
    const firstPageNames = funds.slice(0, pageSize).map((f) => f.name);

    // Verificar primera página
    firstPageNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    // Click en "Next" para ir a página 2
    const nextButton = screen.getByRole('link', { name: /go to next page/i });
    await user.click(nextButton);

    // Verificar que se muestran los fondos de la segunda página
    const secondPageNames = funds.slice(pageSize, pageSize * 2).map((f) => f.name);
    secondPageNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    // Los fondos de la primera página ya no deberían estar visibles
    firstPageNames.forEach((name) => {
      expect(screen.queryByText(name)).not.toBeInTheDocument();
    });
  });

  it('debe navegar a la página anterior al hacer clic en "Anterior"', async () => {
    const user = userEvent.setup();
    const funds = generateTestFunds(15);
    const pageSize = 5;

    renderFundsTable(funds, pageSize);

    // Ir a página 2 primero
    const nextButton = screen.getByRole('link', { name: /go to next page/i });
    await user.click(nextButton);

    // Verificar que estamos en página 2
    const secondPageNames = funds.slice(pageSize, pageSize * 2).map((f) => f.name);
    secondPageNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    // Click en "Anterior" para volver a página 1
    const prevButton = screen.getByRole('link', { name: /go to previous page/i });
    await user.click(prevButton);

    // Verificar que volvimos a la primera página
    const firstPageNames = funds.slice(0, pageSize).map((f) => f.name);
    firstPageNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('debe permitir navegar a una página específica haciendo clic en el número', async () => {
    const user = userEvent.setup();
    const funds = generateTestFunds(30);
    const pageSize = 10;

    renderFundsTable(funds, pageSize);

    // Click en página 3
    const page3Link = screen.getByRole('link', { name: '3' });
    await user.click(page3Link);

    // Verificar que se muestran los fondos de la tercera página (índices 20-29)
    const thirdPageNames = funds.slice(20, 30).map((f) => f.name);
    thirdPageNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('no debe mostrar botón "Anterior" en la primera página', () => {
    const funds = generateTestFunds(25);

    renderFundsTable(funds, 10);

    // En la primera página no debe haber botón "Anterior"
    expect(screen.queryByRole('link', { name: /go to previous page/i })).not.toBeInTheDocument();
  });

  it('no debe mostrar botón "Next" en la última página', async () => {
    const user = userEvent.setup();
    const funds = generateTestFunds(15);
    const pageSize = 10;

    renderFundsTable(funds, pageSize);

    // Navegar a la última página (página 2)
    const page2Link = screen.getByRole('link', { name: '2' });
    await user.click(page2Link);

    // En la última página no debe haber botón "Next"
    expect(screen.queryByRole('link', { name: /go to next page/i })).not.toBeInTheDocument();
  });
});

describe('FundsTable - Ordenación y Paginación Combinadas', () => {
  it('debe mantener la ordenación al cambiar de página', async () => {
    const user = userEvent.setup();
    const funds = generateTestFunds(20);
    const pageSize = 5;

    renderFundsTable(funds, pageSize);

    // Ordenar por nombre ascendente
    const sortButton = getSortButtonForColumn(/Nombre/i);
    await user.click(sortButton);

    // Obtener el orden esperado
    const sortedFunds = [...funds].sort((a, b) => a.name.localeCompare(b.name));

    // Verificar primera página ordenada
    const firstPageSorted = sortedFunds.slice(0, pageSize).map((f) => f.name);
    firstPageSorted.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    // Ir a página 2
    const nextButton = screen.getByRole('link', { name: /go to next page/i });
    await user.click(nextButton);

    // Verificar segunda página mantiene el orden
    const secondPageSorted = sortedFunds.slice(pageSize, pageSize * 2).map((f) => f.name);
    secondPageSorted.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });
});
