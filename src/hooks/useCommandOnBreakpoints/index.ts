import mediaQuery from 'css-mediaquery';
import { useEffect, RefObject } from 'react';
import { useElementSize, useViewportSize } from '..';

export type BreakpointCallbacks = {
  onPass: () => void;
  onFail: () => void;
};

export type BreakpointCommands = Record<string, BreakpointCallbacks>;

// Tools

export function useCommandOnBreakpoints(commands: BreakpointCommands) {
  const windowSize = useViewportSize();
  useEffect(() => {
    const { width, height } = windowSize;
    for (const cmd in commands) {
      if (mediaQuery.match(cmd, { width, height })) commands[cmd].onPass();
      else commands[cmd].onFail();
    }
  }, [commands, windowSize]);
  return;
}

// for getting the with form
export function useCommandOnElementBoundsBreakpoints<T extends HTMLElement = any>(commands: BreakpointCommands, debug?: boolean): RefObject<T> {
  const { ref, width, height } = useElementSize();
  useEffect(() => {
    for (const cmd in commands) {
      if (mediaQuery.match(cmd, { width, height })) commands[cmd].onPass();
      else commands[cmd].onFail();
    }
  }, [commands, width, height]);

  if (debug && process.env.NODE_ENV === 'development') console.log('[InventoryLogs][CONTAINER SIZE DEBUG]:', width);

  return ref;
}
