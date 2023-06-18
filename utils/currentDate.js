export const currentDate = (incomingDate) => {
  const monthArr = [
    "Січня",
    "Лютого",
    "Березня",
    "Квітня",
    "Травня",
    "Червня",
    "Липня",
    "Серпня",
    "Вересня",
    "Жовтня",
    "Листопадя",
    "Грудня",
  ];

  const addZero = (num) => {
    if (num >= 0 && num <= 9) {
      return "0" + num;
    } else {
      return num;
    }
  };

  const monthNow = (val) => {
    const month = monthArr.find((_, idx) => idx === val);
    return month.toLowerCase();
  };

  const date = new Date(incomingDate);
  const year = date.getFullYear();
  const month = monthNow(date.getMonth());
  const day = addZero(date.getDate());
  const currentDate = `${day} ${month}, ${year}`;

  return currentDate;
};
