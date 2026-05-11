import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    collection: "comments",
    timestamps: true,
    optimisticConcurrency: true,
    versionKey: "__v",
  },
);

export default mongoose.model("Comment", citySchema);
