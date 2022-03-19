import React, { useEffect,useReducer,useState } from "react";

//import data from "../data";
import axios from 'axios'  ;
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import {Helmet} from "react-helmet-async"
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Header from "../components/Header";
import Container from "react-bootstrap/esm/Container";
import CounterComponent from "../components/counterComponent";
import { useLocation,Link } from "react-router-dom";



const reducer = (state , action) =>{
  switch(action.type){
    case 'FETCH_REQUEST' :
       return{...state , loading: true};
    case 'FETCH_SUCCESS' :
       return{...state ,  products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages, loading:false };
    case 'FETCH_FAIL' : 
       return {...state , loading: false , error: action.payload};

      default: 
      return state;
  }
}


function HomeScreen() {
  const [{ loading, error, pages,products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
const style = {backgroundColor:'green' , color:'white' , margin:'.5rem'};
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;
 
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products?page=${page}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    
    };
    fetchData();
  }, [page]);

  return (
    <div>
   
    
     <Helmet>
             <title>Brands</title> 
              </Helmet>
              <Header />
              <Container className="pt-3">
      <h1>Featured Products</h1>
      
      <div className="products">
        {loading ? (
          <LoadingBox />
          ) : error ? (
         <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
      <div className="text-center p-3">
            {[...Array(pages).keys()].map((x) => (
              <Link
              style={style}
                className={x + 1 === Number(page) ? 'btn text-bold' : 'btn'}
                key={x + 1}
                to={`/?page=${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
      <CounterComponent />
      </Container>
    </div>
  );
}

export default HomeScreen;