import express from "express";
import morgan from "morgan";
import cors from "cors";
import { configDotenv } from "dotenv";
import mongoSanitize from "mongo-sanitize";

import connectDB from "./config/database.js";
import { runServer } from "./config/serverRuntime.js";
import homeRouter from "./routes/home.js";
import postsRouter from "./routes/posts.js";

import { ROUTES, STATUS_CODES, MESSAGES } from "./common/index.js";

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: process.env.ORIGIN_URL || "http://localhost:5173",
    optionsSuccessStatus: 200,
  }),
);
app.use(express.json());
app.use(
  morgan("tiny", {
    skip: (req) => req.url.startsWith("/.well-known"),
  }),
);
app.use((req, res, next) => {
  console.log(req.body);
  req.safe = {
    body: mongoSanitize(req.body || {}),
    query: mongoSanitize(req.query || {}),
    params: mongoSanitize(req.params || {}),
  };
  console.log(req.safe.body);
  next();
});

app.use(ROUTES.HOME, homeRouter);
app.use(ROUTES.POSTS, postsRouter);

app.use((req, res) => {
  res.status(STATUS_CODES.NOT_FOUND).send(MESSAGES.NOT_FOUND);
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
  });
};

runServer(startServer);
