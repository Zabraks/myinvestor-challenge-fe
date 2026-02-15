import type { FundActionType, FundActionData } from '@domain/funds/types';

export interface FundActionFormProps {
  action: FundActionType;
  data: FundActionData;
  onSuccess: () => void;
}
