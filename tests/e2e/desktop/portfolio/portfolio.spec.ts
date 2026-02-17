import { test, expect } from '../../../fixtures/funds-api.fixture';
import { SELECTORS } from '../../../utils/selectors';

test.describe('Portfolio - Funds section', () => {
  test('should display portfolio funds grouped by category', async ({ fundsPage }) => {
    await fundsPage.goto('/portfolio');

    const fundsTab = fundsPage.getByRole('tab', { name: SELECTORS.portfolio.tabs.funds });
    await expect(fundsTab).toHaveAttribute('data-state', 'active');

    const cardTitle = fundsPage.getByRole('heading', { name: SELECTORS.portfolio.card.title });
    await expect(cardTitle).toBeVisible();

    const portfolioPanel = fundsPage.getByRole('tabpanel', { name: /fondos/i });
    const portfolioItems = portfolioPanel.getByRole('listitem');
    await expect(portfolioItems).toHaveCount(3);
  });

  test('should display each portfolio item with name, quantity and value', async ({
    fundsPage,
  }) => {
    await fundsPage.goto('/portfolio');

    const portfolioPanel = fundsPage.getByRole('tabpanel', { name: /fondos/i });
    const firstItem = portfolioPanel.getByRole('listitem').first();

    await expect(firstItem).toBeVisible();

    const unitsLabel = firstItem.getByText(SELECTORS.portfolio.item.units);
    await expect(unitsLabel).toBeVisible();

    const valorLabel = firstItem.getByText(SELECTORS.portfolio.item.valor);
    await expect(valorLabel).toBeVisible();
  });

  test('should display portfolio with category headers', async ({ fundsPage }) => {
    await fundsPage.goto('/portfolio');

    const categoryHeaders = fundsPage.locator('h3');

    await expect(categoryHeaders.first()).toBeVisible();
  });

  test('should show error message when portfolio API fails', async ({
    fundsPage,
    mockPortfolioApi,
  }) => {
    await mockPortfolioApi({
      shouldFail: true,
    });

    await fundsPage.goto('/portfolio');

    const errorTitle = fundsPage.getByText(SELECTORS.portfolio.error.title, { exact: true });
    await expect(errorTitle).toBeVisible();

    const errorDescription = fundsPage.getByText(SELECTORS.portfolio.error.description, {
      exact: false,
    });
    await expect(errorDescription).toBeVisible();
  });

  test('should show empty state when portfolio has no funds', async ({
    fundsPage,
    mockPortfolioApi,
  }) => {
    await mockPortfolioApi({
      empty: true,
    });

    await fundsPage.goto('/portfolio');

    const emptyTitle = fundsPage.getByText(SELECTORS.portfolio.emptyState.title);
    await expect(emptyTitle).toBeVisible();

    const emptyDescription = fundsPage.getByText(SELECTORS.portfolio.emptyState.description);
    await expect(emptyDescription).toBeVisible();

    const viewFundsButton = fundsPage.getByRole('button', {
      name: SELECTORS.portfolio.emptyState.button,
    });
    await expect(viewFundsButton).toBeVisible();
  });

  test('should navigate to funds page when clicking empty state button', async ({
    fundsPage,
    mockPortfolioApi,
  }) => {
    await mockPortfolioApi({
      empty: true,
    });

    await fundsPage.goto('/portfolio');

    const viewFundsButton = fundsPage.getByRole('button', {
      name: SELECTORS.portfolio.emptyState.button,
    });
    await viewFundsButton.click();

    await expect(fundsPage).toHaveURL(/\/funds/);
  });

  test('should allow opening action menu on portfolio item', async ({ fundsPage }) => {
    await fundsPage.goto('/portfolio');

    const portfolioPanel = fundsPage.getByRole('tabpanel', { name: /fondos/i });
    const firstItem = portfolioPanel.getByRole('listitem').first();
    const actionButton = firstItem.getByRole('button', {
      name: SELECTORS.rowActions.trigger,
    });

    await actionButton.click();

    const buyOption = fundsPage.getByRole('menuitem', { name: SELECTORS.rowActions.buy });
    const sellOption = fundsPage.getByRole('menuitem', { name: SELECTORS.rowActions.sell });
    const transferOption = fundsPage.getByRole('menuitem', { name: SELECTORS.rowActions.transfer });
    const detailOption = fundsPage.getByRole('menuitem', {
      name: SELECTORS.rowActions.viewDetails,
    });

    await expect(buyOption).toBeVisible();
    await expect(sellOption).toBeVisible();
    await expect(transferOption).toBeVisible();
    await expect(detailOption).toBeVisible();
  });
});
