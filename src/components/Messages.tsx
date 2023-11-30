import React, { FC, useEffect } from 'react';
import Imessage from '../types/Imessage';

interface MessagesProps {
  messages: Imessage[];
}

const Messages: FC<MessagesProps> = ({ messages }) => {
  useEffect(() => {
    let messagesBlock = document.getElementById('messages_block');
    console.log(messagesBlock?.clientHeight);
    if (messagesBlock?.clientHeight > 100) {
      messagesBlock?.scrollTo(0, messagesBlock.clientHeight);
    }
  }, []);

  return (
    <div className="mt-10 overflow-y-auto h-[100px]" id="messages_block">
      <ul className="flex flex-col gap-4">
        {messages?.length > 0
          ? messages.map((message) => (
              <li className="border-b-2 border-gray-100 pb-4">
                <div className="flex gap-3 items-center">
                  <p className="font-medium">{message.author}</p>
                  <p className="text-gray-500 text-sm">{message.timestamp}</p>
                </div>

                <p>{message.massage}</p>
              </li>
            ))
          : 'Комментариев нет'}
      </ul>
    </div>
  );
};

export default Messages;
