import type { TransferFundApiResponse } from '@services/funds/transferFund.api.types';
import type { TransferFundResult } from '@domain/funds/transfer';

export const mapTransferFundFromApi = (api: TransferFundApiResponse): TransferFundResult => ({
  message: api.message,
  data: api.data.portfolio.map((item) => item),
});
