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
  const { about_us, name } = useStore(GET_CHATBOT_DETAILS);

  return (
    <div className=" pt-11">
      <nav className="flex w-full justify-between bg-[#202123] text-white py-3 px-4">
        <div className="max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap">
          {name}
        </div>

        <div className="flex items-center gap-3">
          <IconRefresh
            className="cursor-pointer hover:text-neutral-400 mr-0"
            onClick={onNewConversation}
          />
          <div className="w-5 h-5"></div>
        </div>
      </nav>
    </div>
  );
};
