import { UserEntity } from "../database/entities/user.entity";

export interface ICreateUser {
  name: string;
  surname: string;
  email?: string;
}

export interface IUserFilter {
  search?: string;
  sort?: string;
  deleted?: boolean;
}

export interface IUserList {
  data: UserEntity[]
  meta: {
    total: number;
  }
}