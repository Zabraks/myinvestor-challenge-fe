import { test, expect } from '../../../fixtures/funds-api.fixture';
import { SELECTORS } from '../../../utils/selectors';
import type { CapturedTransferAction } from '../../../utils/mock-data';

test.describe('Actions - Transfer fund', () => {
  const MAX_QUANTITY = 75;

  test.beforeEach(async ({ fundsPage }) => {
    await fundsPage.goto('/portfolio');

    const portfolioPanel = fundsPage.getByRole('tabpanel', { name: /fondos/i });
    const firstPortfolioItem = portfolioPanel.getByRole('listitem').first();
    const actionButton = firstPortfolioItem.getByRole('button', {
      name: SELECTORS.rowActions.trigger,
    });

    await actionButton.click();

    const transferButton = fundsPage.getByRole('menuitem', { name: SELECTORS.rowActions.transfer });
    await transferButton.click();
  });

  test('should open dialog with transferFund form clicking "Traspasar" action', async ({
    fundsPage,
  }) => {
    const dialog = fundsPage.getByRole('dialog');

    const titleDialog = dialog.getByRole('heading', { name: SELECTORS.transferDialog.title });
    await expect(titleDialog).toBeVisible();

    const input = dialog.getByLabel(SELECTORS.transferDialog.inputName);
    await expect(input).toBeVisible();

    const fundSelect = dialog.getByRole('combobox');
    await expect(fundSelect).toBeVisible();
  });

  test('should open dialog with transferFund form and transfer a fund successfully', async ({
    fundsPage,
    mockTransferApi,
  }) => {
    let capturedPayload: CapturedTransferAction | undefined;

    await mockTransferApi({
      onCapture: (data) => {
        capturedPayload = data;
      },
    });

    const dialog = fundsPage.getByRole('dialog');

    const input = dialog.getByLabel(SELECTORS.transferDialog.inputName);
    await input.fill('50');

    const fundSelect = dialog.getByRole('combobox');
    await fundSelect.click();

    const fundOption = fundsPage.getByRole('option').first();
    await fundOption.click();

    const sendButton = dialog.getByRole('button', { name: SELECTORS.transferDialog.sendButton });
    await sendButton.click();

    const toastMsg = fundsPage.getByText(SELECTORS.toastMsg.transfer.success);

    expect(capturedPayload?.quantity).toBe(50);
    await expect(dialog).toBeHidden();
    await expect(toastMsg).toBeVisible();
  });

  test('should open dialog with transferFund form and see a toast error message when api fails', async ({
    fundsPage,
    mockTransferApi,
  }) => {
    await mockTransferApi({
      shouldFail: true,
    });

    const dialog = fundsPage.getByRole('dialog');

    const input = dialog.getByLabel(SELECTORS.transferDialog.inputName);
    await input.fill('50');

    const fundSelect = dialog.getByRole('combobox');
    await fundSelect.click();

    const fundOption = fundsPage.getByRole('option').first();
    await fundOption.click();

    const sendButton = dialog.getByRole('button', { name: SELECTORS.transferDialog.sendButton });
    await sendButton.click();

    const toastMsg = fundsPage.getByText(SELECTORS.toastMsg.transfer.error);

    await expect(dialog).toBeVisible();
    await expect(toastMsg).toBeVisible();
  });

  test('should open dialog with transferFund form and see a validation error when clear the input', async ({
    fundsPage,
  }) => {
    const dialog = fundsPage.getByRole('dialog');

    const input = dialog.getByLabel(SELECTORS.transferDialog.inputName);
    await input.clear();

    const fundSelect = dialog.getByRole('combobox');
    await fundSelect.click();

    const fundOption = fundsPage.getByRole('option').first();
    await fundOption.click();

    const sendButton = dialog.getByRole('button', { name: SELECTORS.transferDialog.sendButton });
    await sendButton.click();

    const errorMsg = fundsPage.getByText(SELECTORS.validations.transfer.number);

    await expect(errorMsg).toBeVisible();
    await expect(dialog).toBeVisible();
  });

  test('should open dialog with transferFund form and see a validation error when type a negative value', async ({
    fundsPage,
  }) => {
    const dialog = fundsPage.getByRole('dialog');

    const input = dialog.getByLabel(SELECTORS.transferDialog.inputName);
    await input.fill('-50');

    const fundSelect = dialog.getByRole('combobox');
    await fundSelect.click();

    const fundOption = fundsPage.getByRole('option').first();
    await fundOption.click();

    const sendButton = dialog.getByRole('button', { name: SELECTORS.transferDialog.sendButton });
    await sendButton.click();

    const errorMsg = fundsPage.getByText(SELECTORS.validations.transfer.positive);

    await expect(errorMsg).toBeVisible();
    await expect(dialog).toBeVisible();
  });

  test('should open dialog with transferFund form and see a validation error when type zero value', async ({
    fundsPage,
  }) => {
    const dialog = fundsPage.getByRole('dialog');

    const input = dialog.getByLabel(SELECTORS.transferDialog.inputName);
    await input.fill('0');

    const fundSelect = dialog.getByRole('combobox');
    await fundSelect.click();

    const fundOption = fundsPage.getByRole('option').first();
    await fundOption.click();

    const sendButton = dialog.getByRole('button', { name: SELECTORS.transferDialog.sendButton });
    await sendButton.click();

    const errorMsg = fundsPage.getByText(SELECTORS.validations.transfer.positive);

    await expect(errorMsg).toBeVisible();
    await expect(dialog).toBeVisible();
  });

  test('should open dialog with transferFund form and see a validation error when a value exceeds available quantity', async ({
    fundsPage,
  }) => {
    const dialog = fundsPage.getByRole('dialog');

    const input = dialog.getByLabel(SELECTORS.transferDialog.inputName);
    await input.fill('1000');

    const fundSelect = dialog.getByRole('combobox');
    await fundSelect.click();

    const fundOption = fundsPage.getByRole('option').first();
    await fundOption.click();

    const sendButton = dialog.getByRole('button', { name: SELECTORS.transferDialog.sendButton });
    await sendButton.click();

    const errorMsg = fundsPage.getByText(SELECTORS.validations.transfer.maxValue(MAX_QUANTITY));

    await expect(errorMsg).toBeVisible();
    await expect(dialog).toBeVisible();
  });

  test('should open dialog with transferFund form and see a validation error when no fund is selected', async ({
    fundsPage,
  }) => {
    const dialog = fundsPage.getByRole('dialog');

    const input = dialog.getByLabel(SELECTORS.transferDialog.inputName);
    await input.fill('50');

    const sendButton = dialog.getByRole('button', { name: SELECTORS.transferDialog.sendButton });
    await sendButton.click();

    const errorMsg = fundsPage.getByText(SELECTORS.validations.transfer.fundRequired);

    await expect(errorMsg).toBeVisible();
    await expect(dialog).toBeVisible();
  });
});
