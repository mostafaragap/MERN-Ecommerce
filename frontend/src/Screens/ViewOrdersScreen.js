import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useLocation, useNavigate,Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import { Store } from '../Store';
import { getError } from '../components/utils';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Badge from 'react-bootstrap/esm/Badge';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload.orders, loading: false, page: action.payload.page,
        pages: action.payload.pages, };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}; 
export default function OrderHistoryScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;
  const [{ loading, error, orders,pages }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(
          `/api/orders?page=${page}`,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo,page]);
  return (
    <div>
      <Helmet>
        <title>All Orders</title>
      </Helmet>
      <Container  className='pt-3'>
      <h1>All Orders</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div id='tbl-container'>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? <Badge bg="success">{order.paidAt.substring(0, 10)}</Badge>   : <Badge bg="danger">No</Badge>}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
      )}
      <div>
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === Number(page) ? 'btn text-bold' : 'btn'}
                key={x + 1}
                to={`/admin/orders?page=${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
      </Container>
    </div>
  );
}