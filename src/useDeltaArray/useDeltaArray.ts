import React, { useEffect, useRef } from "react";
import usePrevious from '../usePrevious'
import { Nullable } from '../utils'

const range = (n: number) => [...Array(n).keys()]

interface Delta<T> {
    prev?: T
    curr: T
}

function useDeltaArray<T>(valueArray: T[]): Nullable<Delta<T>>[] {
  const originalArrayLength = useRef(valueArray.length)

  if (valueArray.length !== originalArrayLength.current) {
    console.warn('Length of array changed across renders, but should remain constant.')
  }

  const prevArray = usePrevious(valueArray)

  let deltas: Nullable<Delta<T>>[] = range(originalArrayLength.current).map((i) => {
    if (!prevArray) {
      return {
        curr: valueArray[i]
      }
    }
    else if (!Object.is(valueArray[i], prevArray[i])) {
      return {
        prev: prevArray[i],
        curr: valueArray[i]
      }
    }
    else {
      return null
    }
  })

  return deltas
};

export default useDeltaArray