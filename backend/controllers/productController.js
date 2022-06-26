import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const PAGE_SIZE = 6;
const HOME_PAGE_SIZE = 4;

const getAllProducts = expressAsyncHandler(async(req,res)=>{
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || HOME_PAGE_SIZE;
    const products = await Product.find()
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  const countProducts = await Product.countDocuments();
  res.send({
    products,
    countProducts,
    page,
    pages: Math.ceil(countProducts / pageSize),
  });
})

const addProduct = expressAsyncHandler(async(req,res)=>{
    const newProduct = new Product({
        name: 'sample name ' + Date.now(),
        slug: 'sample-name-' + Date.now(),
        image: '/images/p1.jpg',
        price: 0,
        category: 'sample category',
        supCategory: 'sample Sub Category if Exist',
        brand: 'sample brand',
        countInStock: 0,
        rating: 0,
        numberOfReviews: 0,
        description: 'sample description',
      });
      const product = await newProduct.save();
      res.send({ message: 'Product Created', product });
});

const updateProduct = expressAsyncHandler(async(req,res)=>{
    const {name , slug,price,image,category,supCategory,brand,countInStock,description}=req.body;
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = name;
      product.slug = slug;
      product.price = price;
      product.image = image;
      product.category = category;
      product.supCategory = supCategory;
      product.brand = brand;
      product.countInStock = countInStock;
      product.description = description;
      await product.save();
      res.send({ message: 'Product Updated' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
})

const deleteProduct = expressAsyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.send({ message: 'Product Deleted' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
})

const addReview= expressAsyncHandler(async(req,res)=>{
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        numberOfReviews: product.numReviews,
        rating: product.rating,
      });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
});

const searchForProduct=expressAsyncHandler(async(req,res)=>{
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? { $or: [
           { 
             name: 
             {  
               $regex: searchQuery,
               $options: 'i',
             }

            },
             { 
             category: 
             {  
             $regex: searchQuery,
             $options: 'i',
             }
            },
            { 
              brand: 
              {  
              $regex: searchQuery,
              $options: 'i',
              }
             },
             { 
              description: 
              {  
              $regex: searchQuery,
              $options: 'i',
              } ,
              
             },
             { 
              supCategory: 
              {  
              $regex: searchQuery,
              $options: 'i',
              } ,
              
             }
            

           ] } 
        : {};

         { $or: [ { name: {   $regex: searchQuery,
          $options: 'i', } },
           { category: {   $regex: searchQuery,
            $options: 'i',} } , ] } 

    const categoryFilter = category && category !== 'all' ? { category } : {};
    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== 'all'
        ? {
            // 1-50
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};
    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
});

const getCategories=expressAsyncHandler(async(req,res)=>{
    const categories = await Product.find().distinct('category');
    res.send(categories);
})

const getBySlug = expressAsyncHandler(async(req,res)=>{
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
});

const getProduct =expressAsyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
})


export {getAllProducts,addProduct,updateProduct,deleteProduct,addReview,searchForProduct,getCategories,getBySlug,getProduct};