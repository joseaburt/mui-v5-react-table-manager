import { Cell } from '../components/Cell';
import React, { useEffect, useState } from 'react';
import createBodyContainer from './createBodyContainer';
import { TableBody as MUITableBody } from '@mui/material';
import { StyledTableRow } from '../components/StyledTableRow';
import createNoDataBodyContainer from './createNoDataBodyContainer';
import { BodyColumnConfiguration, BodyProps, COLUMNS_VISIBILITY_CHANGED_EVENT, DATA_UPDATED_EVENT, TABLE_STATUS_CHANGED_EVENT } from '@joseaburt/react-table-manager';

type Entity = { id: string | number };

type Statuses = 'LOADING' | 'SUCCESS' | 'ERROR';

type BodyState<T> = {
  data: T[];
  status: Statuses;
  wasResolved: boolean;
};

const NoDataContainer = createNoDataBodyContainer();
const LoadingPlaceholder = createBodyContainer('Loading...');
const NoDataPlaceholder = createBodyContainer(<NoDataContainer placeholder="There Is Not Items" />);
const ErrorPlaceholder = createBodyContainer(<NoDataContainer placeholder="Error On Loading Data" />);

export default function createTableBody<T extends Entity = Entity>({ columns, viewModel }: BodyProps<T>) {
  return function TableBody(): JSX.Element {
    const [cols, setCols] = useState(columns);
    const [{ data, wasResolved, status }, setState] = useState<BodyState<T>>({ data: [], status: 'LOADING', wasResolved: false });

    useEffect(() => {
      const off2 = viewModel.eventBus.listen(TABLE_STATUS_CHANGED_EVENT, (status: Statuses) => {
        setState((p) => {
          if (status === 'ERROR') return { ...p, status, wasResolved: true };
          return { ...p, status };
        });
      });
      const off1 = viewModel.eventBus.listen(DATA_UPDATED_EVENT, (data: T[]) => setState({ wasResolved: true, data, status: 'SUCCESS' }));
      const off3 = viewModel.eventBus.listen(COLUMNS_VISIBILITY_CHANGED_EVENT, ({ columns }: any) => setCols({ ...columns }));

      return () => {
        off1();
        off2();
        off3();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!wasResolved) return LoadingPlaceholder;
    if (wasResolved && status === 'ERROR') return ErrorPlaceholder;
    if (wasResolved && data.length === 0) return NoDataPlaceholder;

    return (
      <MUITableBody>
        {data.map((row) => {
          return (
            <StyledTableRow hover key={row.id} sx={{ width: '10px' }}>
              {Object.keys(cols).map((index) => {
                const { render, name, isHidden, width = 'auto', align } = cols[index as keyof T] as BodyColumnConfiguration<T>;
                return <Cell<T> key={name as string} align={align} render={render} name={name} isHidden={isHidden} width={width} record={row} eventBus={viewModel.eventBus} />;
              })}
            </StyledTableRow>
          );
        })}
      </MUITableBody>
    );
  };
}
