import { useState, Dispatch, SetStateAction } from 'react';

function checkValueChanges<T>(originalValue: T, modifiedValue: T): Partial<T> {
  const originalString = JSON.stringify(originalValue);
  const modifiedString = JSON.stringify(modifiedValue);
  if (originalString !== modifiedString) {
    const changes: Partial<T> = {};
    for (const key in modifiedValue) {
      if (modifiedValue?.hasOwnProperty(key)) {
        if (originalValue[key as keyof T] !== modifiedValue[key as keyof T]) {
          changes[key as keyof T] = modifiedValue[key as keyof T];
        }
      }
    }
    return changes;
  }
  return {};
}

export function useStateWithDifferences<T>(defaultState: T): [T, Dispatch<SetStateAction<T>>, boolean, Partial<T>] {
  const [state, setState] = useState<T>(defaultState);
  const changes = checkValueChanges<T>(defaultState, state);
  return [state, setState, Object.keys(changes).length > 0, changes];
}
