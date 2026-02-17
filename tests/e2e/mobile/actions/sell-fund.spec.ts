import { test, expect } from '../../../fixtures/funds-api.fixture';
import { SELECTORS } from '../../../utils/selectors';
import type { CapturedFundAction } from '../../../utils/mock-data';

test.describe('Actions - Sell fund', () => {
  const MAX_QUANTITY = 75;

  test.beforeEach(async ({ fundsPage, swipeItem }) => {
    await fundsPage.goto('/portfolio');

    const portfolioPanel = fundsPage.getByRole('tabpanel', { name: /fondos/i });
    const fundItem = portfolioPanel.getByRole('listitem').first();
    await swipeItem(fundItem);

    const sellButton = fundsPage.getByText(SELECTORS.swipeActions.sell).first();
    await sellButton.click();
  });

  test('should open dialog with sellFund form clicking "Vender" action', async ({ fundsPage }) => {
    const dialog = fundsPage.getByRole('dialog');

    const titleDialog = dialog.getByRole('heading', { name: SELECTORS.sellDialog.title });
    await expect(titleDialog).toBeVisible();

    const input = dialog.getByLabel(SELECTORS.sellDialog.inputName);
    await expect(input).toBeVisible();
  });

  test('should open dialog with sellFund form and sell a fund successfully', async ({
    fundsPage,
    mockSellApi,
  }) => {
    let capturedPayload: CapturedFundAction | undefined;

    await mockSellApi({
      onCapture: (data) => {
        capturedPayload = data;
      },
    });

    const dialog = fundsPage.getByRole('dialog');

    const input = dialog.getByLabel(SELECTORS.sellDialog.inputName);
    await input.fill('50');

    const sendButton = dialog.getByRole('button', { name: SELECTORS.sellDialog.sendButton });
    await sendButton.click();

    const toastMsg = fundsPage.getByText(SELECTORS.toastMsg.sell.success);

    expect(capturedPayload?.quantity).toBe(50);
    await expect(dialog).toBeHidden();
    await expect(toastMsg).toBeVisible();
  });

  test('should open dialog with sellFund form and see a toast error message when api fails', async ({
    fundsPage,
    mockSellApi,
  }) => {
    await mockSellApi({
      shouldFail: true,
    });

    const dialog = fundsPage.getByRole('dialog');

    const input = dialog.getByLabel(SELECTORS.sellDialog.inputName);
    await input.fill('50');

    const sendButton = dialog.getByRole('button', { name: SELECTORS.sellDialog.sendButton });
    await sendButton.click();

    const toastMsg = fundsPage.getByText(SELECTORS.toastMsg.sell.error);

    await expect(dialog).toBeVisible();
    await expect(toastMsg).toBeVisible();
  });

  test('should open dialog with sellFund form and see a validation error when clear the input', async ({
    fundsPage,
  }) => {
    const dialog = fundsPage.getByRole('dialog');

    const input = dialog.getByLabel(SELECTORS.sellDialog.inputName);
    await input.clear();

    const sendButton = dialog.getByRole('button', { name: SELECTORS.sellDialog.sendButton });
    await sendButton.click();

    const errorMsg = fundsPage.getByText(SELECTORS.validations.sell.number);

    await expect(errorMsg).toBeVisible();
    await expect(dialog).toBeVisible();
  });

  test('should open dialog with sellFund form and see a validation error when type a negative value', async ({
    fundsPage,
  }) => {
    const dialog = fundsPage.getByRole('dialog');

    const input = dialog.getByLabel(SELECTORS.sellDialog.inputName);
    await input.fill('-50');

    const sendButton = dialog.getByRole('button', { name: SELECTORS.sellDialog.sendButton });
    await sendButton.click();

    const errorMsg = fundsPage.getByText(SELECTORS.validations.sell.positive);

    await expect(errorMsg).toBeVisible();
    await expect(dialog).toBeVisible();
  });

  test('should open dialog with sellFund form and see a validation error when type zero value', async ({
    fundsPage,
  }) => {
    const dialog = fundsPage.getByRole('dialog');

    const input = dialog.getByLabel(SELECTORS.sellDialog.inputName);
    await input.fill('0');

    const sendButton = dialog.getByRole('button', { name: SELECTORS.sellDialog.sendButton });
    await sendButton.click();

    const errorMsg = fundsPage.getByText(SELECTORS.validations.sell.positive);

    await expect(errorMsg).toBeVisible();
    await expect(dialog).toBeVisible();
  });

  test('should open dialog with sellFund form and see a validation error when a value exceeds available quantity', async ({
    fundsPage,
  }) => {
    const dialog = fundsPage.getByRole('dialog');

    const input = dialog.getByLabel(SELECTORS.sellDialog.inputName);
    await input.fill('1000');

    const sendButton = dialog.getByRole('button', { name: SELECTORS.sellDialog.sendButton });
    await sendButton.click();

    const errorMsg = fundsPage.getByText(SELECTORS.validations.sell.maxValue(MAX_QUANTITY));

    await expect(errorMsg).toBeVisible();
    await expect(dialog).toBeVisible();
  });
});
