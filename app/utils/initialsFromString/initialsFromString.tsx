const initialsFromString = (inputString: string): string => {
  let initials = '';
  if (inputString.length > 0) {
    initials = inputString.split(/\s/).reduce((response, word) => {
      const result = response + word.slice(0, 1);
      return result;
    }, '');
  }
  return initials;
};
export default initialsFromString;
