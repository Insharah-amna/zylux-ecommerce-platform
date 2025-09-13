import {MessagesListProps, Message} from '@/interfaces/messages';
import {getTime} from '@/utils/dateUtils';
import AutoScroll from '@/components/shared/scroll';

const MessagesList = ({messagesList, currentUser}: MessagesListProps) => {
  if (messagesList.length === 0)
    return (
      <div className='flex-center h-[85vh] text-gray-500 text-center text-sm sm:text-lg'>
        Your chat will appear here once you send a message.
      </div>
    );

  return (
    <div className='scrollbar-none flex-1 overflow-y-auto p-4 space-y-2 max-h-[85vh]'>
      {messagesList.map((msg: Message) => (
        <div key={msg._id}>
          <div
            className={`p-2 mb-1 rounded-md max-w-xs sm:max-w-sm ${
              msg.senderId === currentUser?._id
                ? 'bg-accent/40 text-black ml-auto'
                : 'bg-gray-200'
            }`}
          >
            {msg.message}
          </div>

          <span
            className={`text-xs text-gray-500 ${
              msg.senderId !== currentUser?._id ? 'flex-start' : 'flex-end'
            }`}
          >
            {getTime(msg.createdAt)}
          </span>
        </div>
      ))}

      <AutoScroll list={messagesList} />
    </div>
  );
};

export default MessagesList;
