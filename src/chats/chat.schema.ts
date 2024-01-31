import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  chatId: { type: String, index: true, required: true, unique: true },
  userId: { type: String, required: true },
  chatName: { type: String },
});
