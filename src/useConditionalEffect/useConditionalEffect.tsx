import { useEffect, useRef } from "react";
import useLatest from '../useLatest'
import { Optional } from '../utils'

type CleanupCallback = () => void
type ConditionalEffectCallback = () => Optional<CleanupCallback>

function useConditionalEffect(callback: ConditionalEffectCallback, condition: boolean = true) {
  // update to truthyCount should cause update to run
  const truthyCount = useRef(0)
  // update to callback should not cause effect to re-run
  const callbackRef = useLatest(callback)
  if (condition) {
    truthyCount.current++
  }
  useEffect(() => {
    // bail out if false during first render
    if (truthyCount.current === 0) {
      return
    }
    return callbackRef.current()
  }, [truthyCount.current])
}

export default useConditionalEffect
