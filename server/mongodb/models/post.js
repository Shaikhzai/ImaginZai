import mongoose from "mongoose";

const Post= new mongoose.Schema({
    name: {type: String, required: true},
    prompt: {type: String, required: true},
    photo: {type: String, required: true},
});

//model for the schema
const PostSchema= mongoose.model('Post', Post);

export default PostSchema;