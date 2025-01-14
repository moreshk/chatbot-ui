import { IconRefresh, IconX } from '@tabler/icons-react';
import { FC } from 'react';

import { GET_CHATBOT_DETAILS } from '@/utils/app/const';

import { Conversation } from '@/types/chat';

import { useStore } from 'zustand';

interface Props {
  selectedConversation: Conversation;
  onNewConversation: () => void;
}

export const Navbar: FC<Props> = ({
  selectedConversation,
  onNewConversation,
}) => {
  const { bot_profile_pic, name, setChatbotDetails } =
    useStore(GET_CHATBOT_DETAILS);

  return (
    <nav className="flex w-full justify-between bg-[#202123] text-white relative px-4 h-16">
      <div className="flex items-center gap-2">
        {bot_profile_pic && (
          <img
            className="w-12 h-12 rounded-full object-contain"
            src={bot_profile_pic}
            alt="Bot profile picture"
            width={48}
            height={48}
          />
        )}
        <div className="max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap">
          {name}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <IconRefresh
          className="cursor-pointer hover:text-neutral-400 mr-0"
          onClick={() => {
            onNewConversation();
            setChatbotDetails();
          }}
        />
        <div className="w-5 h-5"></div>
      </div>
    </nav>
  );
};
