import useDeltaArray from '../useDeltaArray';
import { Nullable, Delta } from '../shared';

interface Options {
    deep?: boolean;
}  

function useDelta<T>(value: T, { deep = false }: Options = {}): Nullable<Delta<T>>  {
    const [delta] = useDeltaArray([value], { deep });
    return delta;
}

export default useDelta;