import express from "express";
import User from "../models/usersModel.js";


import expressAsyncHandler from 'express-async-handler';
import Order from "../models/orderModel.js";

import Product from '../models/productModel.js';
import { isAuth, isAdmin, mailgun, payOrderEmailTemplate } from '../utils.js';
import { createOrder,getSummary,getMineOrders,confirmOrder,getOrder,payOrder,viewOrders } from "../controllers/ordersController.js";
const orderRouter = express.Router();


orderRouter.post('/', isAuth,createOrder);
orderRouter.get('/summary', isAuth,isAdmin,getSummary);
orderRouter.get('/mine', isAuth,getMineOrders);
orderRouter.put('/:id' , isAuth,isAdmin,confirmOrder)
orderRouter.get('/:id' , isAuth ,getOrder )
orderRouter.put('/:id/pay' , isAuth ,payOrder )
orderRouter.get('/' , isAuth,isAdmin,viewOrders);





export default orderRouter;