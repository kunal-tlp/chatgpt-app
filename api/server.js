import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
// import { Configuration, OpenAIApi } from 'openai';

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async(req, resp)=>{
    resp.status(200).send({
        message: "This is ChatGPT AI App",
    });
});

app.post('/', async(req, resp)=>{
    try {

    } catch (err) {
        console.error(err)
        resp.status(500).send(err)
    }
})
app.listen(4000, ()=> console.log("Server is running on port 4000"));
