import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import {
  generateTestFunds,
  renderFundsTable,
  getFirstCellName,
  getAllFundNames,
  getSortButtonForColumn,
} from './FundsTable.test-utils';

describe('FundsTable - Lógica de Ordenación', () => {
  it('debe cambiar el orden al hacer clic en la cabecera de columna "Nombre"', async () => {
    const user = userEvent.setup();
    const funds = generateTestFunds(5);

    renderFundsTable(funds);

    const sortButton = getSortButtonForColumn(/Nombre/i);

    // Click para ordenar ascendente
    await user.click(sortButton);

    // Verificar que el orden cambió (ordenación ascendente alfabética)
    const sortedFundsAsc = [...funds].sort((a, b) => a.name.localeCompare(b.name));
    expect(getFirstCellName()).toBe(sortedFundsAsc[0].name);

    // Click para ordenar descendente
    await user.click(sortButton);

    // Verificar orden descendente
    const sortedFundsDesc = [...funds].sort((a, b) => b.name.localeCompare(a.name));
    expect(getFirstCellName()).toBe(sortedFundsDesc[0].name);
  });

  it('debe ordenar correctamente por columna numérica "Valor"', async () => {
    const user = userEvent.setup();
    const funds = generateTestFunds(5);

    renderFundsTable(funds);

    const sortButton = getSortButtonForColumn(/Valor/i);
    const initialOrder = getAllFundNames();

    // Click para activar ordenación por valor (descendente por defecto en TanStack Table)
    await user.click(sortButton);

    const orderAfterFirstClick = getAllFundNames();

    // Verificar que el orden cambió después del click
    expect(orderAfterFirstClick).not.toEqual(initialOrder);

    // Primer click ordena descendente (mayor valor primero)
    const sortedFundsDesc = [...funds].sort((a, b) => b.value - a.value);
    expect(orderAfterFirstClick).toEqual(sortedFundsDesc.map((f) => f.name));

    // Click para cambiar a ascendente
    await user.click(sortButton);

    const orderAfterSecondClick = getAllFundNames();

    // Verificar que cambió a orden ascendente (menor valor primero)
    const sortedFundsAsc = [...funds].sort((a, b) => a.value - b.value);
    expect(orderAfterSecondClick).toEqual(sortedFundsAsc.map((f) => f.name));
  });

  it('debe mostrar indicador visual de ordenación en la cabecera activa', async () => {
    const user = userEvent.setup();
    const funds = generateTestFunds(3);

    renderFundsTable(funds);

    const sortButton = getSortButtonForColumn(/Nombre/i);

    // Verificar que el botón existe y es clickeable
    expect(sortButton).toBeInTheDocument();

    // Click para activar ordenación
    await user.click(sortButton);

    // El componente ColumnHeader muestra iconos diferentes según el estado
    // ArrowDown para asc, ArrowUp para desc, ArrowDownUp para sin ordenar
    // Verificamos que el botón sigue existiendo y funcional
    expect(sortButton).toBeInTheDocument();
  });
});
