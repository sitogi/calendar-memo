import { useParams } from 'react-router';

type ReturnType = {
  year: number;
  month: number;
};

export const useDateParams = (): ReturnType => {
  const { year, month } = useParams();

  return {
    year: year === undefined ? new Date().getFullYear() : Number(year),
    month: month === undefined ? new Date().getMonth() + 1 : Number(month),
  };
};
