import { Document } from 'mongoose';

export interface Chat extends Document {
  userId: string;
  chatId: string;
  chatName: string;
}
