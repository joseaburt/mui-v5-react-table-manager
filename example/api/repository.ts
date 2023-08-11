import userAPI from '.';
import _ from 'lodash';
import { User } from './entities';
import { BackendResponse, PaginableRepository, QueryState } from '../../.';

export default class UserRepository implements PaginableRepository<User[]> {
  public async getAll(query: Partial<QueryState>, signal: AbortSignal): Promise<BackendResponse<User[]>> {
    const page = parseInt(_.get(query, 'params.page', '1'));
    const size = parseInt(_.get(query, 'params.size', '10'));
    return await userAPI(page, size, query.filters, query.sorts);
  }
}
