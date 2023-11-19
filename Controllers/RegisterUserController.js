import UserModel from "../Models/RegisterUserModel.js";
import bcrypt from "bcrypt"
import  jwt  from "jsonwebtoken";


// Registering a new User
export const registerUser = async (req, res) => {

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPass
    const newUser = new UserModel(req.body);
    const {username} = req.body
    try {
        const oldUser = await UserModel.findOne({username})
        if(oldUser){
            return res.status(400).json({message:'Username already exists'})
        }
        const user = await newUser.save();
        const token = jwt.sign({
            username: user.username, id:user._id
        },process.env.JWT_KEY, {expiresIn:'1h'})
        res.status(200).json({user, token});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};