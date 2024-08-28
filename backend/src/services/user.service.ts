
import { Inject, Service } from "typedi";
import { ICreateUser, IUserFilter, IUserList } from "../interface/user.interface";
import { UserRepository } from "../database/repositories/user.repository";
import { UserEntity } from "database/entities/user.entity";
import { Brackets } from "typeorm";

@Service()
export class UserService {
    constructor(
        @Inject() private userRepository: UserRepository
    ) {}

    async createUser(user: ICreateUser): Promise<UserEntity> {
        const userEntity = this.userRepository.create(user);
        return userEntity;
    }

    async getUser(userId: string): Promise<UserEntity> {
        return await this.checkIfUserExistsById(userId);
    }

    async getUserList(query: IUserFilter): Promise<IUserList> {
        const { search, deleted, sort } = query;
        let sortBy = "name";
        let order: "ASC" | "DESC" = "ASC";

        if (sort) {
            const [field, direction] = sort.split(":");
            sortBy = field || sortBy;
            order = direction && direction.toUpperCase() === "DESC" ? "DESC" : "ASC";
        }

        const userQuery = this.userRepository.userRepo.createQueryBuilder('users');

        if (search) {
            userQuery.andWhere(
                new Brackets((qb) => {
                    qb
                    .orWhere(`"users"."name" ILIKE %${search}%`)
                    .orWhere(`"users"."surname" ILIKE %${search}%`)
                    .orWhere(`"users"."email" ILIKE %${search}%`);
                })
            );
        }

        if (deleted !== undefined) {
            userQuery.andWhere('"users"."deleted" = :deleted', { deleted });
        } else {
            userQuery.andWhere('"users"."deleted" = false');
        }

        userQuery.orderBy(`users.${sortBy}`, order);

        const users = await userQuery.getMany();
        const total = await userQuery.getCount();

        return { data: users, meta: { total }};
    }

    async updateUser(userId: string, userData: Partial<UserEntity>): Promise<UserEntity> {
        await this.checkIfUserExistsById(userId);
        await this.userRepository.update(userId, userData);
        return this.getUser(userId);
    }

    async deleteUser(userId: string): Promise<void> {
        await this.checkIfUserExistsById(userId);
        await this.userRepository.delete(userId);
    }

    private async checkIfUserExistsById(userId: string): Promise<UserEntity> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}
