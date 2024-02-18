// userRouter.ts
import express from 'express';
import UserController from '../controllers/userController';
import UserRepository from '../repositories/userRepository';
import { UserModel } from '../models/user.model';
import { Token } from '../utils/token';
import CryptoService from '../utils/crypt';
import authMiddleware from '../utils/authMiddleware';
import adminAuthMiddleware from '../utils/adminAuthMiddleware';

const userRepository = new UserRepository(UserModel);
const tokenService = new Token();
const cryptService = new CryptoService();
const userController = new UserController(userRepository, cryptService, tokenService);

const router = express.Router();

router.post('/register', (req, res) => userController.registerUser(req, res));
router.post('/login', (req, res) => userController.loginUser(req, res));
router.get('/me', authMiddleware, (req, res) => userController.getUserData(req, res));
router.post('/sendJewel', (req, res) => userController.sendJewel(req, res));

export default router;
