import {io, Socket} from 'socket.io-client';
import {Message, MessagePayload} from '@/interfaces/messages';

const socket: Socket = io(process.env.NEXT_PUBLIC_SERVER_URL!);

const ADMIN_ID = process.env.ADMIN_ID || '68a572639026d5af96c2c0dd';

export const socketService = {
  connect: (userId: string) => {
    if (!socket.connected) socket.connect();
    socket.emit('join', userId);
  },

  disconnect: (userId: string) => {
    socket.emit('leave', userId);
    socket.disconnect();
  },

  onNewMessage: (callback: (msg: Message) => void) => {
    socket.on('newMessage', callback);
  },

  offNewMessage: (callback: (msg: Message) => void) => {
    socket.off('newMessage', callback);
  },

  onOnlineUsers: (callback: (users: string[]) => void) => {
    socket.on('onlineUsers', callback);
  },

  offOnlineUsers: (callback: (users: string[]) => void) => {
    socket.off('onlineUsers', callback);
  },

  sendMessage: ({senderId, receiverId, message}: MessagePayload) => {
    socket.emit('sendMessage', {senderId, receiverId, message});
  },

  ADMIN_ID,
};
