import Router from "express";
import Post from "../models/post.js";
import { MESSAGES, STATUS_CODES } from "../common/index.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().select("title _id").limit(15).lean();

    if (!posts.length) {
      return res.json({
        success: true,
        posts: [],
      });
    }
    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      posts,
    });
  } catch (err) {
    console.error(err);
    res.status(STATUS_CODES.BAD_REQUEST).send(MESSAGES.BAD_REQUEST);
  }
});

router.get("/post/:postID", async (req, res) => {
  const { postID } = req.params;

  try {
    const post = await Post.findById(postID)
      .populate("comments", "text")
      .lean();

    if (!post) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      post,
      comments: post.comments || [],
    });
  } catch (err) {
    console.error(err);
    res.status(STATUS_CODES.BAD_REQUEST).send(MESSAGES.BAD_REQUEST);
  }
});

export default router;
