
import 'reflect-metadata';
import { Container } from 'typedi';
import { UserService } from '../src/services/user.service';
import { UserRepository } from '../src/database/repositories/user.repository';
import { UserEntity } from '../src/database/entities/user.entity';

describe('UserService', () => {
    let userService: UserService;
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new UserRepository();
        Container.set(UserRepository, userRepository);
        userService = Container.get(UserService);
    });

    describe('Create User', () => {
        it('should create a user with valid data', async () => {
            const user = new UserEntity();
            user.id = '1';
            user.name = 'John';
            user.surname = 'Doe';
            user.email = 'johndoe@example.com';

            jest.spyOn(userRepository, 'create').mockResolvedValue(user);

            const result = await userService.createUser(user);
            expect(result).toEqual(user);
        });

        it('should throw an error when creating a user with invalid data', async () => {
            const user = new UserEntity();
            user.id = '1';
            user.name = ''; // Invalid name
            user.surname = 'Doe';
            user.email = 'johndoe@example.com';

            jest.spyOn(userRepository, 'create').mockImplementation(() => {
                throw new Error('Invalid user data');
            });

            await expect(userService.createUser(user)).rejects.toThrow('Invalid user data');
        });
    });

    describe('Get User by ID', () => {
        it('should get a user by ID', async () => {
            const user = new UserEntity();
            user.id = '1';
            user.name = 'John';
            user.surname = 'Doe';
            user.email = 'johndoe@example.com';

            jest.spyOn(userRepository, 'findById').mockResolvedValue(user);

            const result = await userService.getUser('1');
            expect(result).toEqual(user);
        });

        it('should throw an error when the user does not exist', async () => {
            jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

            await expect(userService.getUser('1')).rejects.toThrow('User not found');
        });
    });

    describe('Update User', () => {
        it('should update a user with valid data', async () => {
            const user = new UserEntity();
            user.id = '1';
            user.name = 'John';
            user.surname = 'Doe';
            user.email = 'johndoe@example.com';

            jest.spyOn(userRepository, 'findById').mockResolvedValue(user);
            jest.spyOn(userRepository, 'update').mockResolvedValue();

            const updatedUser = { name: 'Jane', surname: 'Smith' };
            const result = await userService.updateUser('1', updatedUser);
            expect(result.name).toBe('Jane');
            expect(result.surname).toBe('Smith');
        });

        it('should throw an error when trying to update a non-existing user', async () => {
            jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

            await expect(userService.updateUser('1', { name: 'Jane' })).rejects.toThrow('User not found');
        });
    });

    describe('Delete User', () => {
        it('should soft delete an existing user', async () => {
            const user = new UserEntity();
            user.id = '1';
            user.name = 'John';
            user.surname = 'Doe';
            user.email = 'johndoe@example.com';

            jest.spyOn(userRepository, 'findById').mockResolvedValue(user);
            jest.spyOn(userRepository, 'delete').mockResolvedValue();

            await expect(userService.deleteUser('1')).resolves.not.toThrow();
        });

        it('should throw an error when trying to delete a non-existing user', async () => {
            jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

            await expect(userService.deleteUser('1')).rejects.toThrow('User not found');
        });
    });

    describe('Get User List with Filters', () => {
        it('should return all users with no filters applied', async () => {
            const user1 = new UserEntity();
            user1.id = '1';
            user1.name = 'John';
            user1.surname = 'Doe';
            user1.email = 'johndoe@example.com';

            const user2 = new UserEntity();
            user2.id = '2';
            user2.name = 'Jane';
            user2.surname = 'Smith';
            user2.email = 'janesmith@example.com';

            jest.spyOn(userRepository, 'userRepo').mockReturnValue({
                createQueryBuilder: jest.fn(() => ({
                    andWhere: jest.fn().mockReturnThis(),
                    orderBy: jest.fn().mockReturnThis(),
                    getMany: jest.fn().mockResolvedValue([user1, user2]),
                    getCount: jest.fn().mockResolvedValue(2),
                })),
            });

            const result = await userService.getUserList({});
            expect(result.users).toEqual([user1, user2]);
            expect(result.total).toBe(2);
        });

        it('should return users sorted by name in ascending order', async () => {
            const user1 = new UserEntity();
            user1.id = '1';
            user1.name = 'Jane';
            user1.surname = 'Smith';
            user1.email = 'janesmith@example.com';

            const user2 = new UserEntity();
            user2.id = '2';
            user2.name = 'John';
            user2.surname = 'Doe';
            user2.email = 'johndoe@example.com';

            jest.spyOn(userRepository, 'userRepo').mockReturnValue({
                createQueryBuilder: jest.fn(() => ({
                    andWhere: jest.fn().mockReturnThis(),
                    orderBy: jest.fn().mockReturnThis(),
                    getMany: jest.fn().mockResolvedValue([user1, user2]),
                    getCount: jest.fn().mockResolvedValue(2),
                })),
            });

            const result = await userService.getUserList({ sortBy: 'name', order: 'ASC' });
            expect(result.users).toEqual([user1, user2]);
        });

        it('should return users sorted by surname in descending order', async () => {
            const user1 = new UserEntity();
            user1.id = '1';
            user1.name = 'Jane';
            user1.surname = 'Smith';
            user1.email = 'janesmith@example.com';

            const user2 = new UserEntity();
            user2.id = '2';
            user2.name = 'John';
            user2.surname = 'Doe';
            user2.email = 'johndoe@example.com';

            jest.spyOn(userRepository, 'userRepo').mockReturnValue({
                createQueryBuilder: jest.fn(() => ({
                    andWhere: jest.fn().mockReturnThis(),
                    orderBy: jest.fn().mockReturnThis(),
                    getMany: jest.fn().mockResolvedValue([user1, user2]),
                    getCount: jest.fn().mockResolvedValue(2),
                })),
            });

            const result = await userService.getUserList({ sortBy: 'surname', order: 'DESC' });
            expect(result.users).toEqual([user1, user2]);
        });

        it('should return only deleted users', async () => {
            const user1 = new UserEntity();
            user1.id = '1';
            user1.name = 'John';
            user1.surname = 'Doe';
            user1.email = 'johndoe@example.com';
            user1.deleted = true;

            jest.spyOn(userRepository, 'userRepo').mockReturnValue({
                createQueryBuilder: jest.fn(() => ({
                    andWhere: jest.fn().mockReturnThis(),
                    orderBy: jest.fn().mockReturnThis(),
                    getMany: jest.fn().mockResolvedValue([user1]),
                    getCount: jest.fn().mockResolvedValue(1),
                })),
            });

            const result = await userService.getUserList({ deleted: true });
            expect(result.users).toEqual([user1]);
            expect(result.total).toBe(1);
        });
    });
});
