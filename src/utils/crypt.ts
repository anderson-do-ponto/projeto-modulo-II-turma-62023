import { hash, compare } from 'bcrypt';

class CryptoService {
  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
  }

  async comparePasswords(inputPassword: string, hashedPassword: string): Promise<boolean> {
    const passwordsMatch = await compare(inputPassword, hashedPassword);
    return passwordsMatch;
  }
}

export default CryptoService;
