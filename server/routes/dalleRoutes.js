import express from "express";
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from "openai";

//caling environmentel variables
dotenv.config();

//new instance of a router
const router= express.Router();

//configuring openai api
const configuration= new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

//instance of openai api
const openai= new OpenAIApi(configuration);

router.route('/').get((req, res)=> {
    res.send('Hello from DALL-E API');
});

//for generating the image from dall-e based on the prompt recived from the user
router.route('/').post(async(req, res)=> {
    try {
        const {prompt}= req.body;
        //for ai response
        const aiResponse= await openai.createImage({
           prompt,
           n: 1,
           size: '1024x1024',
           response_format: 'b64_json', 
        });

        //to get the image out
        const image= aiResponse.data.data[0].b64_json;
        //sending it to the frontend
        res.status(200).json({photo: image});
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message)
    }
})

export default router;