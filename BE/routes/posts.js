import Router from "express";
import Post from "../models/post.js";
import { MESSAGES, STATUS_CODES } from "../common/index.js";
const router = Router();

router.get("/list", async (req, res) => {
  //   const escapedCity = city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  try {
    const posts = await Post.find().lean();

    if (!posts.length) {
      return res.status(STATUS_CODES.NOT_FOUND).send(MESSAGES.NOT_FOUND);
    }
    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(STATUS_CODES.BAD_REQUEST).send(MESSAGES.BAD_REQUEST);
  }
});

router.post("/form/new_post", async (req, res) => {
  try {
    const dataFromBody = req.body;
    const posts = new Post({
      title: dataFromBody.title,
      content: dataFromBody.content,
      comments: [],
    });
    posts.save();
    res.status(200).send(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("500");
  }
});

export default router;
