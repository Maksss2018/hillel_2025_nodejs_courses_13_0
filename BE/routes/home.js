import Router from "express";
//import City from "../models/city.js";
import { MESSAGES, STATUS_CODES } from "../common/index.js";
const router = Router();

router.get("/", async (req, res) => {
  //   const escapedCity = city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  res.status(200).send("home");
});

export default router;
