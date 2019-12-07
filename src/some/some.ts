
import { flatten } from '../utils'

function some(...args: any[]): boolean {
    return flatten(args).some((delta: any) => !!delta);
};
  
export default some