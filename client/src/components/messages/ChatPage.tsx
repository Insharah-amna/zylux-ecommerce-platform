'use client';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useSelector} from 'react-redux';
import {getCurrentUser} from '@/redux/slices/users/usersSlice';
import {ChatPayload, Message} from '@/interfaces/messages';
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from '@/redux/slices/messages/messagesApi';
import Container from '@/components/shared/containers/Container';
import MessagesList from './MessagesList';
import MessageInput from './MessageInput';
import {socketService} from '@/utils/socketUtils';

const ADMIN_ID = process.env.ADMIN_ID || '68a572639026d5af96c2c0dd';

const ChatPage = ({userId}: {userId: string}) => {
  const currentUser = useSelector(getCurrentUser);

  const {control, handleSubmit, reset} = useForm<ChatPayload>({
    defaultValues: {sendMessage: ''},
  });

  let [messagesList, setMessagesList] = useState<Message[]>([]);

  const [sendMessage] = useSendMessageMutation();

  const {data} = useGetMessagesQuery({_id: userId});

  const onSubmit = (data: ChatPayload) => {
    if (!data.sendMessage.trim() || !userId) return;

    const receiverId = currentUser?.role === 'admin' ? userId : ADMIN_ID;

    socketService.sendMessage({
      senderId: currentUser?._id!,
      receiverId,
      message: data.sendMessage,
    });

    sendMessage({
      senderId: currentUser?._id!,
      receiverId,
      message: data.sendMessage,
    });

    reset();
  };

  useEffect(() => {
    if (data?.body?.messages) {
      setMessagesList(data.body.messages);
    }
  }, [data]);

  useEffect(() => {
    socketService.connect(userId);

    const handleNewMessage = (msg: Message) => {
      setMessagesList((prev) => [...prev, msg]);
    };

    socketService.onNewMessage(handleNewMessage);

    return () => {
      socketService.offNewMessage(handleNewMessage);
      socketService.disconnect(userId);
    };
  }, [userId]);

  return (
    <div className='flex-center'>
      <Container>
        <div className='flex flex-col h-screen bg-gray-50 relative'>
          <MessagesList
            messagesList={messagesList}
            currentUser={currentUser!}
          />

          <MessageInput
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        </div>
      </Container>
    </div>
  );
};

export default ChatPage;
