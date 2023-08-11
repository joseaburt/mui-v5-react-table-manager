import _ from 'lodash';
import { User, UserDTO } from './entities';

export function userMapper(rawUser: UserDTO): User {
  return {
    id: rawUser.id.value,
    email: rawUser.email,
    phone: rawUser.phone,
    gender: rawUser.gender,
    thumbnail: rawUser.picture.thumbnail,
    fullName: rawUser.name.first + ' ' + rawUser.name.last,
    address: rawUser.location.street.number + ' ' + rawUser.location.street.name + ', ' + rawUser.location.city + ', ' + rawUser.location.postcode + ', ' + rawUser.location.state,
  };
}
