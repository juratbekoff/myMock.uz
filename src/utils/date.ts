export const addPeriod = (period: number) => {
  const started_date = new Date();
  const trial_period_ms = Number(period) * 24 * 60 * 60 * 1000; // Convert trial period to milliseconds
  const end_date = new Date(started_date.getTime() + trial_period_ms);
  return { started_date, end_date };
};

export const getDaysInMonth = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;
  return new Date(currentYear, currentMonth, 0).getDate();
};
