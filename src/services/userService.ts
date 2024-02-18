import { compare } from "bcrypt";
import { User } from "../models/user.model";
import UserRepository from "../repositories/userRepository";
import CryptoService from "../utils/crypt";
import { Token } from "../utils/token";
import { ObjectId } from "mongoose";

class UserService {
  private userRepository: UserRepository;
  private cryptoService: CryptoService;
  private tokenService: Token;

  constructor(
    userRepository: UserRepository,
    cryptoService: CryptoService,
    tokenService: Token
  ) {
    this.userRepository = userRepository;
    this.cryptoService = cryptoService;
    this.tokenService = tokenService;
  }

  async registerUser(user: User): Promise<User> {
    const existingUser = await this.userRepository.findUserByEmail(user.email);

    if (existingUser) {
      throw new Error("User already exists.");
    }

    user.password = await this.cryptoService.hashPassword(user.password);

    return this.userRepository.createUser(user);
  }

  async loginUser(
    email: string,
    password: string
  ): Promise<{ user: User; token: string } | null> {
    try {
      console.log("Iniciando processo de login para o email:", email);

      const user = await this.userRepository.findUserByEmail(email);

      if (user) {
        const passwordMatch = await compare(password, user.password);

        if (passwordMatch) {
          user.password = "";
          const isAdmin = user.isAdmin || false;
          const token = this.tokenService.tokenJWT(
            user._id.toString(),
            isAdmin
          );
          return { user, token };
        } else {
          console.log("Senha incorreta.");
        }
      } else {
        console.log("Usuário não encontrado.");
      }

      return null;
    } catch (error) {
      console.error("Erro no login de usuário:", error);
      return null;
    }
  }

  async getUserById(userId: ObjectId | undefined): Promise<User | null> {
    console.log("Getting user by ID:", userId);
    return this.userRepository.findById(userId);
  }

  async sendJewel(userId: ObjectId | undefined, amount: number): Promise<boolean> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      console.log('usuário não existe')
      return false;
    }

    user.jewelsAmount += amount;
    await user.save();

    return true;
  }
}

export default UserService;
