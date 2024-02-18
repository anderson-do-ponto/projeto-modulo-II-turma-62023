import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { ObjectId } from 'mongoose';

class UserRepository {
  private userModel: Model<User>;

  constructor(userModel: Model<User>) {
    this.userModel = userModel;
  }

  async createUser(user: User): Promise<User> {
    return this.userModel.create(user);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(userId: ObjectId | undefined): Promise<User | null> {
    return this.userModel.findById(userId).exec();
  }
}

export default UserRepository;
