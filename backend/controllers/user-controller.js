import User from "../models/User";
import bcrypt from "bcryptjs"; //To secure password


//Get all users
export const getAllUsers = async(req,res,next) => {
    let users;
    try{
        users = await User.find();
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message: "No User Found"});
    }

    return res.status(200).json({users});
}

//User signup
 export const signup = async(req, res, next) => {
    const { name, email, password} = req.body;

    //checking the validation
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err){
        console.log(err);
    }

    if(existingUser){
        return res
        .status(400)
        .json({message:"User alredy exists! Login Instead"})
    }
    
    const hashedPassword = bcrypt.hashSync(password); //hashing the password
    //Create new user
    const user = new User({
        name,
        email,
        password:hashedPassword,
        blogs:[],
    });
    try{
       await user.save();
    }catch(err){
        return console.log(err);
    }

    return res.status(201).json({user})
 }

 //User Login
 export const loginUser = async(req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err){
        console.log(err);
    }

    if(!existingUser){
        return res
        .status(404)
        .json({message:"Dont find the User by this Email"});
    }

    //Check entered password is correct or not
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect Password"})
    }
    return res.status(200).json({message:"Login Successfull", user:existingUser})
 }