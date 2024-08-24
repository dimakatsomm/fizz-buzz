export interface ICreateUser {
  name: string;
  surname: string;
  email?: string;
}

export interface IUpdateUser {
  name?: string;
  surname?: string;
  email?: string;
}

export interface IUser extends ICreateUser {
  id: string;
}
