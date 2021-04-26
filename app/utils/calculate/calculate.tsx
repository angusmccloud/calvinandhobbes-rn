import {evaluate} from 'mathjs';

const calculate = (inputString: string): number => {
  return evaluate(inputString);
};
export default calculate;
