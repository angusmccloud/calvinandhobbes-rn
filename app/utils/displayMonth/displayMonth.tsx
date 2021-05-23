const displayMonth = (inputDate: Date): string => {
  const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = monthArray[inputDate.getMonth()];
  const year = inputDate.getFullYear();
  return `${month}, ${year}`;
};
export default displayMonth;
