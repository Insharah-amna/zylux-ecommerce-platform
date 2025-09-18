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

  // ----------------- Messages -----------------
  onNewMessage: (callback: (msg: Message) => void) => {
    socket.on('newMessage', callback);
  },

  offNewMessage: (callback: (msg: Message) => void) => {
    socket.off('newMessage', callback);
  },

  // ----------------- Online Users -----------------
  onOnlineUsers: (callback: (users: string[]) => void) => {
    socket.on('onlineUsers', callback);
  },

  offOnlineUsers: (callback: (users: string[]) => void) => {
    socket.off('onlineUsers', callback);
  },

  sendMessage: ({senderId, receiverId, message}: MessagePayload) => {
    socket.emit('sendMessage', {senderId, receiverId, message});
  },

  // ----------------- Orders -----------------
  emitNewOrder: ({userId, orderId}: {userId: string; orderId: string}) => {
    socket.emit('new_order', {userId, orderId});
  },

  onOrderNotification: (
    callback: (order: {userId: string; orderId: string}) => void
  ) => {
    socket.on('order_notification', callback);
  },

  offOrderNotification: (
    callback: (order: {userId: string; orderId: string}) => void
  ) => {
    socket.off('order_notification', callback);
  },

  // ----------------- Reviews -----------------
  emitNewReview: ({userId, productId}: {userId: string; productId: string}) => {
    socket.emit('new_review', {userId, productId});
  },

  onReviewNotification: (
    callback: (review: {userId: string; productId: string}) => void
  ) => {
    socket.on('review_notification', callback);
  },

  offReviewNotification: (
    callback: (review: {userId: string; productId: string}) => void
  ) => {
    socket.off('review_notification', callback);
  },

  ADMIN_ID,
};
