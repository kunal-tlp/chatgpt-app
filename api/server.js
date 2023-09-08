import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
// import { Configuration, OpenAIApi } from 'openai';
import OpenAI from "openai";

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, resp) => {
    resp.status(200).send({
        message: "This is ChatGPT AI App",
    });
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post('/', async (req, resp) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "system",
                    "content": "You will be provided with a piece of Python code, and your task is to provide ideas for efficiency improvements."
                },
                {
                    "role": "user",
                    "content": "from typing import List\n            \n            \ndef has_sum_k(nums: List[int], k: int) -> bool:\n    \"\"\"\n    Returns True if there are two distinct elements in nums such that their sum \n    is equal to k, and otherwise returns False.\n    \"\"\"\n    n = len(nums)\n    for i in range(n):\n        for j in range(i+1, n):\n            if nums[i] + nums[j] == k:\n                return True\n    return False"
                }
            ],
            prompt: resp.body.input,
            temperature: 0,
            max_tokens: 4000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        console.log("PASSED: ", req.body.input)

        resp.status(200).send({
            bot: response.data.choices[0].text,
        });

    } catch (err) {
        console.log("FAILED: ", req.body.input)
        console.error(err)
        resp.status(500).send(err)
    }
});
app.listen(4000, () => console.log("Server is running on port 4000"));
