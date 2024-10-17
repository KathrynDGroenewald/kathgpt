import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors'; 
import OpenAI from 'openai'; 

dotenv.config();
console.log('OpenAI API Key:', process.env.OPENAI_API_KEY);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => { 
    res.status(200).send({
        message: 'Hello from KathGPT',
    });
});

app.post('/', async (req, res) => { 

    try { 
        const messages = req.body.messages; 

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).send({
                message: 'Messages array is required',
            });
        }
        
        const response = await openai.chat.completions.create({ 
            model: "gpt-4",
            messages: messages,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0.,
        });

        res.status(200).send({ 
            bot: response.choices[0].message.content
        })

    } catch (error) { 
        console.log(error); 
        res.status(500).send({error})
    }
});

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));