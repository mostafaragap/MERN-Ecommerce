import  express  from "express";
import { isAdmin, isAuth } from "../utils.js";
import {getAllUsers,register, getUser,updateUser,deleteUser,login , updateByAdmin} from '../controllers/userController.js'

const userRouter= express.Router();
userRouter.get('/' , isAuth,isAdmin, getAllUsers);
userRouter.route('/:id',isAuth,isAdmin).get(getUser).put(updateByAdmin).delete(deleteUser)
userRouter.put('/profile' , isAuth , updateUser);
userRouter.post('/signin' , login);
userRouter.post('/signup' , register);

export default userRouter ;