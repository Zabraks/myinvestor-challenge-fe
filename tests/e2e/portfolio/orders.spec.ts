import { test, expect } from '../../fixtures/funds-api.fixture';
import { SELECTORS } from '../../utils/selectors';

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
    // test('should display buy order after purchasing a fund', async ({ fundsPage, mockBuyApi }) => {
    //   await fundsPage.goto('/funds');

    //   await mockBuyApi({});

    //   const firstRowActionButton = fundsPage
    //     .locator(SELECTORS.fundsTable.row)
    //     .first()
    //     .getByRole('button', { name: SELECTORS.rowActions.trigger });

    //   await firstRowActionButton.click();

    //   const buyButton = fundsPage.getByRole('menuitem', { name: SELECTORS.rowActions.buy });
    //   await buyButton.click();

    //   const dialog = fundsPage.getByRole('dialog');
    //   const input = dialog.getByLabel(SELECTORS.buyDialog.inputName);
    //   await input.fill('100');

    //   const sendButton = dialog.getByRole('button', { name: SELECTORS.buyDialog.sendButton });
    //   await sendButton.click();

    //   await expect(dialog).toBeHidden();

    //   await fundsPage.goto('/portfolio');
    //   const ordersTab = fundsPage.getByRole('tab', { name: SELECTORS.portfolio.tabs.orders });
    //   await ordersTab.click();

    //   const buyBadge = fundsPage.getByText(SELECTORS.orders.types.buy);
    //   await expect(buyBadge).toBeVisible();

    //   const quantityText = fundsPage.getByText('+ 100');
    //   await expect(quantityText).toBeVisible();
    // });

    test('should display sell order after selling a fund', async ({ fundsPage, mockSellApi }) => {
      await fundsPage.goto('/portfolio');

      await mockSellApi({});

      const firstItem = fundsPage.getByRole('listitem').first();
      const actionButton = firstItem.getByRole('button', {
        name: SELECTORS.rowActions.trigger,
      });

      await actionButton.click();

      const sellButton = fundsPage.getByRole('menuitem', { name: SELECTORS.rowActions.sell });
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
    }) => {
      await fundsPage.goto('/portfolio');

      await mockTransferApi({});

      const firstItem = fundsPage.getByRole('listitem').first();
      const actionButton = firstItem.getByRole('button', {
        name: SELECTORS.rowActions.trigger,
      });

      await actionButton.click();

      const transferButton = fundsPage.getByRole('menuitem', {
        name: SELECTORS.rowActions.transfer,
      });
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

      const quantityText = fundsPage.getByText('25');
      await expect(quantityText).toBeVisible();
    });

    test('should display multiple orders when performing multiple actions', async ({
      fundsPage,
      mockTransferApi,
      mockSellApi,
    }) => {
      await fundsPage.goto('/portfolio');
      await mockTransferApi({});
      await mockSellApi({});

      const firstItem = fundsPage.getByRole('listitem').first();
      const actionButton = firstItem.getByRole('button', {
        name: SELECTORS.rowActions.trigger,
      });

      await actionButton.click();

      const transferButton = fundsPage.getByRole('menuitem', {
        name: SELECTORS.rowActions.transfer,
      });
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

      await actionButton.click();

      const sellButton = fundsPage.getByRole('menuitem', {
        name: SELECTORS.rowActions.sell,
      });
      await sellButton.click();

      const sellInput = dialog.getByLabel(SELECTORS.sellDialog.inputName);
      await sellInput.fill('1');

      await sendButton.click();

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
