import { useParams } from 'react-router';

type ReturnType = {
  year: number;
  month: number;
  day: number;
};

export const useDateParams = (): ReturnType => {
  const { year, month, day } = useParams();

  return {
    year: year === undefined ? new Date().getFullYear() : Number(year),
    month: month === undefined ? new Date().getMonth() + 1 : Number(month),
    day: day === undefined ? new Date().getDate() : Number(day),
  };
};
