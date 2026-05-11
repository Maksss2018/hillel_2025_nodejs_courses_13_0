import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Titel is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId }],
  },
  {
    collection: "posts",
    timestamps: true,
    optimisticConcurrency: true,
    versionKey: "__v",
  },
);

export default mongoose.model("Post", citySchema);
