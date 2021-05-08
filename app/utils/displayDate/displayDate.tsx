const displayDate = (inputDate: Date): string => {
  const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = monthArray[inputDate.getMonth()];
  const date = inputDate.getDate();
  const year = inputDate.getFullYear();
  return `${month} ${date}, ${year}`;
};
export default displayDate;
