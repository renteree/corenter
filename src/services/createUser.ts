import { User, UserCreationAttributes } from '../models/UserModel';

export default async function createUser(user: UserCreationAttributes): Promise<User> {
  return User.create(user);
}
