import { MutableRefObject } from 'react'
import { useEffect, useRef } from "react";

function useLatest<T>(value: T): MutableRefObject<T> {
    const ref = useRef(value);
    useEffect(() => {
      ref.current = value;
    });
    return ref;
}

export default useLatest