import { IconPlus, IconX } from '@tabler/icons-react';
import { FC } from 'react';

import { Conversation } from '@/types/chat';

interface Props {
  selectedConversation: Conversation;
  onNewConversation: () => void;
}

export const Navbar: FC<Props> = ({
  selectedConversation,
  onNewConversation,
}) => {
  return (
    <nav className="flex w-full justify-between bg-[#202123] py-3 px-4">
      <div className="mr-4"></div>

      <div className="max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap">
        {/* {selectedConversation.name} */}Chat bot
      </div>

      <div className="flex items-center gap-3">
        <IconPlus
          className="cursor-pointer hover:text-neutral-400 mr-0"
          onClick={onNewConversation}
        />
        <IconX
          className="cursor-pointer hover:text-neutral-400 mr-0"
          onClick={() => {
            // @ts-ignore
            if (window?.closeChatBotBubble) {
              // @ts-ignore
              window?.closeChatBotBubble();
            }
          }}
        />
      </div>
    </nav>
  );
};
