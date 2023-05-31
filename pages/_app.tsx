import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

import { GET_DEFAULT_SYSTEM_PROMPT, GET_CHAT_QUESTIONS } from '@/utils/app/const';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps<{}>) {
  const { setDefaultSystemPrompt, DEFAULT_SYSTEM_PROMPT } =
    GET_DEFAULT_SYSTEM_PROMPT();
  const queryClient = new QueryClient();
  console.log(DEFAULT_SYSTEM_PROMPT);

  // Call the function to update the questions array
  GET_CHAT_QUESTIONS.setChatQuestions();

  // Access the questions array
  const questions = GET_CHAT_QUESTIONS.questions;

  console.log(questions);

  useEffect(() => {
    setDefaultSystemPrompt();
  }, []);

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
