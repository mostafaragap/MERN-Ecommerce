import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  
  MDBIcon
} from 'mdb-react-ui-kit';

const style ={ backgroundColor: 'rgba(0, 0, 0, 0.2)'}

export default function Footer() {
  return (
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#f1f1f1' }}>
      <MDBContainer className='pt-4'>
        <section className='mb-4'>
          <a
            className='btn btn-link btn-floating btn-lg text-dark m-1'
            href='#!'
            role='button'
            data-mdb-ripple-color='dark'
          >
            <MDBIcon fab className='fab fa-facebook-f' />
          </a>

          <a
            className='btn btn-link btn-floating btn-lg text-dark m-1'
            href='#!'
            role='button'
            data-mdb-ripple-color='dark'
          >
            <MDBIcon fab className='fa-twitter' />
          </a>

          <a
            className='btn btn-link btn-floating btn-lg text-dark m-1'
            href='#!'
            role='button'
            data-mdb-ripple-color='dark'
          >
            <MDBIcon fab className='fa-google' />
          </a>

          <a
            className='btn btn-link btn-floating btn-lg text-dark m-1'
            href='#!'
            role='button'
            data-mdb-ripple-color='dark'
          >
            <MDBIcon fab className='fa-instagram' />
          </a>

         
     
        </section>
      </MDBContainer>

      <div className='text-center text-light p-3 bg-dark' style={style}>
        © 2022 Copyright:
     
         Ecommerce
       
      </div>
    </MDBFooter>
  );
}