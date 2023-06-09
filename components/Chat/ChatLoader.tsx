import { IconRobot } from '@tabler/icons-react';
import { FC } from 'react';

interface Props {}

export const ChatLoader: FC<Props> = () => {
  return (
    <div className="" style={{ overflowWrap: 'anywhere' }}>
      <div className="relative m-auto flex gap-2 p-4 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
        <div className="mr-20 rounded-lg bg-blue-500  py-3 px-4 font-light text-white w-full">
          <span className="animate-pulse cursor-default mt-1">▍</span>
        </div>
      </div>
    </div>
  );
};
