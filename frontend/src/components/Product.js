
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item )=>{
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const {data} = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...item, quantity  },
      });
}
function ratingNumbre()
{
  let numbers = 0 ;
  let i = 0;
  product.reviews.forEach(element => {
    numbers+=element.rating;
    i++;
  });
 let c = numbers / i
 
  return c ;
}

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}{' '}  </Card.Title>
        </Link><small>{product.supCategory}</small>
        <Rating rating={ratingNumbre()} numReviews={product.reviews.length} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 
        ? <Button onClick={()=> addToCartHandler(product)} disabled={true} variant="secondary">Out OF Stock</Button> 
         
        : <Button onClick={()=> addToCartHandler(product)} variant="warning">Add to cart</Button>
         }
      
      </Card.Body>
    </Card>
  );
}
export default Product;