import { IconInfoCircle } from '@tabler/icons-react';
import { Tooltip } from 'react-tooltip';

import { GET_CHATBOT_DETAILS } from '@/utils/app/const';

import { useStore } from 'zustand';

export const DisclaimerButton = () => {
  const { disclaimer } = useStore(GET_CHATBOT_DETAILS);

  return (
    <div>
      <p id="tool-tip">
        <IconInfoCircle />
      </p>
      <Tooltip
        anchorSelect="#tool-tip"
        content={
          disclaimer
            ? disclaimer
            : "This AI chatbot is designed to assist you, but please be aware that it may occasionally provide incorrect or misleading information due to limitations in its programming. The chatbot's responses do not reflect the views or values of our organization, as it generates responses based on its training data, not personal beliefs. If you notice any issues, please report them to us immediately. Always cross-verify information from this chatbot before making important decisions."
        }
        place="top"
        style={{
          backgroundColor: 'rgb(42, 39, 39)',
          color: '#ffffff',
          width: '300px',
          fontSize: '12px',
          fontWeight: '300',
        }}
        className="rounded-lg"
      />
    </div>
  );
};
