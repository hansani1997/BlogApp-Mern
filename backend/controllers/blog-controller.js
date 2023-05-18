import mongoose from "mongoose";
import Blog from "../models/Blog";
import User from "../models/User";

//Get blogs
export const getAllBlogs = async (req,res,next) => {
    let blogs;

    try{
        blogs = await Blog.find().populate('user');
    }catch(err){
        console.log(err);
    }

    if(!blogs){
       return res.status(404).json({message:"No Blogs Found"}) 
    }

    return res.status(200).json(blogs);
}


//Add Blogs
export const addBlog = async(req, res, next) => {
    const { title, description, image, user} = req.body;

    let exsitingUser;

    try{
        exsitingUser = await User.findById(user);
    }catch(err){
        return console.log(err);
    }

    if(!exsitingUser){
        return res.status(400).json({message:"Unable to Find User by this ID"})
    }
    const blog = new Blog({
        title,
        description,
        image,
        user,
    });

    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        exsitingUser.blogs.push(blog);

        await exsitingUser.save({session});

        await session.commitTransaction();

    }catch(err){
        console.log(err);
        return res.status(500).json({message:err})
    }

    return res.status(200).json({blog})
};

//Update Blog
export const updateBlog = async (req, res, next) => {
    const {title, description} = req.body;
    const blogId = req.params.id;

    let blog;
    try{
        blog = await Blog.findByIdAndUpdate(blogId,{
            title,
            description
        })
    }catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(500).json({message:"Unable to update a Blog"})
    }

    return res.status(200).json({blog});
}

//Get blog by ID
export const getBlogById = async(req,res,next) => {
   const id = req.params.id;
   
   let blog;

   try{
    blog = await Blog.findById(id);
   }catch(err){
    return console.log(err);
   }

   if(!blog){
    return res.status(400).json({message:"No Blog Found"});
   }

   return res.status(200).json({blog});
}

//Delete particular blog
export const deleteBlog = async(req, res, next) => {
    const id = req.params.id;

    let blog;

    try{
        blog = await Blog.findByIdAndRemove(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }catch(err){
        console.log(err);
    }

    if(!blog){
        return res.status(500).json({message:"No Blog found"})
    }

    return res.status(400).json({message:"Blog Deleted Successfully"});
}

//Get blogs by user Id
export const getBlogByUserID = async(req,res,next) => {
    const userId = req.params.id;
    let userBlogs;

    try{
        userBlogs = await User.findById(userId).populate("blogs");
    }
    catch(err){
        return console.log(err);
    }

    if(!userBlogs){
        return res.status(404).json({message:"no Blogs Found"})
    }
    return res.status(200).json({user:userBlogs})
}