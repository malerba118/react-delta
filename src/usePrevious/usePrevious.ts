import { useEffect, useRef } from "react";
import { Optional } from '../shared';

function usePrevious<T>(value: T): Optional<T> {
    const ref = useRef<Optional<T>>();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
}

export default usePrevious;