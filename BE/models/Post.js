import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Titel is required"],
      minLength: [3, "minimal size of titile 25"],
      maxlength: [5000, "max size of title reached"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      maxlength: [5000, "max size of content reached"],
      trim: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    collection: "posts",
    optimisticConcurrency: true,
    versionKey: "__v",
  },
);

export default mongoose.model("Post", postSchema);
