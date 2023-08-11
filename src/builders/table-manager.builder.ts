import MuiV5TableManager from '../table';
import { Entity } from '../shared/types';
import QueryBuilder from './column-query.builder';
import { ResponsiveTableViewsBuilder } from './table-views-builder';
import { EventBus } from '@joseaburt/react-table-manager/dist/bus';
import { BackendResponse, ColumnConfiguration, ITableManager, PaginableRepository, Query, TableColumns } from '@joseaburt/react-table-manager';

type ExcludedProps = 'name' | 'type' | 'queryType' | 'isSortable' | 'isQueryable' | 'queryOperation' | 'customQueryParser';

export type ActionColumn<T> = Omit<ColumnConfiguration<T>, ExcludedProps> & {
  name: 'action';
  label: string;
  render: ColumnConfiguration<T>['render'];
};

export type WithActionColumn<T> = ColumnConfiguration<T> | ActionColumn<T>;

export type TableWithActionColumns<T, K extends keyof T | 'action' = WithActionColumn<T>['name']> = {
  [P in K]?: WithActionColumn<T>;
};

export type RequestStrategy<T extends Entity = Entity> = (query: Query, signal: AbortSignal) => Promise<BackendResponse<T[]>>;

/**
 * ### TableManagerBuilder
 * Builder for TableManager
 * @author <pino0071@gmail.com> Jose Aburto
 */
export class TableManagerBuilder<T extends Entity = Entity, K extends keyof T = keyof T> {
  private eventBus?: EventBus;
  private repo: PaginableRepository<T[]>;
  private columns: TableWithActionColumns<T> = {};

  constructor(repo: PaginableRepository<T[]>) {
    this.repo = repo;
  }

  public withEventBus(eventBus?: EventBus): Omit<TableManagerBuilder<T>, 'withEventBus'> {
    this.eventBus = eventBus;
    return this;
  }

  /**
   * Add new column or continue adding more. Call `get()` if you want to get the TableManager
   */
  public addColumn(colConfigs: WithActionColumn<T> | ((queryHelper: QueryBuilder<T>) => WithActionColumn<T>)): Omit<TableManagerBuilder<T, K>, 'withDebounce' | 'withEventBus'> {
    const configs = typeof colConfigs === 'function' ? colConfigs(new QueryBuilder<T>()) : colConfigs;
    if (colConfigs.name === 'action') this.columns[colConfigs.name] = this.actionCol(configs);
    else this.columns[configs.name] = configs;
    return this;
  }

  public get(): ITableManager<T> {
    return new MuiV5TableManager<T>({
      eventBus: this.eventBus,
      dataRepository: this.repo,
      columnsConfiguration: this.columns as TableColumns<T>,
    });
  }

  public static fromDataProvider<T extends Entity = Entity>(requestStrategy: PaginableRepository<T[]> | RequestStrategy<T>): TableManagerBuilder<T> {
    if (typeof requestStrategy === 'function') return new TableManagerBuilder<T>({ getAll: (query, signal) => requestStrategy(query, signal) });
    return new TableManagerBuilder<T>(requestStrategy);
  }

  private actionCol(configs: WithActionColumn<T>): WithActionColumn<T> {
    return {
      isSortable: false,
      type: 'action' as any,
      isQueryable: false,
      label: configs.label,
      name: 'action' as any,
      align: configs.align,
      render: configs.render,
      isHidden: configs.isHidden,
    };
  }
}
