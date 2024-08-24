import { ICreateUser, IUpdateUser, IUser } from "../interface/user.interface";
import { UserRepository } from "../database/repositories/user.repository";
import { Inject, Service } from "typedi";

@Service();
export class UserService {
    constructor() {
        @Inject() private userRepository: UserRepository;
    }

    async createUser(user: ICreateUser): Promise<IUser> {
        
    }

    async getUser(userId: string): Promise<IUser> {

    }

    async getUserList(userId: string): Promise<> {

    }

    async updateUser(userId: string, user: IUpdateUser): Promise<IUser> {

    }

    async deleteUser(userId: string, softDelete = true): Promise<void> {

    }

    private checkIfUserExists(userId: string): Promise<IUser> {
        
    }
}