import { test, expect } from '../../../fixtures/funds-api.fixture';
import { SELECTORS } from '../../../utils/selectors';

test.describe('Menu', () => {
  test('should navigate to porfolio', async ({ fundsPage }) => {
    await fundsPage.goto('/funds');
    const portfolioMenuItem = fundsPage.getByRole('link', { name: SELECTORS.menu.portfolio.title });
    await portfolioMenuItem.click();
    await expect(fundsPage).toHaveURL('http://localhost:5173/portfolio');

    await expect(
      fundsPage.getByRole('heading', { name: SELECTORS.portfolio.card.title })
    ).toBeVisible();
  });

  test('should navigate to funds', async ({ fundsPage }) => {
    await fundsPage.goto('/portfolio');

    const portfolioMenuItem = fundsPage.getByRole('link', { name: SELECTORS.menu.funds.title });
    await portfolioMenuItem.click();
    await expect(fundsPage).toHaveURL('http://localhost:5173/funds');
    await expect(
      fundsPage.getByRole('heading', { name: SELECTORS.fundsTable.title })
    ).toBeVisible();
  });
});
