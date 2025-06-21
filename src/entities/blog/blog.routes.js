import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
} from "./blog.controller.js";
import { multerUpload } from "../../core/middlewares/multer.js";

const router = express.Router();

router.post("/", multerUpload([{ name: "image", maxCount: 1 }]), createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.delete("/:id", deleteBlog);

export default router;
