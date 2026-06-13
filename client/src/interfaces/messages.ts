import {User} from '@/types/redux';
import {Response} from './redux';
import {UseFormHandleSubmit} from 'react-hook-form';

export interface MessagePayload {
  senderId: string;
  receiverId: string;
  message: string;
}

export interface Message {
  _id?: string;
  senderId: string;
  receiverId?: string;
  message: string;
  createdAt: string;
}

export interface GetMessagesResponse extends Response {
  body: {
    messages: Message[];
  };
}

export interface ChatPayload {
  sendMessage: string;
}

export interface MessagesListProps {
  messagesList: Message[];
  currentUser: User;
}

export interface MessageInputProps {
  control: any;
  handleSubmit: UseFormHandleSubmit<ChatPayload>;
  onSubmit: (data: ChatPayload) => void;
}
