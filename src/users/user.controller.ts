import { Controller, Post, Body, Put } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; 
const jwt = require('jsonwebtoken');

const saltOrRounds = 10;

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  private generateToken(_id: string, email: string): string {
    const payload = { _id: _id, email: email};
    return this.jwtService.sign(payload);
  }
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
  const token = this.generateToken(newUser._id, newUser.email);
  return { message: 'User registered successfully', token: token };
}

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);

      if (isPasswordValid) {
        const token = this.generateToken(existingUser._id, existingUser.email);    
        return { message: 'Login successful', token: token };
      } else {
        return { Error: 'Invalid password' };
      }
    } else {
      return { Error: 'User not found' };
    }
  }



  @Put("update")
  async update(@Body("token") token: string,@Body("userName") userName: string, @Body("email") email: string){

    const decodedToken = jwt.decode(token);
    const _id = decodedToken._id

    const existingUser = await this.userService.findByUserId(_id)
    if(existingUser) {
      if(userName === undefined){
        const updateUser = await this.userService.updateEmail(_id, email)
        const token = this.generateToken(updateUser._id, updateUser.email);
        return {message: "Email Changed successful",token: token}
      }if(email === undefined) {
        const updateUser = await this.userService.updateUserName(_id, userName)
        const token = this.generateToken(updateUser._id, decodedToken.email);
        return {message: "userName Changed successful",token: token}
      }else{
        const updateUser = await this.userService.updateUser(_id, email, userName)
        const token = this.generateToken(updateUser._id, updateUser.email);
        return {message: "email and userName Changed successful",token: token}
      }
      
    } else {
      return { Error: 'User not found' };
    }
  }

  @Put("updatePassword")
  async updatePassword(@Body("token") token: string, @Body("NewPassword") NewPassword: string, @Body("ReNewPassword") ReNewPassword: string) {
    
    const decodedToken = jwt.decode(token);
    const _id = decodedToken._id
    const existingUser = await this.userService.findByUserId(_id)

    if(existingUser) {
      if(NewPassword === ReNewPassword) {
        const hashedPassword = await bcrypt.hash(NewPassword, saltOrRounds);
        await this.userService.updatePassword(_id, hashedPassword)
        const token = this.generateToken(_id, decodedToken.email);
        return {message: "Password Changed successful",token: token}
      }else {
        return { error: 'New password and re-entered new password do not match' };
      }
    }else {
      return {Error: "User not found"}
    }
  }
}
