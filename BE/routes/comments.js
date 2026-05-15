import Router from "express";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import { MESSAGES, STATUS_CODES } from "../common/index.js";
const router = Router();

router.get("/list", async (req, res) => {
  //   const escapedCity = city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  try {
    const comments = await Comment.find().limit(15).lean();

    if (!comments.length) {
      return res.json({
        success: true,
        comments,
      });
    }
    console.log(comments);
    res.status(200).json({
      success: true,
      comments,
    });
  } catch (err) {
    console.error(err);
    res.status(STATUS_CODES.BAD_REQUEST).send(MESSAGES.BAD_REQUEST);
  }
});

router.post("/form/new_comment", async (req, res) => {
  try {
    const dataFromBody = req.body;
    const postUpdated = await Post.findByIdAndUpdate(dataFromBody.postID, {
      $push: { comments: dataFromBody.postID },
    });

    const comments = new Comment({
      text: dataFromBody.text,
      post: dataFromBody.postID,
    });
    comments.save();

    res.status(200).send(comments);
  } catch (err) {
    console.error(err);
    res.status(500).send("500");
  }
});

export default router;
