import { consoleLogs } from 'environment';

const log = (message: string, consoleLogOverwrite?: boolean): void => {
  if (consoleLogOverwrite) {
    console.log(message);
  }
};
export default log;

log.defaultProps = {
  consoleLogOverwrite: consoleLogs,
};
