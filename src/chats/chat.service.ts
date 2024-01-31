import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from './chat.modul';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private readonly chatModel: Model<Chat>) {}

  async createChat(userId: string, chatId: string, chatName: string): Promise<Chat> {
    const chat = new this.chatModel({ userId, chatId, chatName });
    return chat.save();
  }

  async findChatsByChatId(chatId: string): Promise<Chat | null> {
    return this.chatModel.findOne({ chatId }).exec();
  }

  async findAllUserChatsInfo(userId: string): Promise<Chat[] | null> {
    try {
      const userChats = await this.chatModel.find({ userId }).exec();
      return userChats;
    } catch (error) {
      throw new Error(`Error finding user chats info: ${error.message}`);
    }
  }
}
