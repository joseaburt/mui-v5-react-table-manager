import _ from 'lodash';
import data from './data.json';
import Collection from './collection';
import { userMapper } from './mappers';
import { User, UserDTO } from './entities';
import { BackendResponse } from '../../dist';

const users: User[] = data.map((user) => userMapper(user as unknown as UserDTO)).map((user, i) => ({ ...user, id: `${i + 1}` }));

const userCollection = new Collection<User>();

export default async function userAPI(page: number, size: number, query?: Record<string, string>, sortQuery?: Record<string, string>): Promise<BackendResponse<User[]>> {
  let data = userCollection.sort([...users], sortQuery);
  data = query ? userCollection.paginate(userCollection.search(data, query), page, size) : userCollection.paginate(data, page, size);
  return { data, meta: { page, pageSize: size, total: users.length } };
}
