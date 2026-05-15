import Router from "express";
import Post from "../models/post.js";
import Comment from "../models/Comment.js";
import { MESSAGES, STATUS_CODES } from "../common/index.js";
const router = Router();

router.get("/list", async (req, res) => {
  try {
    const posts = await Post.find()
      /*.populate({
        path: "comments",
        select: "text -_id", // Includes text; explicitly excludes _id
      })*/
      //.populate("comments", "text -_id")
      .limit(15)
      .lean();

    if (!posts.length) {
      return res.json({
        success: true,
        posts: [],
      });
    }
    console.log(posts);
    res.status(200).json({
      success: true,
      posts,
    });
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
    });
    posts.save();
    res.status(200).send(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("500");
  }
});

router.get("/list/of/comments/:post_id", async (req, res) => {
  const postID = req.params.post_id;
  try {
    const comments = await Comment.find({ post: postID }).limit(15).lean();

    if (!comments.length) {
      return res.json({
        success: true,
        comments: [],
      });
    }
    res.status(200).json({
      success: true,
      comments,
    });
  } catch (err) {
    res.status(STATUS_CODES.BAD_REQUEST).send(MESSAGES.BAD_REQUEST);
  }
});

router.post("/form/new_comment", async (req, res) => {
  try {
    const dataFromBody = req.body;
    const comment = new Comment({
      text: dataFromBody.text,
      post: dataFromBody.postID,
    });

    await Post.findByIdAndUpdate(dataFromBody.postID, {
      $push: { comments: comment._id },
    });
    await comment.save();
    res.status(200).send(comment);
  } catch (err) {
    console.error(err);
    res.status(500).send("500");
  }
});

router.post("/form/delete_comment", async (req, res) => {
  try {
    const dataFromBody = req.body;
    const comment = await Comment.findByIdAndDelete(dataFromBody.commentID);

    await Post.updateOne(
      { _id: dataFromBody.postID },
      { $pull: { comments: dataFromBody.commentID } },
    );
    res.status(200).send(comment);
  } catch (err) {
    console.error(err);
    res.status(500).send("500");
  }
});

export default router;
