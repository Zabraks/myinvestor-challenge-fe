import { useNavigate } from 'react-router-dom';
import { Button } from '@ui/Button/Button.tsx';

const EmptyPortfolio = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center py-16">
      <h2 className="text-lg font-semibold">Aún no tienes fondos en tu cartera</h2>
      <p className="text-sm text-muted-foreground max-w-sm">
        Explora el listado de fondos y comienza a invertir.
      </p>
      <Button onClick={() => navigate('/funds')}>Ver fondos disponibles</Button>
    </div>
  );
};

EmptyPortfolio.displayName = 'EmptyPortfolio';

export default EmptyPortfolio;
