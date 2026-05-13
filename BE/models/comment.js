import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Text is required"],
      minLength: [25, "your message should be over 25 s symbels"],
      maxlength: 10000,
      trim: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      ref: "Post",
      required: true,
    },
  },
  {
    collection: "comments",
    optimisticConcurrency: true,
    versionKey: "__v",
  },
);

export default mongoose.model("Comment", CommentSchema);
