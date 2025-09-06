import {useEffect, useRef} from 'react';

const AutoScroll = ({list}: any) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    scrollToBottom();
  }, [list]);

  return <div ref={messagesEndRef} />;
};

export default AutoScroll;
