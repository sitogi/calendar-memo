import { useNavigate } from 'react-router-dom';

type ReturnType = { navigateWithViewTransition: (to: string) => void };

export function useNavigateWithViewTransition(): ReturnType {
  const navigate = useNavigate();

  const navigateWithViewTransition = (to: string): void => {
    if (document.startViewTransition === undefined) {
      navigate(to);

      return;
    }

    document.startViewTransition(() => {
      navigate(to);
    });
  };

  return { navigateWithViewTransition };
}
