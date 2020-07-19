import { useLayoutEffect, useRef } from "react";
import useLatest from "../useLatest";
import { CleanupCallback } from "../shared";

export type ConditionalLayoutEffectCallback = () => CleanupCallback | void;

function useConditionalLayoutEffect(
  callback: ConditionalLayoutEffectCallback,
  shouldExecute: any = false
) {
  // update to truthyCount should cause update to run
  const truthyCount = useRef(0);
  // update to callback should not cause effect to re-run
  const callbackRef = useLatest(callback);
  if (Boolean(shouldExecute)) {
    truthyCount.current++;
  }
  useLayoutEffect(() => {
    // bail out if false during first render
    if (truthyCount.current === 0) {
      return;
    }
    return callbackRef.current();
  }, [truthyCount.current]);
}

export default useConditionalLayoutEffect;
