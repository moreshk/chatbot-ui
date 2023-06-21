import Router from "next/router";
import { supabase } from '@/lib/supabase';
import { create } from "zustand";

export const DEFAULT_SYSTEM_PROMPT =
  process.env.NEXT_PUBLIC_DEFAULT_SYSTEM_PROMPT ||
  "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.";

export const OPENAI_API_HOST =
  process.env.OPENAI_API_HOST || 'https://api.openai.com';

export const DEFAULT_TEMPERATURE =
  parseFloat(process.env.NEXT_PUBLIC_DEFAULT_TEMPERATURE || "0");

export const OPENAI_API_TYPE =
  process.env.OPENAI_API_TYPE || 'openai';

export const OPENAI_API_VERSION =
  process.env.OPENAI_API_VERSION || '2023-03-15-preview';

export const OPENAI_ORGANIZATION =
  process.env.OPENAI_ORGANIZATION || '';

export const AZURE_DEPLOYMENT_ID =
  process.env.AZURE_DEPLOYMENT_ID || '';

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
  initial_message: string,
  temperature: number,
  disclaimer: string,
  ai_model: string,
  bot_profile_pic: string,
  setChatbotDetails: () => Promise<void>,
};

export const GET_CHATBOT_DETAILS = create<ChatbotDetailsStore>(set => ({
  name: "",
  about_us: "",
  business_name: "",
  initial_message: '',
  temperature: 0,
  ai_model: "gpt-3.5-turbo",
  disclaimer: '',
  bot_profile_pic: '',
  setChatbotDetails: async () => {
    const chatbotId = Router.query.chatbotId;
    const { data, error } = await supabase
      .from('chatbots')
      .select('name, about_us, business_name, initial_message, temperature, ai_model, disclaimer, bot_profile_pic')
      .eq('id', chatbotId);
    if (error) {
      console.log(error);
      return;
    }
    if (data && data.length > 0) {
      set((state) => ({ ...state, ...data[0] }));
    }
  },
}));

export const GET_DEFAULT_SYSTEM_PROMPT = create<{ DEFAULT_SYSTEM_PROMPT: string, setDefaultSystemPrompt: () => Promise<void> }>((set) => ({
  DEFAULT_SYSTEM_PROMPT: "",
  setDefaultSystemPrompt: async () => {

    const chatbotId = Router.query.chatbotId;
    const { data, error } = await supabase.from('chat_questions').select('question, question_number').eq('chatbot_id', chatbotId);

    const { data: data1, error: error1 } = await supabase
      .from('chatbots')
      .select('name, about_us, business_name')
      .eq('id', chatbotId);

    if (error && error1) {
      console.log(error || error1);
      return;
    }
    if (data && data.length && data1 && data1.length) {
      const sortedData = data.sort((a, b) => a.question_number - b.question_number);
      const questionsArray = sortedData.map(item => ({ number: item.question_number, text: item.question }));
      // set({ questions: questionsArray });
      // const questionsString = questionsArray.map(q => `${q.number}. ${q.text}`).join(" ");
      const questionsString = questionsArray.map(q => `Question ${q.number}. ${q.text}`).join("\n");
      const name = data1[0]?.name;
      const business_name = data1[0]?.business_name;
      const about_us = data1[0]?.about_us;

      // const myString = `You are ${name}, an AI enabled business sales representative for ${business_name} , ${about_us}. Your job is to collect requirements from potential business clients who chat with you. Start each conversation with a: Hey, welcome to ${business_name}. How can I help you today?
      // Only once the user responds, ask if you can collect the user's name and email to better assist them with their enquiry. If they don't provide their details, continue with the data collection steps and ask again later.
      // You have to collect data points from the clients for the following: ${questionsString}. Your job is to collect the required inforation from the user until you have all the information necessary to satisfy a search based upon the attributes mentioned. Before requesting any information from the user, make sure that was not already provided by the user. If the user asks a question, answer it only using the information provided here about your role. If the users question cannot be answered using the information you have in context of your role as the sales representative as defined here, mention that you are not able to assist in this matter. Always try to steer the conversation in such a way that helps you with your objective of collecting the required information rather than trying to answer follow up questions from the user. If the user didn't provide their contact information earlier, ask them to provide their email so someone can get in touch. Once you have the required information, thank the user for their time and mention someone will be in touch, then ask if you can help with anything else.
      // If the user question is around pricing, estimates, quotes etc then mention that in order to provide an accurate estimate someone will get in touch with them. Limit your responses to no more than one or two lines at a time and collect information from the user by asking one question at a time only while engaging the user in a conversation. Respond using markdown.`;

      const myString = `You are ${name}, the AI-powered liaison for ${business_name}, an enterprise offering the following services:

${about_us}

Your mission is to gather essential information from users in a conversational manner. Begin by warmly welcoming them: "Hello, welcome to [Business Name]. How may I assist you today?"

Once the user responds, begin to gather the following details from them sequentially:

${questionsString}

Remember to only ask for new information and to pose only one question at a time, ensuring an efficient and non-confusing dialogue. Even when other topics arise, be sure to return to the primary task of data collection.

Respond to user inquiries strictly based on the information supplied here. If a question falls outside this scope, courteously inform them that you're unable to assist with that particular issue and that a team member will follow up. Keep steering the discussion towards your primary objective - data gathering. Prioritize collecting necessary information over answering secondary queries.

After collecting all the necessary data, thank them for their time, reassure them of upcoming contact, and inquire if there's any other assistance needed.


For queries related to pricing, estimates, or quotes, inform them a team member will be reaching out with precise details. If they haven't already, ask them for their name and email.

Guidelines for interaction:

Limit your responses to one or two sentences each time.
Gather information by asking only one question at a time, avoiding multiple questions in the same message.
Use the user's name just once, in the immediate response after receiving it. Avoid repeatedly using their name.
Format your responses using markdown for better readability.`

      set({ DEFAULT_SYSTEM_PROMPT: myString });
    }


  }
}));



