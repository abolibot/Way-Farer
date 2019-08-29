const getNextSevenDays = () => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d;
};

const getNextEightDays = () => {
  const d = new Date();
  d.setDate(d.getDate() + 8);
  return d;
};

const getToday = () => {
  const d = new Date();
  return d;
};

const getPreviousDay = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toLocaleDateString();
};

const getNextFiveDays = () => {
  const d = new Date();
  d.setDate(d.getDate() + 5);
  return d.toLocaleDateString();
};

export {
  getNextSevenDays,
  getNextEightDays,
  getToday,
  getPreviousDay,
  getNextFiveDays,
};
