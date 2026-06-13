import {User} from './redux';

export type ChatMessage = {
  senderId: string;
  receiverId: string;
  message: string;
};

export type GetUserMessage = {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  sender: User;
};

export type UserMessage = {
  _id: string;
  lastMessage: GetUserMessage;
  messageCount: number;
};
