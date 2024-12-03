import mongoose, { Schema } from "mongoose";
import { question_type } from "./utils";

const QuestionSchema = new mongoose.Schema({
    collection_id:{
        type: Schema.Types.ObjectId,
        ref: "Collection",
        required: true,
    },
    question_header: {
        type: String,
        required: true,
    },
    question_type:{
        type: String,
        required:true,
        enum: question_type
    },
    question_required:{
        type: Boolean
    },
    question_answer: [{
        type: String,
    }],
});

export default mongoose.models.Question || mongoose.model("Question", QuestionSchema);