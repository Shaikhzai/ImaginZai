//for sharing with community
/* import express from "express";
import * as dotenv from 'dotenv';
import {v2 as cloudinary} from 'cloudinary';
import Post from '../mongodb/models/post.js';

//caling environmentel variables
dotenv.config();

//new instance of a router
const router= express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//get all posts router
router.route('/').get(async(req, res)=> {
    try {
        const posts= await Post.find({});

        res.status(200).json({success: true, data: posts})
    } catch (error) {
        res.status(500).json({success: false, message: error})
        
    }
});

//create a post router
router.route('/').get(async(req, res)=> {
    try {
        //sending photo from frontend to backend
        const {name, prompt, photo}= req.body;
        //upload photo to cloudinary(site which hosts photos in cloud)
        const photoUrl= await cloudinary.uploader.upload(photo);
        //creating new post in the database
        const newPost= await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        })

        res.status(201).json({success: true, data: newPost});
    } catch (error) {
        res.status(500).json({success: false, message: error})
    }
    
});

export default router; */


import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
  }
});

export default router;