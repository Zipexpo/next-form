import mongoose, { Schema } from "mongoose";

const CollectionSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

export default mongoose.models.Collection || mongoose.model("Collection", CollectionSchema);