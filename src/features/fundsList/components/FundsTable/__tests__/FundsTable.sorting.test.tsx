import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import {
  generateTestFunds,
  renderFundsTable,
  getFirstCellName,
  getAllFundNames,
  getSortButtonForColumn,
} from './FundsTable.test-utils';

describe('FundsTable - Sorting', () => {
  it('should change order when click in "Nombre" header"', async () => {
    const user = userEvent.setup();
    const funds = generateTestFunds(5);

    renderFundsTable(funds);

    const sortButton = getSortButtonForColumn(/Nombre/i);

    await user.click(sortButton);

    const sortedFundsAsc = [...funds].sort((a, b) => a.name.localeCompare(b.name));
    expect(getFirstCellName()).toBe(sortedFundsAsc[0].name);

    await user.click(sortButton);

    const sortedFundsDesc = [...funds].sort((a, b) => b.name.localeCompare(a.name));
    expect(getFirstCellName()).toBe(sortedFundsDesc[0].name);
  });

  it('should sort "Valor" column properly', async () => {
    const user = userEvent.setup();
    const funds = generateTestFunds(5);

    renderFundsTable(funds);

    const sortButton = getSortButtonForColumn(/Valor/i);
    const initialOrder = getAllFundNames();

    await user.click(sortButton);

    const orderAfterFirstClick = getAllFundNames();

    expect(orderAfterFirstClick).not.toEqual(initialOrder);

    const sortedFundsDesc = [...funds].sort((a, b) => b.value - a.value);
    expect(orderAfterFirstClick).toEqual(sortedFundsDesc.map((f) => f.name));

    await user.click(sortButton);

    const orderAfterSecondClick = getAllFundNames();

    const sortedFundsAsc = [...funds].sort((a, b) => a.value - b.value);
    expect(orderAfterSecondClick).toEqual(sortedFundsAsc.map((f) => f.name));
  });

  it('should show icon to specify which kind of sorting is being applied', async () => {
    const user = userEvent.setup();
    const funds = generateTestFunds(3);

    renderFundsTable(funds);

    const sortButton = getSortButtonForColumn(/Nombre/i);

    expect(sortButton).toBeInTheDocument();

    await user.click(sortButton);

    expect(sortButton).toBeInTheDocument();
  });
});
