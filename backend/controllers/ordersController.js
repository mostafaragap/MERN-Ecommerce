import User from "../models/usersModel.js";
import expressAsyncHandler from 'express-async-handler';
import Order from "../models/orderModel.js";
import Product from '../models/productModel.js';
import {  mailgun, payOrderEmailTemplate } from '../utils.js';

const createOrder = expressAsyncHandler(async (req, res) => {
  
      const newOrder = new Order({
        orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
  
      });
      const order = await newOrder.save();
  
      res.status(201).send({ message: 'New Order Created ', order });
  
  
  
    });
  
  

   const getSummary = expressAsyncHandler(async (req, res) => {
      const payedOrders = await Order.aggregate([
        {
          $match  :{isPaid:true}
        },
        {
          $group: {
            _id: null,
            numOrders: { $sum: 1 },
            totalSales: { $sum: '$totalPrice' },
          },
        },
      ]);

      const notPayedOrders = await Order.aggregate([
        {
          $match  :{isPaid:false}
        },
        {
          $group: {
            _id: null,
            numOrders: { $sum: 1 },
            totalSales: { $sum: '$totalPrice' },
          },
        },
      ]);

      const orders = await Order.aggregate([
        {
          $group: {
            _id: null,
            numOrders: { $sum: 1 },
            totalSales: { $sum: '$totalPrice' },
          },
        },
      ]);
      const users = await User.aggregate([
        {
          $group: {
            _id: null,
            numUsers: { $sum: 1 },
          },
        },
      ]);
      const dailyOrders = await Order.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            orders: { $sum: 1 },
            sales: { $sum: '$totalPrice' },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      const productCategories = await Product.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
      ]);
      res.send({ users,payedOrders,notPayedOrders, orders, dailyOrders, productCategories });
    })

 
 const getMineOrders =  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({deliveredAt:1 ,paidAt:-1 , createdAt:1});
    res.send(orders);
  });
  
 const confirmOrder = 
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        if (order.isPaid) {
          const orderItems =order.orderItems ;
          orderItems.forEach((item)=>{
          Product.findOne({_id:item._id} , (err , product) =>{
           if(!err){
            product.countInStock -= item.quantity ;
            product.save();
           }else{
             console.log(err);
           }
          }); });
          order.isDelivered = true;
          order.deliveredAt = Date.now()
          const updatedOrder = await order.save();
          res.send({ message: "Order Confirmed Successfylly", order: updatedOrder });
        } else {
          res.status(500).send({ message: "Oder is Not Paid yet" });
        }
      }
      else {
        res.status(404).send({ message: "Order is Not Found , please try Again" });
      }
    })
  
const getOrder =   
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        res.send(order);
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  
  
  
  
  
  const payOrder = 
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id).populate(
        'user',
        'email name');
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.email_address,
        };
        const updatedOrder = await order.save();
        mailgun()
          .messages()
          .send(
            {
              from: 'Brands <brands@mg.brands-mern.herokuapp.com>',
              to: `${order.user.name} <${order.user.email}>`,
              subject: `New order ${order._id}`,
              html: payOrderEmailTemplate(order),
            },
            (error, body) => {
              if (error) {
                console.log(error);
              } else {
                console.log(body);
              }
            }
          );
        res.send({ message: 'Order Paid', order: updatedOrder });
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  
  
  const PAGE_SIZE = 6;
  const viewOrders = expressAsyncHandler(async (req, res) => {
      const { query } = req;
      const page = query.page || 1;
      const pageSize = query.pageSize || PAGE_SIZE;
      const orders = await Order.find().skip(pageSize * (page - 1))
      .limit(pageSize).sort({deliveredAt:1 ,paidAt:-1 , createdAt:1});
      const countOrders = await Order.countDocuments();
      res.send({orders,countOrders,
        page,
        pages: Math.ceil(countOrders / pageSize),});
   })


  export {createOrder,getSummary,getMineOrders,confirmOrder,getOrder,payOrder,viewOrders}