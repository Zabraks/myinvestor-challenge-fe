import { Button } from '@ui/Button/Button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@ui/Empty/Empty';

type ButtonAction = () => void;

type InfoSectionProps = {
  title: string;
  description: string;
  buttonText?: string;
  action?: ButtonAction;
  icon?: React.ReactNode;
};

export const InfoSection = ({ action, title, buttonText, description, icon }: InfoSectionProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon}</EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {action && (
        <EmptyContent className="flex-row justify-center gap-2">
          <Button onClick={action}>{buttonText}</Button>
        </EmptyContent>
      )}
    </Empty>
  );
};
