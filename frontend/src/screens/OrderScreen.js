import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}&currency=BRL&locale=pt_BR`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };
  

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Pedido {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Entrega</h2>
                <p>
                  <strong>Nome:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Endereço: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Entregue realizada em {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Pendente</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Pagamento</h2>
                <p>
                  <strong>Forma de Pagamento:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Pagamento efetuado em {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Pendente</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Itens no pedido</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x R${item.price} = R${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Pedido</h2>
              </li>
              <li>
                <div className="row">
                  <div>Itens</div>
                  <div>R${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
             
              <li>
                <div className="row">
                  <div>Frete</div>
                  <div>R${order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Total</strong>
                  </div>
                  <div>
                    <strong>R${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
             
              {!order.isPaid  && order.paymentMethod ==='Transferência/Pix' && (
                <li>
                  <p> Dados da Conta para fazer a Transferência</p>
              
                </li>
              )
              }

              { !order.isPaid  && order.paymentMethod ==='PayPal' && (

                                  
                  <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) :  (
                    <>

                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}

                      { <PayPalButton
                        
                        amount={order.totalPrice}
                                                
                        onSuccess={successPaymentHandler}

                        style  =  { { color :'white'} } 
                        options={{
                          locale:"pt_BR",
                          currency:"BRL"
                        }}

                        
                      ></PayPalButton> }

                      
                    </>
                  )}

                  </li>
                  )


               }
                        
            
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Entrega Realizada
                  </button>
                </li>
              )}
              {userInfo.isAdmin && !order.isPaid && order.paymentMethod ==='Transferência/Pix' && (
                <li>
                  
                  <button
                    type="button"
                    className="primary block"
                    onClick={successPaymentHandler}
                   >
                   Pagamento Recebido
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
