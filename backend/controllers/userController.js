import expressAsyncHandler from 'express-async-handler';
import User from "../models/usersModel.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils.js";

const getAllUsers =   expressAsyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password");
    res.send(users);
  });


const getUser = expressAsyncHandler(async (req, res) => {
    const {id} = req.params ; 
    const user = await User.findById(id).select("-password");
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  });

  const updateUser = expressAsyncHandler(async(req,res) =>{
      const {name , email ,oldPassword, password} = req.body;
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      if(bcrypt.compareSync(oldPassword , user.password )){
          if (password) {
              user.password = bcrypt.hashSync(password, 8);
              const updatedUser = await user.save();
              res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser),
              }); 
            }else{
              updatedUser.password= user.password ;
              res.send({
                  _id: updatedUser._id,
                  name: updatedUser.name,
                  email: updatedUser.email,
                  isAdmin: updatedUser.isAdmin,
                  token: generateToken(updatedUser),
                }); } }
            else{
              res.status(404).send({ message: 'Old Password is incorrect !' });
            }
    } else {
      res.status(404).send({ message: 'User not found' });
    }});

    const updateByAdmin = expressAsyncHandler(async(req,res)=>{
        const {id} = req.params;
        const {name , email , isAdmin} = req.body;
        const user = await User.findById(id);
        if (user) {
          user.name = name || user.name;
          user.email = email || user.email;
          user.isAdmin = Boolean(isAdmin);
          const updatedUser = await user.save();
          res.send({ message: 'User Updated', user: updatedUser });
        } else {
          res.status(404).send({ message: 'User Not Found' });
        }
    });

    const deleteUser = expressAsyncHandler(async(req,res)=>{
        const user = await User.findById(req.params.id);
        if (user) {
          if (user.email === 'admin@gmail.com') {
            return res.status(400).send({ message: 'Can Not Delete Admin User' });
          }
          await user.remove();
          res.status(200).send({ message: 'User Deleted' });
        } else {
          res.status(404).send({ message: 'User Not Found' });
        }
    });

    const login = expressAsyncHandler(async(req,res)=>{
        const {email , password} = req.body ; 
        if(!email || !password)
          return res.status(400).send({message:"please provide an email and password"})
          const user = await User.findOne({email:email});
          if(user)
          {
              if(bcrypt.compareSync(password , user.password)){
              res.send({
                  _id:user._id , 
                  name:user.name , 
                  email:user.email ,
                  isAdmin:user.isAdmin,
                  token:generateToken(user),
              });
              return;
              }
          }
          res.status(401).send({message:'Invalid email or password'});
    })
const register = expressAsyncHandler(async(req,res)=>{
    const {name , email , password} =req.body;
    const newUser = new User ({
        name, 
        email , 
        password:bcrypt.hashSync(password),
    })
    const user = await newUser.save();
    res.send({
        id_:user._id , 
        name :user.name , 
        email :user.email , 
        isAdmin : user.isAdmin , 
        token : generateToken(user),
            });
})

  export  {login , register,getUser , getAllUsers ,updateUser ,updateByAdmin , deleteUser} ;

