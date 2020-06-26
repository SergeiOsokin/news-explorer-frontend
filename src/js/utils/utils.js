/* eslint-disable import/prefer-default-export */
function getDateFromTo() {
  const daysBefore = 7;
  const date = new Date();
  const dtms = date.valueOf();// сколько миллисекунд прошло с 1970
  // отнимем миллисикунды которые проходят за 7 дней, чтобы получить желаемую дату
  const dateBefore = new Date(dtms - ((24 * 60 * 60 * 1000) * daysBefore));

  const month = (d) => {
    const month1 = d.getMonth() + 1;
    if (month1 < 10) {
      return `0${month1}`;
    }
    return month1;
  };
  const dateFrom = `${dateBefore.getFullYear()}-${month(dateBefore)}-${dateBefore.getDate()}`;
  const dateTo = `${date.getFullYear()}-${month(date)}-${date.getDate()}`;

  return {
    dateFrom,
    dateTo,
  };
}

export {
  getDateFromTo,
};
