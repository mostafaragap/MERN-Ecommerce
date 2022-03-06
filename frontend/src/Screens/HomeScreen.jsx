import React from "react";
import { Link } from "react-router-dom";
import data from "../data";
function HomeScreen(props)
{

    return  <ul className="products">
    {
      data.products.map(product =>
        <li>
            <div className="product"  key={product.slug}>
            <Link to={'/products/'+product.slug}>  <img className="product-image" src={ product.image} alt={ product.name} /></Link>
            
            <div className="product-name"><Link to={'/products/'+product.slug}> { product.name}</Link>  </div>
             <div className="product-brand">{ product.brand}   </div>
             <div className="product-price">${ product.price}</div>
             <div className="product-rating">{ product.rating} Stars ({ product.numberOfReviews} Reviews)</div>
             <button>Add to cart</button>
           
            </div>

        </li>
      )
    }
        

    </ul>
}

export default HomeScreen;