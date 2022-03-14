import React from "react";
import Carousel from 'react-bootstrap/Carousel';


export default function Header()
{

  
    return (
        <div   id="carousel-items">
 <Carousel fade>
 
  <Carousel.Item>
    <img 
      className="d-block w-100"
      src="/images/shop1.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>New Collection Arrivied <i className="fas fa-credit-card"></i></h3>
      <p>In our website you will found anything you need , you can pay online using your credit , paypal and Stripe .</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/images/shop2.jpg"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>EMI Available in <i className="fas fa-credit-card"></i></h3>
      <p>50% off in some popular brand products.</p>
    </Carousel.Caption>
  </Carousel.Item>

  
    
  
</Carousel>
        </div>
       
    )
}