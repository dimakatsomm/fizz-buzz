
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { Inject, Service } from 'typedi';

@Service()
export class UserController {
    constructor(
        @Inject() private userService: UserService
    ) {}

    async getUserList(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.getUserList(req.query);
            res.json(user);
        } catch (e: any) {
            res.status(400).json({ message: 'Error retrieving users.' });
        }
    }

    async getUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.getUser(req.params.id);
            res.json(user);
        } catch (e: any) {
            res.status(404).json({ message: e.message || 'User not found.' });
        }
    }
    
    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.userService.createUser(req.body);
            res.status(201).json(user);
        } catch (e: any) {
            res.status(400).json({ message: e?.message || 'User exists.' });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            await this.userService.deleteUser(req.params.id);
            res.status(204).send();
        } catch (e: any) {
            res.status(404).json({ message: e?.message || 'User not found.' });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const updatedUser = await this.userService.updateUser(req.params.id, req.body);
            res.json(updatedUser);
        } catch (e: any) {
            res.status(404).json({ message: e?.message || 'User not found.' });
        }
    }
}
