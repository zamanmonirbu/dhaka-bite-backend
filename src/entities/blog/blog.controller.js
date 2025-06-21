import { createFilter, createPaginationInfo } from "../../lib/pagination.js";
import {  generateResponse  } from "../../lib/responseFormate.js";

import {
  createBlogService,
  getAllBlogsService,
  getBlogByIdService,
  deleteBlogService,
} from "./blog.service.js";


// POST /api/blogs
export const createBlog = async (req, res) => {
  try {
    const data = req.body;
    const file = req.files?.image?.[0];
    const blog = await createBlogService(data, file);
    generateResponse(res, 201, true, "Blog created successfully", blog);
  } catch (error) {
    generateResponse(res, 500, false, "Failed to create blog", error.message);
  }
};

// GET /api/blogs
export const getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const filter = createFilter(search);
    const { blogs, total } = await getAllBlogsService(filter, parseInt(page), parseInt(limit));
    generateResponse(res, 200, true, "Blogs fetched successfully", {
      blogs,
      pagination: createPaginationInfo(page, limit, total),
    });
  } catch (error) {
    generateResponse(res, 500, false, "Failed to fetch blogs", error.message);
  }
};

// GET /api/blogs/:id
export const getBlogById = async (req, res) => {
  try {
    const blog = await getBlogByIdService(req.params.id);
    if (!blog) {
      generateResponse(res, 404, false, "Blog not found");
      return;
    }
    generateResponse(res, 200, true, "Blog fetched successfully", blog);
  } catch (error) {
    generateResponse(res, 500, false, "Failed to fetch blog", error.message);
  }
};

// DELETE /api/blogs/:id
export const deleteBlog = async (req, res) => {
  try {
    const blog = await deleteBlogService(req.params.id);
    generateResponse(res, 200, true, "Blog deleted successfully", blog);
  } catch (error) {
    generateResponse(res, 500, false, "Failed to delete blog", error.message);
  }
};

