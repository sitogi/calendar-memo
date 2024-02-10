import { useParams } from 'react-router';

type ReturnType = {
  year: number;
  month: number;
};

export const useDateParams = (): ReturnType => {
  const { year, month } = useParams();

  return { year: Number(year), month: Number(month) };
};
