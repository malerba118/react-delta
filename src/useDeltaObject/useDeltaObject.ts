import useDeltaArray from '../useDeltaArray';
import { DeltaObject } from '../shared';

interface Options {
  deep?: boolean;
}  

function useDeltaObject<T extends {}>(obj: T, { deep = false }: Options = {}): DeltaObject<T> {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    const deltas = useDeltaArray(values, { deep });
    const deltasObj = {};
    deltas.forEach((delta, i) => {
      deltasObj[keys[i]] = delta;
    });
    return deltasObj as DeltaObject<T>;
  }
  
  export default useDeltaObject;