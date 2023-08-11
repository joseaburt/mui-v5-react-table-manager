import React, { useState, useEffect } from 'react';
import { StyledTableCell } from './StyledTableCell';
import { EventBus } from '@joseaburt/react-table-manager/dist/bus';
import { BodyColumnConfiguration } from '@joseaburt/react-table-manager';
import { get } from '../utils';

export function Cell<T>({ render, name, isHidden, record, eventBus, width: w, align }: BodyColumnConfiguration<T> & { record: T; eventBus: EventBus }): JSX.Element {
  const [width, setWidth] = useState<any>(w ?? 'auto');

  useEffect(() => {
    const off = eventBus.listen(`COLUMN_WIDTH_CHANGED:${name as string}`, (w: any) => setWidth(w));
    return () => off();
  }, [eventBus, name]);

  if (isHidden) return <></>;

  const value = get(record, name as string);

  if (render) {
    return (
      <StyledTableCell key={name as string} sx={{ width: width ?? 'auto', padding: '0px 10px' }} align={align ?? 'inherit'}>
        {render({ value: value, record })}
      </StyledTableCell>
    );
  }

  return (
    <StyledTableCell key={name as string} sx={{ width: width ?? 'auto', maxWidth: width ?? 'auto', overflow: 'hidden', textOverflow: 'ellipsis' }} align={align ?? 'inherit'}>
      {value || '-'}
    </StyledTableCell>
  );
}
