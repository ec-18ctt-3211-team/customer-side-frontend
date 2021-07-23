export const getDateString = (date: Date) => {
  return (
    date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
  );
};

export const formatDateString = (date: string) => {
  const str = date.split('/');
  const result = new Date();
  result.setDate(parseInt(str[0]));
  result.setMonth(parseInt(str[1]) - 1);
  result.setFullYear(parseInt(str[2]));
  result.setHours(0, 0, 0, 0);
  return result;
};
