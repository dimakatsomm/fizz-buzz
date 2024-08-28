
import express from 'express';
import { UserController } from '../controllers/user.controller';
import Container from 'typedi';

const router = express.Router();
const userController = Container.get(UserController);

router.get('/', userController.getUserList.bind(userController));
router.get('/:id', userController.getUser.bind(userController));
router.post('/', userController.createUser.bind(userController));
router.put('/:id', userController.updateUser.bind(userController));
router.delete('/:id', userController.deleteUser.bind(userController));

export default router;
