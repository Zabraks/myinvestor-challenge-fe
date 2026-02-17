import { test, expect } from '../../../fixtures/funds-api.fixture';
import { SELECTORS } from '../../../utils/selectors';

test.describe('Portfolio - Funds section', () => {
  test('should display portfolio funds grouped by category', async ({ fundsPage }) => {
    await fundsPage.goto('/portfolio');

    const fundsTab = fundsPage.getByRole('tab', { name: SELECTORS.portfolio.tabs.funds });
    await expect(fundsTab).toHaveAttribute('data-state', 'active');

    const cardTitle = fundsPage.getByRole('heading', { name: SELECTORS.portfolio.card.title });
    await expect(cardTitle).toBeVisible();

    const portfolioItems = fundsPage.getByText('Valor');
    await expect(portfolioItems).toHaveCount(3);
  });

  test('should display each portfolio item with name, quantity and value', async ({
    fundsPage,
  }) => {
    await fundsPage.goto('/portfolio');

    const participacionesLabel = fundsPage
      .getByText(SELECTORS.portfolio.item.participaciones)
      .first();
    await expect(participacionesLabel).toBeVisible();

    const valorLabel = fundsPage.getByText(SELECTORS.portfolio.item.valor).first();
    await expect(valorLabel).toBeVisible();
  });

  test('should display portfolio with category headers', async ({ fundsPage }) => {
    await fundsPage.goto('/portfolio');

    await expect(fundsPage.getByRole('listitem').first()).toBeVisible();

    const categoryHeaders = fundsPage.locator('h3');

    const count = await categoryHeaders.count();
    expect(count).toBeGreaterThan(0);
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

  test('should allow opening action menu on portfolio item', async ({ fundsPage, swipeItem }) => {
    await fundsPage.goto('/portfolio');

    const firstItem = fundsPage.getByRole('listitem').first();
    await expect(firstItem).toBeVisible();

    await swipeItem(firstItem);

    const buyOption = fundsPage.getByText(SELECTORS.swipeActions.buy).first();
    const sellOption = fundsPage.getByText(SELECTORS.swipeActions.sell).first();
    const transferOption = fundsPage.getByText(SELECTORS.swipeActions.transfer).first();
    const detailOption = fundsPage.getByText(SELECTORS.swipeActions.viewDetails).first();

    await expect(buyOption).toBeVisible();
    await expect(sellOption).toBeVisible();
    await expect(transferOption).toBeVisible();
    await expect(detailOption).toBeVisible();
  });
});
