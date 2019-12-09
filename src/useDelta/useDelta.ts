import useDeltaArray from '../useDeltaArray';
import { Nullable, Delta } from '../shared';

function useDelta<T>(value: T): Nullable<Delta<T>>  {
    const [delta] = useDeltaArray([value]);
    return delta;
}

export default useDelta;