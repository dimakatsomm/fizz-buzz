
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { ICreateUser } from 'interface/user.interface';

@Service()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    public readonly userRepo: Repository<UserEntity>
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepo.find();
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.userRepo.findOne({ where: { id } });
  }

  async create(user: ICreateUser): Promise<UserEntity> {
    return this.userRepo.save(user);
  }

  async update(id: string, user: Partial<UserEntity>): Promise<void> {
    await this.userRepo.update(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepo.update(id, { deleted: true });
  }
}
