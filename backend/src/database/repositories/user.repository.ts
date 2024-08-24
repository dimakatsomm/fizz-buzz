import { Service } from 'typedi';
import { UserEntity } from '../entities/user.entity';

@Service()
export class UserRepository<UserEntity> {
  constructor() {
    super(UserEntity);
  }
}
