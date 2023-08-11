import moment from 'moment';
import { get } from '../utils';
import { ColumnConfiguration, ConvertedQuery } from '@joseaburt/react-table-manager';

export type QueryNode = (value: any) => ConvertedQuery;
export type StringSortParseStrategy = (rawValue: any) => string;
export type DateSortParseStrategy = (rawValue: any) => { lte: string; gte: string };

export default class QueryBuilder<T> {
  private queries: Record<string, QueryNode> = {};

  public addEqual(name: string, parser?: StringSortParseStrategy): Omit<QueryBuilder<T>, 'addEqual'> {
    this.queries[name] = (value: any) => (typeof parser === 'function' ? parser(value) : value);
    return this;
  }

  public addLike(name: string, parser?: StringSortParseStrategy): Omit<QueryBuilder<T>, 'addLike'> {
    this.queries[name] = (value: any) => ({ like: `%${typeof parser === 'function' ? parser(value) : value}%` });
    return this;
  }

  public addILike(name: string, parser?: StringSortParseStrategy): Omit<QueryBuilder<T>, 'addILike'> {
    this.queries[name] = (value: any) => ({ iLike: `%${typeof parser === 'function' ? parser(value) : value}%` });
    return this;
  }

  public addDateRange(name: string, parser?: DateSortParseStrategy): Omit<QueryBuilder<T>, 'addDateRange'> {
    this.queries[name] = (value: any) => {
      let range = { lte: moment().endOf('day').toISOString(), gte: moment().startOf('day').toISOString() };

      if ('lte' in value && 'gte' in value) {
        range.lte = get<string>(value, 'lte', range.lte);
        range.gte = get<string>(value, 'gte', range.gte);
      }

      if (typeof parser === 'function') range = parser(value);
      return range;
    };
    return this;
  }

  public get(): Pick<ColumnConfiguration<T>, 'customQueryParser' | 'queryIndex'> {
    return {
      queryIndex: Object.keys(this.queries),
      customQueryParser: (value) => {
        const query: any = {};
        for (const [name, factory] of Object.entries(this.queries)) query[name] = factory(value);
        return query;
      },
    };
  }
}
