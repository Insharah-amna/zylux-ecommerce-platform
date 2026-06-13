export interface NotificationPayload {
  userId: string;
  relatedId: string;
  typeRef: string;
  message: string;
}

export interface Notification {
  _id?: string;
  userId: string;
  relatedId: string;
  typeRef: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
