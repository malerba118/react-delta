
import { flatten } from '../utils'
function every(...args: any[]): boolean {
    return flatten(args).every((delta: any) => !!delta);
};
  
export default every