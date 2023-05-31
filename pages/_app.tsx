import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { useStore } from 'zustand';

import { GET_DEFAULT_SYSTEM_PROMPT, GET_CHAT_QUESTIONS, GET_CHATBOT_DETAILS } from '@/utils/app/const';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps<{}>) {
  const { setDefaultSystemPrompt, DEFAULT_SYSTEM_PROMPT } =
    GET_DEFAULT_SYSTEM_PROMPT();
  const queryClient = new QueryClient();
  console.log(DEFAULT_SYSTEM_PROMPT);

  // // // Create a hook to use the zustand store
  // const { setChatQuestions, questions } = GET_CHAT_QUESTIONS();

  const { setChatQuestions, questions } = useStore(GET_CHAT_QUESTIONS);
  const { setChatbotDetails, name, about_us, business_name } = useStore(GET_CHATBOT_DETAILS);


  // // Call the function to update the questions array


  useEffect(() => {
    setDefaultSystemPrompt();
    setChatQuestions();
    setChatbotDetails();
  }, []);

  // Concatenate all questions into a single string with their question numbers
  const questionsString = questions.map(q => `${q.number}. ${q.text}`).join(" ");

  console.log("Chatbot name:", name);
  console.log("About us:", about_us);
  console.log("Questions", questionsString);
  console.log("Business name:", business_name);

  if (!DEFAULT_SYSTEM_PROMPT) return null;

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
