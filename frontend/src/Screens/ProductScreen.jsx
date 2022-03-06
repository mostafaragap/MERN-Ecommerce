import React from "react";
import data from "../data";
import { Link, useParams } from 'react-router-dom';

function ProductScreen(props)
{
    const { slug } = useParams();
    const product = data.products.find(x => x.slug ===slug );
    return <div>
    <div className="back-to-result">     
    <Link to="/"> Back To result</Link>
    </div>
    <div className="details">

<div className="details-image">
<img src={product.image} alt="product" />
</div>
<div className="details-info">
<ul>
    <li> <h4>{product.name}</h4></li>
    <li> {product.rating} Stars ( {product.numberOfReviews}Reviews)</li>
    <li> Price: <b> ${product.price}</b> </li>
    <li> Description :   
       {  product.description} </li>
</ul>
</div>

<div className="details-action">
<ul>    <li>Price : {product.price}</li>
        <li>Statues : {product.statues}</li>
        <li>Qty :<select> 
           <option>1</option>
           <option>2</option>
           <option>3</option>
           <option>4</option>
           <option>5</option>
        </select></li>
        <li> <button className="add-to-cart">Add to Cart</button></li>

</ul>

</div>

    </div>
 
    
    </div>
}

export default ProductScreen;


