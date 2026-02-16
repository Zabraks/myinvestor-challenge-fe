import type { ActionType, ActionData } from '@domain/action';

export interface FundActionFormProps {
  action: ActionType;
  data?: ActionData;
  onSuccess?: () => void;
  fundId?: string | null;
}
