import { useRef, WheelEvent, RefObject } from 'react';

export type HorizontalScroll = {
  ref: RefObject<HTMLDivElement>;
  handleWheel: (event: WheelEvent) => void;
};

export function useHorizontalScroll(): HorizontalScroll {
  const ref = useRef<HTMLDivElement>(null);

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    if (ref.current) {
      ref.current.scrollLeft += event.deltaY;
    }
  };

  return { ref, handleWheel };
}
