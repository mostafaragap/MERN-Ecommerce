import React, { useEffect, useReducer } from "react";
import data from "../data";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Card from 'react-bootstrap/Card'
import Rating from "../components/Rating";
import Button from "react-bootstrap/esm/Button";
import {Helmet} from 'react-helmet-async';


const reducer = (state , action) =>{
    switch(action.type){
      case 'FETCH_REQUEST' :
         return{...state , loading: true};
      case 'FETCH_SUCCESS' :
         return{...state ,product:action.payload , loading:false };
      case 'FETCH_FAIL' : 
         return {...state , loading: false , error: action.payload};
  
        default: 
        return state;
    }
  }

function ProductScreen(props)
{
    const { slug } = useParams();
    const [{ loading, error, product }, dispatch] = useReducer(reducer, {
        product: [],
        loading: true,
        error: '',
      });
     
      useEffect(() => {
        const fetchData = async () => {
          dispatch({ type: 'FETCH_REQUEST' });
          try {
            const result = await axios.get(`/api/products/slug/${slug}`);
            dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: err.message });
          }
        
        };
        fetchData();
      }, [slug]);

    
    //const productt = data.products.find(x => x.slug ===slug );
    return (
        loading? <div>Loading...</div>
        :error?<div>{error}</div>
        :
        <div>
           <Row>
             <Col md={6}>
                 <img 
                  className="img-large"
                  src={product.image}
                  alt={product.name}

                 />
             </Col>
             <Col md={3}>
                 <ListGroup variant="flush">
              <ListGroup.Item>
              <Helmet>
             <title>{product.name}</title> 
              </Helmet>
              <h1>{product.name}</h1>
              
              </ListGroup.Item>
              <ListGroup.Item>
                  <Rating 
                  rating={product.rating}
                  numReviews={product.numberOfReviews}>

                  </Rating>
              </ListGroup.Item>
              <ListGroup.Item>
                Price: ${product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
                 </ListGroup>
             </Col>
             <Col md={3}>
             <Card>
                 <Card.Body>
                 <ListGroup variant="flush">
                 <ListGroup.Item>
                 <Row>
                 <Col>Price: </Col>
                 <Col> ${product.price}</Col>
                
                 </Row>
                 
              </ListGroup.Item>
              <ListGroup.Item>
                 <Row>
                 <Col>Statues: </Col>
                 <Col> {product.countInStock > 0 ? 
                 <Badge bg="success">Available</Badge>
                 :  <Badge bg="danger">Unavailable</Badge>
                 }</Col>
                
                 </Row>
                 
              </ListGroup.Item>
              {product.countInStock > 0 &&
              <ListGroup.Item>
                <div className="d-grid">
                <Button variant="warning">
                    Add To cart
                </Button>

                </div>

              </ListGroup.Item>
              }
                 </ListGroup>
                 </Card.Body>
             </Card>

             </Col>

           </Row>
        </div>

    );
}

export default ProductScreen;


