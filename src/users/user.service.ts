import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.modul';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(email: string, password: string): Promise<User> {
    const user = new this.userModel({ email, password });
    return user.save();
  }

  async updateUser( _id: string, email: string, userName: string): Promise<User | null> {
    const existingUser = await this.userModel.findById(_id);
      existingUser.userName = userName;
      existingUser.email = email;
      return existingUser.save();
  }

  async updateEmail( _id: string, email: string): Promise<User | null> {
    const existingUser = await this.userModel.findById(_id);    
      existingUser.email = email;
      return existingUser.save();
  }

  async updateUserName(_id: string, userName: string): Promise<User | null> {
    const existingUser = await this.userModel.findById(_id);
      existingUser.userName = userName;
      return existingUser.save();
  }

  async updatePassword(_id: string, password: string, ): Promise<User | null> {
    const existingUser = await this.userModel.findById(_id);
    existingUser.password = password
    return existingUser.save()
  }
  

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByUserId(_id: string): Promise<User | null> {
    return this.userModel.findOne({ _id }).exec();
  }
}