import Router from "express";
import Post from "../models/post.js";
import { MESSAGES, STATUS_CODES } from "../common/index.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().select("titel _id").limit(15).lean();

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

export default router;
