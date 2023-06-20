import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

import {
  GET_CHATBOT_DETAILS,
  GET_CHAT_QUESTIONS,
  GET_DEFAULT_SYSTEM_PROMPT,
} from '@/utils/app/const';

import '@/styles/globals.css';
import { useStore } from 'zustand';

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps<{}>) {
  // const { setDefaultSystemPrompt, DEFAULT_SYSTEM_PROMPT } = GET_DEFAULT_SYSTEM_PROMPT();
  const { setDefaultSystemPrompt, DEFAULT_SYSTEM_PROMPT } = useStore(
    GET_DEFAULT_SYSTEM_PROMPT,
  );
  const queryClient = new QueryClient();

  // // // Create a hook to use the zustand store
  // const { setChatQuestions, questions } = GET_CHAT_QUESTIONS();

  const { setChatQuestions, questions } = useStore(GET_CHAT_QUESTIONS);
  const { setChatbotDetails, name, about_us, business_name, temperature } =
    useStore(GET_CHATBOT_DETAILS);

  // // Call the function to update the questions array

  useEffect(() => {
    setDefaultSystemPrompt();
    setChatQuestions();
    setChatbotDetails();
  }, []);

  // Concatenate all questions into a single string with their question numbers
  const questionsString = questions
    .map((q) => `${q.number}. ${q.text}`)
    .join(' ');

  // console.log('Chatbot name:', name);
  // console.log('About us:', about_us);
  // console.log('Questions', questionsString);
  // console.log('Business name:', business_name);

  // Create the string
  const myString = `You are ${name}, an AI enabled business sales representative for ${business_name}, ${about_us}. Your job is to collect requirements from potential business clients who chat with you. Start each conversation with a: Hey, welcome to ${business_name}. How can I help you today?
Only once the user responds, ask if you can collect the user's name and email to better assist them with their enquiry. If they don't provide their details, continue with the data collection steps and ask again later. You have to collect data points from the clients for the following: ${questionsString}. Your objective is to respond to user queries and ask follow up questions until you have all the information necessary to satisfy a search based upon the above attributes. If the user didn't provide their contact information earlier, ask them to provide their email so someone can get in touch. Once you have the required information, thank the user for their time and mention someone will be in touch, then ask if you can help with anything else.
Limit your responses to no more than one or two lines at a time and collect information from the user by asking only one question at a time while engaging the user in a conversation. If the users asks a question that cannot be answered using only the information you have about your role as defined here, politely decline to answer and steer the conversation in a direction that will help you achieve your objective. Respond using markdown.`;

  // console.log('calculated prompt', myString);
  // console.log('constructed prompt', DEFAULT_SYSTEM_PROMPT);
  // useEffect(() => {
    console.log("constructed prompt", DEFAULT_SYSTEM_PROMPT);
  // }, [DEFAULT_SYSTEM_PROMPT]);

  if (!DEFAULT_SYSTEM_PROMPT)
    return (
      <div className="flex items-center justify-center h-screen my-auto bg-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="black"
          className="w-6 h-6 animate-spin"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </div>
    );

  return (
    <div className={inter.className}>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}

export default appWithTranslation(App);
