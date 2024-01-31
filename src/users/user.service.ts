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

  async updateUser(email: string, userName: string, _id: string): Promise<User | null> {
    const existingUser = await this.userModel.findById(_id);
  
    if (existingUser) {
      existingUser.userName = userName;
      existingUser.email = email;
      const updatedUser = await existingUser.save();
      return updatedUser;
    } else {
      return null;
    }
  }

  async updateEmail(email: string,  _id: string): Promise<User | null> {
    const existingUser = await this.userModel.findById(_id);
    if(existingUser) {
      existingUser.email = email;
      const updatedUser = await existingUser.save();
      return updatedUser;
    }else{
      return null
    }
  }

  async updateUserName(userName: string, _id: string): Promise<User | null> {
    const existingUser = await this.userModel.findById(_id);
    if(existingUser) {
      existingUser.userName = userName;
      const updatedUser = await existingUser.save();
      return updatedUser;
    }else{
      return null
    }
  }

  async updatePassword(_id: string, password: string, ): Promise<User | null> {
    const existingUser = await this.userModel.findById(_id);
    if(existingUser) {
      existingUser.password = password
      const updatedUser = await existingUser.save()
      return updatedUser
    }else {
      return null
    }
  }
  

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByUserId(_id: string): Promise<User | null> {
    return this.userModel.findOne({ _id }).exec();
  }
}

import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  userName: {type: String},
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});