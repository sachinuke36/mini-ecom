import { GoogleGenAI } from "@google/genai";

import dotenv from 'dotenv'
dotenv.config();

    export const ai = new GoogleGenAI({ apiKey: process.env.OPENAI_API_KEY as string });


// export const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY as string,
// });