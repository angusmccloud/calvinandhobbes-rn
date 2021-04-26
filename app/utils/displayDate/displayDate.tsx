const displayDate = (inputDate: Date): string => {
  let hours = inputDate.getHours();
  let minutes = inputDate.getMinutes().toString();
  const month = inputDate.getMonth() + 1;
  const date = inputDate.getDate();
  let ampm = 'am';
  if (hours === 12) {
    ampm = 'pm';
  } else if (hours > 12) {
    hours -= 12;
    ampm = 'pm';
  } else if (hours === 0) {
    hours = 12;
  }
  if (minutes.length === 1) {
    minutes = `0${minutes}`;
  }
  return `${month}/${date} ${hours}:${minutes}${ampm}`;
};
export default displayDate;
