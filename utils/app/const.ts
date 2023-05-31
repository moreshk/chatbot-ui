import Router from "next/router";
import { supabase } from '@/lib/supabase';
import { create } from "zustand";

export const DEFAULT_SYSTEM_PROMPT =
  process.env.NEXT_PUBLIC_DEFAULT_SYSTEM_PROMPT ||
  "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.";

export const OPENAI_API_HOST =
  process.env.OPENAI_API_HOST || 'https://api.openai.com';

export const DEFAULT_TEMPERATURE =
  parseFloat(process.env.NEXT_PUBLIC_DEFAULT_TEMPERATURE || "1");

export const OPENAI_API_TYPE =
  process.env.OPENAI_API_TYPE || 'openai';

export const OPENAI_API_VERSION =
  process.env.OPENAI_API_VERSION || '2023-03-15-preview';

export const OPENAI_ORGANIZATION =
  process.env.OPENAI_ORGANIZATION || '';

export const AZURE_DEPLOYMENT_ID =
  process.env.AZURE_DEPLOYMENT_ID || '';

  export const GET_DEFAULT_SYSTEM_PROMPT = create<{ DEFAULT_SYSTEM_PROMPT: string, setDefaultSystemPrompt: () => void }>((set) => ({
    DEFAULT_SYSTEM_PROMPT: "",
    setDefaultSystemPrompt: async () => {
      const chatbotId = Router.query.chatbotId;
  
      // Fetch and set the chatbot prompt
      const { data: promptData, error: promptError } = await supabase.from('chatbots').select('prompt').eq('id', chatbotId)
      if (promptError) {
        console.log(promptError)
        return
      }
      if (promptData) {
        set({ DEFAULT_SYSTEM_PROMPT: promptData[0].prompt })
      } else {
        set({ DEFAULT_SYSTEM_PROMPT: 'hello' })
      }

    }
  }))

  // export const GET_CHAT_QUESTIONS = create<{ questions: string[], setChatQuestions: () => void }>((set) => ({
  //   questions: [],
  //   setChatQuestions: async () => {
  //     const chatbotId = Router.query.chatbotId;
  //     const { data, error } = await supabase.from('chat_questions').select('question').eq('chatbot_id', chatbotId);
  //     if (error) {
  //       console.log(error);
  //       return;
  //     }
  //     if (data) {
  //       const questions = data.map(item => item.question);
  //       set({ questions });
  //     }
  //   }
  // }))

// Change in your zustand store
// export const GET_CHAT_QUESTIONS = create(set => ({
//   questions: [],
//   setChatQuestions: async () => {
//     const chatbotId = Router.query.chatbotId;
//     const { data, error } = await supabase.from('chat_questions').select('question, question_number').eq('chatbot_id', chatbotId)
//     if (error) {
//       console.log(error);
//       return;
//     }
//     if (data) {
//       // sort the data by question_number
//       const sortedData = data.sort((a, b) => a.question_number - b.question_number);
//       // map the sorted data to an array of strings where each string is of the format "question_number. question"
//       const questionsArray = sortedData.map(item => `${item.question_number}. ${item.question}`);
//       set({ questions: questionsArray });
//     }
//   },
// }));

type ChatQuestionStore = {
  questions: { number: number, text: string }[],
  setChatQuestions: () => Promise<void>,
};

export const GET_CHAT_QUESTIONS = create<ChatQuestionStore>(set => ({
  questions: [],
  setChatQuestions: async () => {
    const chatbotId = Router.query.chatbotId;
    const { data, error } = await supabase.from('chat_questions').select('question, question_number').eq('chatbot_id', chatbotId);
    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      const sortedData = data.sort((a, b) => a.question_number - b.question_number);
      const questionsArray = sortedData.map(item => ({ number: item.question_number, text: item.question }));
      set({ questions: questionsArray });
    }
  },
}));

type ChatbotDetailsStore = {
  name: string,
  about_us: string,
  setChatbotDetails: () => Promise<void>,
};

export const GET_CHATBOT_DETAILS = create<ChatbotDetailsStore>(set => ({
  name: "",
  about_us: "",
  setChatbotDetails: async () => {
    const chatbotId = Router.query.chatbotId;
    const { data, error } = await supabase
      .from('chatbots')
      .select('name, about_us')
      .eq('id', chatbotId);
    if (error) {
      console.log(error);
      return;
    }
    if (data && data.length > 0) {
      set({ name: data[0].name, about_us: data[0].about_us });
    }
  },
}));