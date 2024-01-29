import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; 

const saltOrRounds = 10;

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  @Post('register')
async register(@Body('email') email: string, @Body('password') password: string) {
  const existingUser = await this.userService.findByEmail(email);
  if (existingUser) {
    return { message: 'User with this email already exists.' };
  }

  // if (!this.isStrongPassword(password)) {
  //   return { message: 'Password does not meet the required strength criteria.' };
  // }

  const hashedPassword = await bcrypt.hash(password, saltOrRounds);

  const newUser = await this.userService.createUser(email, hashedPassword);
  return { message: 'User registered successfully', user: newUser };
}

// private isStrongPassword(password: string): boolean {
//   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//   return passwordRegex.test(password);
// }


  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    const existingUser = await this.userService.findByEmail(email);

    if (existingUser) {
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);

      if (isPasswordValid) {
        const token = this.generateToken(existingUser._id, existingUser.email);
        return { message: 'Login successful', userId: existingUser._id, userEmail: existingUser.email, token };
      } else {
        return { message: 'Invalid password' };
      }
    } else {
      return { message: 'User not found' };
    }
  }

  private generateToken(userId: string, userEmail: string): string {
    const payload = { sub: userId, email: userEmail };
    return this.jwtService.sign(payload);
  }
}
