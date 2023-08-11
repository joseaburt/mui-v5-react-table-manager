import React, { useEffect } from 'react';

type Listener<K> = K extends keyof WindowEventMap ? (this: Window, ev: WindowEventMap[K]) => void : (this: Window, ev: CustomEvent) => void;

export function useWindowEvent<K extends string>(type: any, listener: Listener<K>, options?: boolean | AddEventListenerOptions) {
  useEffect(() => {
    window.addEventListener(type, listener, options);
    return () => window.removeEventListener(type, listener, options);
  }, [type, listener, options]);
}
