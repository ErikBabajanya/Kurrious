import { Controller, Post, Body, Put } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; 

const saltOrRounds = 10;

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  // private isStrongPassword(password: string): boolean {
  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  //   return passwordRegex.test(password);
  // }
  @Post('register')
  async register(@Body('email') email: string, @Body('password') password: string) {
  const existingUser = await this.userService.findByEmail(email);
  if (existingUser) {
    return { Error: 'User with this email already exists.' };
  }
  // if (!this.isStrongPassword(password)) {
  //   return { Error: 'Password does not meet the required strength criteria.' };
  // }

  const hashedPassword = await bcrypt.hash(password, saltOrRounds);

  const newUser = await this.userService.createUser(email, hashedPassword);

  return { message: 'User registered successfully', user: newUser };
}




  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);

      if (isPasswordValid) {
        const token = this.generateToken(existingUser._id, existingUser.email);
        return { message: 'Login successful', userId: existingUser._id, email: existingUser.email, token };
      } else {
        return { Error: 'Invalid password' };
      }
    } else {
      return { Error: 'User not found' };
    }
  }

  private generateToken(userId: string, userEmail: string): string {
    const payload = { sub: userId, email: userEmail };
    return this.jwtService.sign(payload);
  }

  @Put("update")
  async update(@Body("_id") _id: string,@Body("userName") userName: string, @Body("email") email: string){
    const existingUser = await this.userService.findByUserId(_id)
    if(existingUser) {
      if(userName === undefined){
        const updateUser = await this.userService.updateEmail(email, _id)
        return updateUser
      }if(email === undefined) {
        const updateUser = await this.userService.updateUserName(userName, _id)
        return updateUser
      }else{
        const updateUser = await this.userService.updateUser(email, userName, _id)
        return updateUser
      }
      
    } else {
      return { Error: 'User not found' };
    }
  }

  @Put("updatePassword")
  async updatePassword(@Body("_id") _id: string, @Body("NewPassword") NewPassword: string, @Body("ReNewPassword") ReNewPassword: string) {
    const existingUser = await this.userService.findByUserId(_id)
    if(existingUser) {
      if(NewPassword === ReNewPassword) {
        const hashedPassword = await bcrypt.hash(NewPassword, saltOrRounds);
        const updatePassword = await this.userService.updatePassword(_id, hashedPassword)
        return updatePassword
      }else {
        return { error: 'New password and re-entered new password do not match' };
      }
    }else {
      return {Error: "User not found"}
    }
  }
}


