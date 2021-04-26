const millisecondsToTime = (milliseconds: number): string => {
  const totalSeconds = Math.abs(milliseconds / 1000);
  let seconds = Math.round(totalSeconds % 60);
  let minutes = Math.floor(totalSeconds / 60);
  if (seconds === 60) {
    // Account for 59.99 seconds, etc...
    seconds = 0;
    minutes++;
  }
  return `${minutes < 10 ? '0' : ''}${minutes}:${
    seconds < 10 ? '0' : ''
  }${seconds}`;
};

export default millisecondsToTime;
