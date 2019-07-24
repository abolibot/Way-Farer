const getNextSevenDays = () => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `'${year}-${month}-${day}'`;
};

const getNextEightDays = () => {
  const d = new Date();
  d.setDate(d.getDate() + 8);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `'${year}-${month}-${day}'`;
};

const getPreviousDay = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `'${year}-${month}-${day}'`;
};

export {
  getNextSevenDays,
  getNextEightDays,
  getPreviousDay,
};
