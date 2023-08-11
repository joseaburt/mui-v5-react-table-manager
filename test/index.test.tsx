import React from 'react';
import * as ReactDOM from 'react-dom';
import { TableManagerBuilder, ResponsiveTableViewsBuilder, PaginableRepository, QueryState, BackendResponse } from '../src';

type User = {
  id: number;
  email: string;
  username: string;
};

class CommonRepository implements PaginableRepository<User[]> {
  constructor(baseURL: string) {}

  getAll(query: Partial<QueryState>, signal: AbortSignal): Promise<BackendResponse<User[]>> {
    throw new Error('Method not implemented.');
  }
}

const manager = TableManagerBuilder.fromDataProvider<User>(new CommonRepository('/'))
  .addColumn({
    name: 'email',
    type: 'text',
    label: 'Email',
  })
  .get();

const TableResponsive = ResponsiveTableViewsBuilder.new<User>(manager)
  .addBreakpoint('(max-width: 636)', ['username'])
  .addBreakpoint('(max-width: 519)', ['action'])
  .addBreakpoint('(max-width: 690.390625)', ['id'])
  .addBreakpoint('(max-width: 900)', ['email', 'username'])
  .registerSmallView(<></>)
  .get({ debugWidth: true });

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TableResponsive />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
