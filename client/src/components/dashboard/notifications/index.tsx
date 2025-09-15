'use client';
import {useEffect} from 'react';
import {toast} from 'react-toastify';
import {
  useGetNotificationsQuery,
  useUpdateNotificationsMutation,
} from '@/redux/slices/notifications/notificationsApi';
import {socketService} from '@/utils/socketUtils';
import ComponentLoader from '@/components/shared/loaders/ComponentLoader';
import {Notification} from '@/interfaces/notifications';
import {formatDate} from '@/utils/dateUtils';
import PrimaryButton from '@/components/shared/buttons/PrimaryButton';

const Notifications = () => {
  const [markAsRead] = useUpdateNotificationsMutation();

  const {data, isLoading} = useGetNotificationsQuery();

  const notificationList = data?.body.notifications ?? [];

  useEffect(() => {
    socketService.onOrderNotification((data) => {
      toast.info(`New order placed: ${data.orderId}`);
    });

    return () => {
      socketService.offOrderNotification(() => {});
    };
  }, []);

  if (isLoading) return <ComponentLoader />;

  return (
    <div className='mx-auto px-14 pt-8 overflow-y-scroll scrollbar-none'>
      <div className='flex justify-between'>
        <h2 className='text-2xl font-semibold mb-4'>Notifications</h2>
        <PrimaryButton
          buttonText='Mark all as read'
          className='rounded-sm bg-accent w-[140px] hover:bg-accent/90'
          handleClick={() => markAsRead()}
        />
      </div>

      <div className='h-[70vh] overflow-y-scroll scrollbar-none'>
        {notificationList.length === 0 && (
          <div className='flex-center h-[80vh] text-gray-500'>
            No new notifications.
          </div>
        )}

        {notificationList.map((notification: Notification) => (
          <div
            key={notification._id}
            className={`${
              !notification.isRead ? 'bg-accent/10' : 'bg-gray-100'
            } flex flex-col rounded-sm px-3 py-2 my-3 cursor-pointer`}
          >
            <span>{notification.message}</span>

            <span className='text-xs text-gray-600 text-right'>
              {formatDate({date: notification.createdAt})}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
