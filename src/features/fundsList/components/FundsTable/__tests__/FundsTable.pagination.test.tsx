import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import {
  generateTestFunds,
  renderFundsTable,
  getSortButtonForColumn,
} from './FundsTable.test-utils';

describe('FundsTable - Pagination', () => {
  it('should show pagination controls when there is more data than page limit', () => {
    const funds = generateTestFunds(25);

    renderFundsTable(funds, 10);

    expect(screen.getByRole('navigation', { name: /pagination/i })).toBeInTheDocument();
  });

  it('should not to show page controls when data is less than page limit', () => {
    const funds = generateTestFunds(5);

    renderFundsTable(funds, 10);

    expect(screen.queryByRole('navigation', { name: /pagination/i })).not.toBeInTheDocument();
  });

  it('should show first N rows in first page', () => {
    const funds = generateTestFunds(15);
    const pageSize = 5;

    renderFundsTable(funds, pageSize);

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(pageSize + 1);

    const expectedNames = funds.slice(0, pageSize).map((f) => f.name);
    expectedNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('should naviagate through next page when click "Siguiente" button"', async () => {
    const user = userEvent.setup();
    const funds = generateTestFunds(15);
    const pageSize = 5;

    renderFundsTable(funds, pageSize);

    const firstPageNames = funds.slice(0, pageSize).map((f) => f.name);

    firstPageNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    const nextButton = screen.getByRole('link', { name: /go to next page/i });
    await user.click(nextButton);

    const secondPageNames = funds.slice(pageSize, pageSize * 2).map((f) => f.name);
    secondPageNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    firstPageNames.forEach((name) => {
      expect(screen.queryByText(name)).not.toBeInTheDocument();
    });
  });

  it('should navigate to previous page when click in "Anterior" button', async () => {
    const user = userEvent.setup();
    const funds = generateTestFunds(15);
    const pageSize = 5;

    renderFundsTable(funds, pageSize);

    const nextButton = screen.getByRole('link', { name: /go to next page/i });
    await user.click(nextButton);

    const secondPageNames = funds.slice(pageSize, pageSize * 2).map((f) => f.name);
    secondPageNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    const prevButton = screen.getByRole('link', { name: /go to previous page/i });
    await user.click(prevButton);

    const firstPageNames = funds.slice(0, pageSize).map((f) => f.name);
    firstPageNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('should allow navigating to an specific page when click in its number', async () => {
    const user = userEvent.setup();
    const funds = generateTestFunds(30);
    const pageSize = 10;

    renderFundsTable(funds, pageSize);

    const page3Link = screen.getByRole('link', { name: '3' });
    await user.click(page3Link);

    const thirdPageNames = funds.slice(20, 30).map((f) => f.name);
    thirdPageNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('should not to show "Anterior" button en first page', () => {
    const funds = generateTestFunds(25);

    renderFundsTable(funds, 10);

    expect(screen.queryByRole('link', { name: /go to previous page/i })).not.toBeInTheDocument();
  });

  it('should not to show "Siguiente" in last page', async () => {
    const user = userEvent.setup();
    const funds = generateTestFunds(15);
    const pageSize = 10;

    renderFundsTable(funds, pageSize);

    const page2Link = screen.getByRole('link', { name: '2' });
    await user.click(page2Link);

    expect(screen.queryByRole('link', { name: /go to next page/i })).not.toBeInTheDocument();
  });
});

describe('FundsTable - sorting y pagination combinated', () => {
  it('should mantain the sort when page changes', async () => {
    const user = userEvent.setup();
    const funds = generateTestFunds(20);
    const pageSize = 5;

    renderFundsTable(funds, pageSize);

    const sortButton = getSortButtonForColumn(/Nombre/i);
    await user.click(sortButton);

    const sortedFunds = [...funds].sort((a, b) => a.name.localeCompare(b.name));

    const firstPageSorted = sortedFunds.slice(0, pageSize).map((f) => f.name);
    firstPageSorted.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    const nextButton = screen.getByRole('link', { name: /go to next page/i });
    await user.click(nextButton);

    const secondPageSorted = sortedFunds.slice(pageSize, pageSize * 2).map((f) => f.name);
    secondPageSorted.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });
});
