import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Axios from 'axios';

export default function PlaceOrderScreen(props) {
  const [cep,setCep] = useState('');
  const [entrega,setEntrega] = useState('0');
  const valorFrete = parseFloat(entrega.replace(",", "."));
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }


  const [cfrete, setCfrete] = useState(false)

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(valorFrete);
  cart.taxPrice = toPrice(valorFrete);
  cart.totalPrice = cart.itemsPrice  + cart.shippingPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    if(!cfrete){
      alert('Calcule o valor do frete')
    
    }
    else{
      dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
   }
      
    
  };

 

  async function calcularFrete(cep) {
    const frete = await Axios.get(`/api/users/correios/${cep}`);

    if(frete.data.Valor !== '0,00'){
      setEntrega(frete.data.Valor)
      alert(`Taxa de entrega:${frete.data.Valor}`);
      setCfrete(true);
    }else{
      alert(frete.data.MsgErro)
    }
     
  }
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Entrega:</h2>
                <p>
                  <strong>Nome:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Endereço: </strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  ,{cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Pagamento</h2>
                <p>
                  <strong>Forma de Pagamento:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Itens</h2>
                <ul>
                  {cart.cartItems.map((item) => (
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
                  <div>R${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>  Calcular Entrega </div>
                  <div>
                    <input 
                    type="text"
                    id="cep"
                    placeholder="CEP"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}></input>
                    <button
                    onClick={()=>calcularFrete(cep)}
                    ><i class="fa fa-truck" aria-hidden="true"></i></button>
                   
                  </div>
                  
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Frete</div>
                  <div>R${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Total</strong>
                  </div>
                  <div>
                    <strong>R${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                >
                  Finalizar Pedido
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
