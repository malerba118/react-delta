import useDeltaArray from '../useDeltaArray';
import { Nullable, Delta } from '../shared';

type DeltaObject<T extends {}> = {
    [k in keyof T]: Nullable<Delta<T[k]>>
}

function useDeltaObject<T extends {}>(obj: T): DeltaObject<T> {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    const deltas = useDeltaArray(values);
    const deltasObj = {};
    deltas.forEach((delta, i) => {
      deltasObj[keys[i]] = delta;
    });
    return deltasObj as DeltaObject<T>;
  }
  
  export default useDeltaObject;