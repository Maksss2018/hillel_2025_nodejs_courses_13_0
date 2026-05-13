import Router from "express";
import Post from "../models/post.js";
import { MESSAGES, STATUS_CODES } from "../common/index.js";
const router = Router();

router.get("/", async (req, res) => {
  //   const escapedCity = city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  try {
    const posts = await Post.find();
    //  .populate('comments')
    //.lean();

    if (!posts.length) {
      return res.status(STATUS_CODES.NOT_FOUND).send(MESSAGES.NOT_FOUND);
    }
    console.log(posts);
    res.status(200).send("posts");
  } catch (err) {
    console.error(err);
    res.status(STATUS_CODES.BAD_REQUEST).send(MESSAGES.BAD_REQUEST);
  }
});

router.post("/posts/form/new", async (req, res) => {
  try {
    const dataFromBody = await req.body;
    const posts = new Post({
      title: dataFromBody.title,
      content: dataFromBody.content,
      comments: dataFromBody.comments,
    });
    posts.save();
    console.log(posts);

    console.log("***********************");
    console.log("req.body =", dataFromBody);
    console.log("***********************");
    res.status(200).send(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("500");
  }
});

export default router;
