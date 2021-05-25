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




export default function Pedido(props) {

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

        <div class="w3-content" >


        <header > 
          <h1><b>Pedido</b></h1>
          
        </header>


        <div class="w3-row">


        <div class="w3-col l8 s12">

          <div class="w3-card-4 w3-margin w3-white">
            
            <div class="w3-container">
              <h3><b>Entrega</b></h3> 
              {order.isDelivered ? (
                  <MessageBox variant="success">
                    Entregue realizada em {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Pendente</MessageBox>
                )}
            </div>

            <div class="w3-container">
            <p>
      <strong>Nome:</strong> {order.shippingAddress.fullName} <br />
       <strong>Endereço: </strong> {order.shippingAddress.address},
        {order.shippingAddress.city}, {order.shippingAddress.postalCode}
        ,{order.shippingAddress.country}
      </p>
      
              <div class="w3-row">
              
              </div>
            </div>
          </div>
          <hr/>

          <div class="w3-card-4 w3-margin w3-white">
            
            <div class="w3-container">
              <h3><b>Pagamento</b></h3>  {order.isPaid ? (
                  <MessageBox variant="success">
                    Pagamento efetuado em {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Pendente</MessageBox>
                )}
            </div>

            <div class="w3-container">
          <p> <b>Forma de Pagamento:</b> {order.paymentMethod}</p>

          
              <div class="w3-row">
              
              </div>
            </div>
          </div>
          <hr/>

          <div class="w3-card-4 w3-margin w3-white">
            
            <div class="w3-container">
              <h3><b>Itens</b></h3>

              <ul class="w3-ul ">

{order.orderItems.map((item) => (

<li class="w3-padding-32"  >


  <Link to={`/produto/${item.product}`} >
  
 
   <img src={item.image} class="w3-left w3-margin-right" style={{'width':'70px','margin-bottom':'50px'}}/>
    
   </Link>

    <span   className='praPc' style={{'width':'70px','margin-bottom':'50px'}}>  {item.name} </span>

    
    
    
      <span   style={{'margin-left':'50px'}} className='praPc' >Quantidade </span>

      <span   style={{'margin-left':'50px'}} className='praPc' >Tamanho</span>

      <span   className='w3-right' >R${item.price},00   </span>

    

      <div className='praMobile'>
      <div>
      <span  style={{'margin-right':'10%'}}  >{item.name} </span>
      </div>

      <div>
      <span  style={{'margin-right':'10%'}}  >Quantidade</span>
      </div>

      <div>
      <span  style={{'margin-right':'10%'}}  >Tamanho</span>
      </div>

      

      </div>
    

          
          </li>

  ))}


         
      </ul> 
            </div>

            <div class="w3-container">
              <p> </p>
              <div class="w3-row">
              
              </div>
            </div>
          </div>
          <hr/>

          


        


        </div>
        <div class="w3-col l4">

          <div class="w3-card w3-margin w3-margin-top">
          
            <div class="w3-container w3-white">
              <h4><b>Pedido</b></h4>
              <p><b>Itens</b> R${order.itemsPrice.toFixed(2)}</p>
              <p><b>Entrega</b> R${order.taxPrice.toFixed(2)}</p>
              <p><b>Total</b>R${order.totalPrice.toFixed(2)}</p>

              {!order.isPaid  && order.paymentMethod ==='Transferência/Pix' && (
              
                  <p><b> Dados da Conta para fazer a Transferência:</b></p>
              
               
              )
              }

            { !order.isPaid  && order.paymentMethod ==='PayPal' && (

                                  
              <>
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

                    
                    options={{
                      locale:"pt_BR",
                      currency:"BRL"
                    }}

                    
                  ></PayPalButton> }

                  
                </>
              )}

              </>
              )


              }

{userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    class="w3-button w3-blue w3-right"
                    onClick={deliverHandler}
                  >
                    Entrega Realizada
                  </button>
                </>
              )}
              {userInfo.isAdmin && !order.isPaid && order.paymentMethod ==='Transferência/Pix' && (
                
                  
                  <button
                    type="button"
                    class="w3-button w3-blue w3-right"
                    onClick={successPaymentHandler}
                   >
                   Pagamento Recebido
                  </button>
               
              )}
                    
                
            </div>
            
          
          </div>
          
          </div>


        </div>


        </div><br/>




    </div>
  );
}
