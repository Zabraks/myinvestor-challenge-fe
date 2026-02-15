import { toast } from 'sonner';
import { CircleCheck, CircleX } from 'lucide-react';

interface ToastContentProps {
  message: string;
  variant: 'success' | 'error';
}

const ToastContent = ({ message, variant }: ToastContentProps) => {
  const Icon = variant === 'success' ? CircleCheck : CircleX;
  const colorClass = variant === 'success' ? 'text-success' : 'text-destructive';

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-lg">
      <Icon className={`size-5 shrink-0 ${colorClass}`} />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export const showSuccessToast = (message: string) => {
  toast.custom(() => <ToastContent message={message} variant="success" />);
};

export const showErrorToast = (message: string) => {
  toast.custom(() => <ToastContent message={message} variant="error" />);
};
