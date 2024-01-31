import { Controller, Post, Get, Query, Body, HttpStatus } from '@nestjs/common';
import { ChatService } from './chat.service';
import { v4 as uuidv4 } from 'uuid';

function generateUniqueChatId(): string {
    return uuidv4();
  }
  
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('createChat')
  async createChat(@Body('userId') userId: string, @Body("chatName") chatName: string) {
    try {
      const chatId = generateUniqueChatId(); 

      const createdChat = await this.chatService.createChat(userId, chatId, chatName);

      return {
        status: HttpStatus.CREATED,
        message: 'Chat created successfully',
        chat: createdChat,
      };
      
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error creating chat',
        error: error.message,
      };
    }
  }

  @Get('findChats')
  async findChatsInfo(@Body('userId') userId: string) {
    try {
      const userChatsInfo = await this.chatService.findAllUserChatsInfo(userId);

      return {
        status: HttpStatus.OK,
        message: 'User chats info found successfully',
        userChatsInfo: userChatsInfo

      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error finding user chats info',
        error: error.message,
      };
    }
  }
}