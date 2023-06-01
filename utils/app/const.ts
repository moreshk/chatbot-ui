import Router from "next/router";
import { supabase } from '@/lib/supabase';
import { create } from "zustand";

// export const DEFAULT_SYSTEM_PROMPT =
//   process.env.NEXT_PUBLIC_DEFAULT_SYSTEM_PROMPT ||
//   "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.";

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

  // export const GET_DEFAULT_SYSTEM_PROMPT = create<{ DEFAULT_SYSTEM_PROMPT: string, setDefaultSystemPrompt: () => void }>((set) => ({
  //   DEFAULT_SYSTEM_PROMPT: "",
  //   setDefaultSystemPrompt: async () => {
  //     const chatbotId = Router.query.chatbotId;
  
  //     // Fetch and set the chatbot prompt
  //     const { data: promptData, error: promptError } = await supabase.from('chatbots').select('prompt').eq('id', chatbotId)
  //     if (promptError) {
  //       console.log(promptError)
  //       return
  //     }
  //     if (promptData) {
  //       set({ DEFAULT_SYSTEM_PROMPT: promptData[0].prompt })
  //     } else {
  //       set({ DEFAULT_SYSTEM_PROMPT: 'hello' })
  //     }

  //   }
  // }))

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
  business_name: string,
  setChatbotDetails: () => Promise<void>,
};

export const GET_CHATBOT_DETAILS = create<ChatbotDetailsStore>(set => ({
  name: "",
  about_us: "",
  business_name: "",
  setChatbotDetails: async () => {
    const chatbotId = Router.query.chatbotId;
    const { data, error } = await supabase
      .from('chatbots')
      .select('name, about_us, business_name')
      .eq('id', chatbotId);
    if (error) {
      console.log(error);
      return;
    }
    if (data && data.length > 0) {
      set({ name: data[0].name, about_us: data[0].about_us, business_name: data[0].business_name });
    }
  },
}));

export const GET_DEFAULT_SYSTEM_PROMPT = create<{ DEFAULT_SYSTEM_PROMPT: string, setDefaultSystemPrompt: () => Promise<void> }>((set) => ({
  DEFAULT_SYSTEM_PROMPT: "",
  setDefaultSystemPrompt: async () => {
    const chatbotId = Router.query.chatbotId;
    const { setChatQuestions, questions } = GET_CHAT_QUESTIONS();
    const { setChatbotDetails, name, about_us, business_name } = GET_CHATBOT_DETAILS();

    // Ensure questions and chatbot details are fetched and stored first
    await Promise.all([setChatQuestions(), setChatbotDetails()]);

    // Concatenate all questions into a single string with their question numbers
    const questionsString = questions.map(q => `${q.number}. ${q.text}`).join(" ");

    // Create the string
    const myString = `You are ${name}, an AI enabled business sales representative for ${business_name} , ${about_us}. Your job is to collect requirements from potential business clients who chat with you. Start each conversation with a: Hey, welcome to ${business_name}. How can I help you today? 
      Only once the user responds, ask if you can collect the user's name and email to better assist them with their enquiry. If they don't provide their details, continue with the data collection steps and ask again later.
      You have to collect data points from the clients for the following: ${questionsString}. Your job is to respond to user queries and ask follow up questions until you have all the information necessary to satisfy a search based upon the above attributes. If the user didn't provide their contact information earlier, ask them to provide their email so someone can get in touch. Once you have the required information, thank the user for their time and mention someone will be in touch, then ask if you can help with anything else. 
      Limit your responses to no more than one or two lines at a time and collect information from the user by asking one question at a time only while engaging the user in a conversation. Respond using markdown. `;

    set({ DEFAULT_SYSTEM_PROMPT: myString });
  }
}));