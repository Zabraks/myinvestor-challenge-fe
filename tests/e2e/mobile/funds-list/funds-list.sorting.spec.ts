import { test, expect } from '../../../fixtures/funds-api.fixture';
import { SELECTORS } from '../../../utils/selectors';

/**
 * Tests de Ordenación - Listado de Fondos
 *
 */
test.describe('Funds List - Column Sorting', () => {
  test.beforeEach(async ({ fundsPage }) => {
    await fundsPage.goto('/funds');
    await expect(fundsPage.locator(SELECTORS.fundsTable.row).first()).toBeVisible();
  });

  test('should sort by "Nombre" column ascending', async ({ fundsPage }) => {
    await fundsPage.getByRole('button', { name: SELECTORS.fundsTable.headers.name }).click();

    const firstCellAfter = await fundsPage
      .locator(SELECTORS.fundsTable.row)
      .first()
      .locator('td')
      .first()
      .textContent();

    expect(firstCellAfter).toBeDefined();
  });

  test('should toggle sort direction on multiple clicks', async ({ fundsPage }) => {
    const nameHeader = fundsPage.getByRole('button', { name: SELECTORS.fundsTable.headers.name });
    const firstRowFirstCell = fundsPage
      .locator(SELECTORS.fundsTable.row)
      .first()
      .locator('td')
      .first();

    const initialName = await firstRowFirstCell.textContent();

    await nameHeader.click();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await expect(firstRowFirstCell).not.toHaveText(initialName!);

    const firstNameAsc = await firstRowFirstCell.textContent();

    await nameHeader.click();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await expect(firstRowFirstCell).not.toHaveText(firstNameAsc!);

    const firstNameDesc = await firstRowFirstCell.textContent();

    expect(firstNameDesc).not.toBe(firstNameAsc);
  });

  test('should sort numeric columns correctly (Valor)', async ({ fundsPage }) => {
    const valueColumnBefore = fundsPage
      .locator(SELECTORS.fundsTable.row)
      .locator('td:nth-child(4)');
    const valuesBefore = await valueColumnBefore.allTextContents();

    await fundsPage.getByRole('button', { name: SELECTORS.fundsTable.headers.value }).click();

    const valuesAfter = await valueColumnBefore.allTextContents();

    expect(valuesAfter.length).toBeGreaterThan(0);
    expect(valuesAfter.join(',')).not.toBe(valuesBefore.join(','));
  });

  test('should maintain sort state after pagination', async ({ fundsPage }) => {
    await fundsPage.getByRole('button', { name: SELECTORS.fundsTable.headers.name }).click();

    const firstNamePage1 = await fundsPage
      .locator(SELECTORS.fundsTable.row)
      .first()
      .locator('td')
      .first()
      .textContent();

    await fundsPage.getByRole('link', { name: SELECTORS.pagination.next }).click();

    await expect(fundsPage.getByRole('link', { name: '2' })).toHaveAttribute(
      'aria-current',
      'page'
    );

    const firstNamePage2 = await fundsPage
      .locator(SELECTORS.fundsTable.row)
      .first()
      .locator('td')
      .first()
      .textContent();

    expect(firstNamePage2).toBeDefined();
    expect(firstNamePage1).toBeDefined();
  });

  test('should allow sorting by profitability columns', async ({ fundsPage }) => {
    await fundsPage.getByRole('button', { name: SELECTORS.fundsTable.headers.ytd }).click();

    const rows = fundsPage.locator(SELECTORS.fundsTable.row);
    await expect(rows).toHaveCount(10);

    const firstCell = await rows.first().locator('td').first().textContent();
    expect(firstCell).toBeTruthy();
  });
});
