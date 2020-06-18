/* eslint-disable import/prefer-default-export */
function getDateFromTo() {
  const date = new Date();

  const month = (d) => {
    const month1 = d.getMonth() + 1;
    if (month1 < 10) {
      return `0${month1}`;
    }
    return month1;
  };

  const dateFrom = `${date.getFullYear()}-${month(date)}-${date.getDate() - 7}`;
  const dateTo = `${date.getFullYear()}-${month(date)}-${date.getDate()}`;

  return {
    dateFrom,
    dateTo,
  };
}

export {
  getDateFromTo,
};
