import express from 'express' ; 
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
dotenv.config();

mongoose.connect(process.env.MONGODB_ATLAS_URI)
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err.message);
});



const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT || 'sb');
  });

  app.use('/api/upload', uploadRouter);
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);


const __dirname = path.resolve();

app.use((err , req , res ,next)=>{
    res.status(500).send({message:err.message});
});

app.get('*' , (req,res)=>{
    res.sendFile(path.join(__dirname , '/frontend/build/index.html'))
    });
    

app.use((err , req,res , next)=>{
res.status(500).send({message: err.message});
});



const port = process.env.PORT || 5000 ; 
app.use(express.static(path.join(__dirname , '/frontend/build')));

app.listen(port , ()=>{
    console.log(`app is running in http://localhost:${port}`);
})