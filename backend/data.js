import bcrypt from 'bcryptjs'
export default  {

    users:[
    {
    name:'mostafa' , 
    email:'admin@gmail.com' ,
    password:bcrypt.hashSync('01006092170'),
    isAdmin:true

    },
    {
        name:'ahmed' , 
        email:'ahmed@gmail.com' ,
        password:bcrypt.hashSync('01006092170'),
        isAdmin:false
   }],
products :[ {
   
 name : 'Nike slim Shirt' , 
 slug:'nike-slim-shirt',
 category: "Shirts",
 countInStock:10 ,
 image :'/images/d1.jpg' , 
 price :60 , 
 brand:'Nike' , 
 rating : 4.5 , 
 numberOfReviews : 10 , 
 description : 'high quality shirt test api'

},
{
   
    name : 'Fit Shirt' , 
    slug:'nike-slim-men',
    category: "Shirts",
    image :'/images/d3.jpg' ,
    countInStock:10 , 
    price :50 , 
    brand:'Nike' , 
    rating : 4.1 , 
    numberOfReviews : 10,
    description : 'high quality shirt'
   
   },
   {

    name : 'Best pants' ,
    slug:'nike-pants-men',
    category: "Pants", 
    countInStock:10 , 
    image :'/images/d2.jpg' , 
    price :80 , 
    brand:'Nike' , 
    rating : 3.4 , 
    numberOfReviews : 10,
    description : 'high quality pans'
   
   },
   {
    
    name : 'Best pants white' ,
    slug:'nike-pants-d4',
    category: "Pants", 
    countInStock:0 , 
    image :'/images/d4.jpg' , 
    price :80 , 
    brand:'Nike' , 
    rating : 3.5 , 
    numberOfReviews : 10,
    description : 'high quality pans test'
   
   },

]

}