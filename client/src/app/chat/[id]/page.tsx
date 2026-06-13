import ChatPage from '@/components/messages/ChatPage';
import {PageParamProps} from '@/interfaces/common';

export default async function page({params}: PageParamProps) {
  const {id} = await params;

  return <ChatPage userId={id} />;
}
