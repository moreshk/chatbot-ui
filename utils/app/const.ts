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

  export const GET_CHAT_QUESTIONS = create<{ questions: string[], setChatQuestions: () => void }>((set) => ({
    questions: [],
    setChatQuestions: async () => {
      const chatbotId = Router.query.chatbotId;
      const { data, error } = await supabase.from('chat_questions').select('question').eq('chatbot_id', chatbotId);
      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        const questions = data.map(item => item.question);
        set({ questions });
      }
    }
  }))