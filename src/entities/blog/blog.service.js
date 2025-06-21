import { cloudinaryUpload } from "../../lib/cloudinaryUpload.js";
import Blog from "./blog.model.js";


export const createBlogService = async (data, file) => {
  if (file) {
    const uploaded = await cloudinaryUpload(file.path, `blog-${Date.now()}`, "blogs");
    if (uploaded === "file upload failed") throw new Error("Image upload failed");
    data.image = uploaded.secure_url;
    data.imagePublicId = uploaded.public_id;
  }

  const blog = await Blog.create(data);
  return blog;
};

export const getAllBlogsService = async (filter, page, limit) => {
  const skip = (page - 1) * limit;
  const total = await Blog.countDocuments(filter);
  const blogs = await Blog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
  return { blogs, total };
};

export const getBlogByIdService = async (id) => {
  const blog = await Blog.findById(id);
  if (blog) {
    blog.views += 1;
    await blog.save();
  }
  return blog;
};

export const deleteBlogService = async (id) => {
  const blog = await Blog.findById(id);
  if (!blog) throw new Error("Blog not found");

  if (blog.imagePublicId) {
    await cloudinary.uploader.destroy(blog.imagePublicId);
  }

  await blog.deleteOne();
  return blog;
};
