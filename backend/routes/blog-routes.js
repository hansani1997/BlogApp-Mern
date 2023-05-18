import express from "express";
import {getAllBlogs , addBlog, updateBlog, getBlogById, deleteBlog, getBlogByUserID} from '../controllers/blog-controller';

const blogRouter = express.Router();

blogRouter.get("/",getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id",getBlogById);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id",getBlogByUserID);

export default blogRouter;