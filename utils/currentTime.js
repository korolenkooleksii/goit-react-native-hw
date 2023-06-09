export const currentTime = (incomingDate) => {
  const addZero = (num) => {
    if (num >= 0 && num <= 9) {
      return "0" + num;
    } else {
      return num;
    }
  };

  const date = new Date(incomingDate);
  const hours = addZero(date.getUTCHours());
  const minutes = addZero(date.getMinutes());
  const currentTime = `${hours}:${minutes}`;

  return currentTime;
};
