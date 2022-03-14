import React from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row'

export default function CounterComponent()
{

    var countDownDate = new Date("Mar 28, 2022 23:18:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);
    return (
        <Container>
        <div className="counter">
        <Row>
        <div className="pt-3">
          <h1 className="text-center text-capitalize"> <strong>Mega sale Will start Soon</strong> </h1>

        </div>
        </Row>
       <Row>
           <div className="text-center justify-content-center rounded-pill mt-5 mb-5" id="countdown">

        </div>
       </Row>
       <Row>
       <Col md={12}>
            <div className="mt-1 pb-5 text-center">
         <Button variant="danger"
         type="button"
         >Register Now</Button>
            

          </div>
       </Col>

       </Row>
      
        
      </div>
      </Container>
    );
}