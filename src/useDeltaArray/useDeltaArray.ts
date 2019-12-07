import { useRef } from "react";
import usePrevious from '../usePrevious'
import { DeltaArray } from '../shared'

const range = (n: number) => [...Array(n).keys()]

function useDeltaArray<T extends any[]>(valueArray: T): DeltaArray<T> {
  const originalArrayLength = useRef(valueArray.length)

  if (valueArray.length !== originalArrayLength.current) {
    console.warn('Length of array changed across renders, but should remain constant.')
  }

  const prevArray = usePrevious(valueArray)

  let deltas = range(originalArrayLength.current).map((i) => {
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

  return deltas as DeltaArray<T>
};

export default useDeltaArray