import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Token {
  private readonly secretKey: string = process.env.SECRET_KEY || '';

  tokenJWT(userId: string, isAdmin: boolean = false): string {
    const token = jwt.sign({ userId, isAdmin }, this.secretKey, { expiresIn: '1h' });
    return token;
  }

  verifyToken(token: string): any {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

export { Token };
