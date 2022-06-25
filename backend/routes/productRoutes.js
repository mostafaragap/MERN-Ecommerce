import express from 'express';
import { isAuth, isAdmin } from '../utils.js';
import {getAllProducts , addProduct , updateProduct,deleteProduct,addReview,searchForProduct,getCategories,getBySlug,getProduct} from '../controllers/productController.js';



const productRouter = express.Router();

productRouter.get('/' , getAllProducts);
productRouter.post('/',isAuth,isAdmin, addProduct);
productRouter.route('/:id' , isAuth , isAdmin).put(updateProduct).delete(deleteProduct)
productRouter.post('/:id/reviews',isAuth,addReview);
productRouter.get('/admin' , isAuth,isAdmin, getAllProducts);
productRouter.get('/search',searchForProduct);
productRouter.get('/categories',getCategories)
productRouter.get('/slug/:slug' , getBySlug);
productRouter.get('/:id' , getProduct);


export default productRouter;