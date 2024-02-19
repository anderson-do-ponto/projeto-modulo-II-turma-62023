import { Request, Response } from "express";
import { User } from "../models/user.model";
import UserService from "../services/userService";
import UserRepository from "../repositories/userRepository";
import CryptoService from "../utils/crypt";
import { Token } from "../utils/token";

class UserController {
  private userService: UserService;

  constructor(
    userRepository: UserRepository,
    cryptoService: CryptoService,
    token: Token
  ) {
    this.userService = new UserService(userRepository, cryptoService, token);
  }

  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: User = req.body;
      const newUser = await this.userService.registerUser(userData);
      res.status(201).json(newUser);
    } catch (error: any) {
      console.error("Erro no cadastro de usuário:", error);
      res.status(400).json({ message: error.message });
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const loginResult = await this.userService.loginUser(email, password);

      if (loginResult) {
        const { user, token } = loginResult;
        res.status(200).json({
          message: "Success: User login successful.",
          user,
          token,
        });
      } else {
        res.status(401).json({
          message:
            "Unauthorized",
        });
      }
    } catch (error) {
      console.error("Erro no login de usuário:", error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  }

  async getUserData(req: Request, res: Response): Promise<any> {
    try {
      const userId = req.user?._id;
      console.log("User ID in getUserData:", userId);

      if (!userId) {
        return res
          .status(401)
          .json({ message: "Unauthorized: User ID not found in token." });
      }


      const user = await this.userService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const relevantUserData = {
        name: user.name,
        email: user.email,
        jewelsAmount: user.jewelsAmount,
        products: user.products,
        favoriteProducts: user.favoriteProducts,
        photo: user.photo,
        isAdmin: user.isAdmin
      };

      res.status(200).json({
        message: "Success: User data retrieved successfully.",
        user: relevantUserData,
      });
    } catch (error) {
      console.error("Error retrieving user data:", error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  }

  async sendJewel(req: Request, res: Response): Promise<void> {
    try {
      const { userId, amount } = req.body;

      if (!userId || !amount) {
        res.status(400).json({ message: 'Bad Request: User ID and amount are required.' });
        return;
      }

      const success = await this.userService.sendJewel(userId, amount);

      if (!success) {
        res.status(404).json({ message: 'User not found.' });
        return;
      }

      res.status(200).json({ message: 'Jewel sent successfully.' });
    } catch (error) {
      console.error('Error sending jewel:', error);
      res.status(500).json({ message: 'Internal Server Error.' });
    }
  }
}

export default UserController;
