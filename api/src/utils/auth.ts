import { sign, Secret, verify, JwtPayload } from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import Users from '../database/models/UserODM';

export default class TokenAuth {
  static compare(password: string, hash: string): boolean {
    console.log('password inside TokenAuth:', password);
    console.log('hash inside TokenAuth:', hash);
    return compareSync(password, hash);
  }

  static encrypt(user: Users): string {
    const secret = process.env.JWT_SECRET as Secret;
    const token = sign({ data: user }, secret);

    return token;
  }

  static decrypt(token: string) {
    const secret = process.env.JWT_SECRET as Secret;
    const decrypted = verify(token, secret);

    return decrypted as JwtPayload;
  }
}