import { useEffect, useRef } from 'react';

export function useInterval(callback, delay, pause) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
 
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null && !pause) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
  


}