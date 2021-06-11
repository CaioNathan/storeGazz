import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';


export default function Pagamento(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/finalizar');
  };
 

  return (
    <div>
       <CheckoutSteps step1 step2 step3></CheckoutSteps>

<div class="w3-container" id="contact" >
<h1 class='w3-center'> 
          <Link to='/' style={{'text-decoration':"none"}}> <img src={require("../assets/gazc.png")} className='logo' />  </Link>
            <b>Pagamento</b></h1>
    <hr  class="w3-round"/>
   
    <form onSubmit={submitHandler}>
      <div class="w3-section">
        <label> Paypal </label>
        <input class="w3-input w3-border"  type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
             
              onChange={(e) => setPaymentMethod(e.target.value)}/>
      </div>
      <div class="w3-section">
        <label>Transferencia </label>
        <input class="w3-input w3-border" type="radio"
              id="tranfer"
              value="Transferência/Pix"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}/>
      </div>
      
      <h3 className='w3-center'> 
          <Link to='/entrega'>
          <button class="w3-button ">  Voltar </button>
          </Link>
           
             <button class="w3-button w3-green" type="submit">   Prosseguir </button>
             
             </h3>
    </form>  
  </div>



    </div>
  );
}
