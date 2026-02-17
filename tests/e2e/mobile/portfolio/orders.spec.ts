import { test, expect } from '../../../fixtures/funds-api.fixture';
import { SELECTORS } from '../../../utils/selectors';

test.describe('Portfolio - Orders section', () => {
  test.describe('Navigation', () => {
    test('should navigate to orders tab using tabs', async ({ fundsPage }) => {
      await fundsPage.goto('/portfolio');

      const fundsTab = fundsPage.getByRole('tab', { name: SELECTORS.portfolio.tabs.funds });
      await expect(fundsTab).toHaveAttribute('data-state', 'active');

      const ordersTab = fundsPage.getByRole('tab', { name: SELECTORS.portfolio.tabs.orders });
      await ordersTab.click();

      await expect(ordersTab).toHaveAttribute('data-state', 'active');

      const ordersTitle = fundsPage.getByRole('heading', { name: SELECTORS.orders.card.title });
      await expect(ordersTitle).toBeVisible();
    });
  });

  test.describe('Empty state', () => {
    test('should show empty state message when no orders exist', async ({ fundsPage }) => {
      await fundsPage.goto('/portfolio');

      const ordersTab = fundsPage.getByRole('tab', { name: SELECTORS.portfolio.tabs.orders });
      await ordersTab.click();

      const emptyTitle = fundsPage.getByText(SELECTORS.orders.emptyState.title);
      await expect(emptyTitle).toBeVisible();

      const emptyDescription = fundsPage.getByText(SELECTORS.orders.emptyState.description);
      await expect(emptyDescription).toBeVisible();
    });
  });

  test.describe('Order creation on actions', () => {
    test('should display sell order after selling a fund', async ({
      fundsPage,
      mockSellApi,
      swipeItem,
    }) => {
      await fundsPage.goto('/portfolio');

      await mockSellApi({});

      const portfolioPanel = fundsPage.getByRole('tabpanel', { name: /fondos/i });
      const firstItem = portfolioPanel.getByRole('listitem').first();
      await expect(firstItem).toBeVisible();

      await swipeItem(firstItem);

      const sellButton = fundsPage.getByText(SELECTORS.swipeActions.sell).first();
      await sellButton.click();

      const dialog = fundsPage.getByRole('dialog');
      const input = dialog.getByLabel(SELECTORS.sellDialog.inputName);
      await input.fill('50');

      const sendButton = dialog.getByRole('button', { name: SELECTORS.sellDialog.sendButton });
      await sendButton.click();

      await expect(dialog).toBeHidden();

      const ordersTab = fundsPage.getByRole('tab', { name: SELECTORS.portfolio.tabs.orders });
      await ordersTab.click();

      const sellBadge = fundsPage.getByText(SELECTORS.orders.types.sell);
      await expect(sellBadge).toBeVisible();

      const quantityText = fundsPage.getByText('- 50');
      await expect(quantityText).toBeVisible();
    });

    test('should display transfer order after transferring a fund', async ({
      fundsPage,
      mockTransferApi,
      swipeItem,
    }) => {
      await fundsPage.goto('/portfolio');

      await mockTransferApi({});

      const portfolioPanel = fundsPage.getByRole('tabpanel', { name: /fondos/i });
      const firstItem = portfolioPanel.getByRole('listitem').first();
      await expect(firstItem).toBeVisible();

      await swipeItem(firstItem);

      const transferButton = fundsPage.getByText(SELECTORS.swipeActions.transfer).first();
      await transferButton.click();

      const dialog = fundsPage.getByRole('dialog');
      const input = dialog.getByLabel(SELECTORS.transferDialog.inputName);
      await input.fill('25');

      const fundSelect = dialog.getByRole('combobox');
      await fundSelect.click();

      const fundOption = fundsPage.getByRole('option').first();
      await fundOption.click();

      const sendButton = dialog.getByRole('button', { name: SELECTORS.transferDialog.sendButton });
      await sendButton.click();

      await expect(dialog).toBeHidden();

      const ordersTab = fundsPage.getByRole('tab', { name: SELECTORS.portfolio.tabs.orders });
      await ordersTab.click();

      const transferBadge = fundsPage.getByText(SELECTORS.orders.types.transfer);
      await expect(transferBadge).toBeVisible();

      const quantityText = fundsPage.getByText('25', { exact: true });
      await expect(quantityText).toBeVisible();
    });

    test('should display multiple orders when performing multiple actions', async ({
      fundsPage,
      mockTransferApi,
      mockSellApi,
      swipeItem,
    }) => {
      await fundsPage.goto('/portfolio');
      await mockTransferApi({});
      await mockSellApi({});

      const portfolioPanel = fundsPage.getByRole('tabpanel', { name: /fondos/i });
      const firstItem = portfolioPanel.getByRole('listitem').first();
      await expect(firstItem).toBeVisible();

      await swipeItem(firstItem);

      const transferButton = fundsPage.getByText(SELECTORS.swipeActions.transfer).first();
      await transferButton.click();

      const dialog = fundsPage.getByRole('dialog');
      const input = dialog.getByLabel(SELECTORS.transferDialog.inputName);
      await input.fill('1');

      const fundSelect = dialog.getByRole('combobox');
      await fundSelect.click();

      const fundOption = fundsPage.getByRole('option').first();
      await fundOption.click();

      const sendButton = dialog.getByRole('button', { name: SELECTORS.transferDialog.sendButton });
      await sendButton.click();

      await expect(dialog).toBeHidden();

      await swipeItem(firstItem);

      const sellButton = fundsPage.getByText(SELECTORS.swipeActions.sell).first();
      await sellButton.click();

      const sellInput = dialog.getByLabel(SELECTORS.sellDialog.inputName);
      await sellInput.fill('1');

      const sellSendButton = dialog.getByRole('button', { name: SELECTORS.sellDialog.sendButton });
      await sellSendButton.click();

      await expect(dialog).toBeHidden();

      const ordersTab = fundsPage.getByRole('tab', { name: SELECTORS.portfolio.tabs.orders });
      await ordersTab.click();

      const transferBadge = fundsPage.getByText(SELECTORS.orders.types.transfer);
      const sellBadge = fundsPage.getByText(SELECTORS.orders.types.sell);

      await expect(transferBadge).toBeVisible();
      await expect(sellBadge).toBeVisible();
    });
  });
});
