import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';



export default function Entrega(props) {

  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);
  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  if (!userInfo) {
    props.history.push('/signin');
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    
    let moveOn = true;
    
    if (moveOn) {
      dispatch(
        saveShippingAddress({
          fullName,
          address,
          city,
          postalCode,
          country,
          
        })
      );
      props.history.push('/pagamento');
    }
  };
  

  return (
    <div>
       <CheckoutSteps step1 step2></CheckoutSteps>

<div class="w3-container" id="contact" >
    <h1 class="w3-center w3-text-blue"><b>Entrega</b></h1>
    <hr  class="w3-round"/>
   
    <form onSubmit={submitHandler} >
      <div class="w3-section">
      <label htmlFor="fullName">Nome Completo</label>
          <input
          class="w3-input w3-border"
            type="text"
            id="fullName"
            placeholder="Nome"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
      </div>
      <div class="w3-section">
        <label>Endereço</label>
        <input class="w3-input w3-border" type="text"
            id="address"
            placeholder="Endereço"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required/>
      </div>

      <div class="w3-section">
        <label>Cidade</label>
        <input class="w3-input w3-border" type="text"
            id="city"
            placeholder="Cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required />
      </div>

      <div class="w3-section">
        <label>CEP</label>
        <input class="w3-input w3-border" ttype="text"
            id="postalCode"
            placeholder="CEP"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required/>
      </div>

      <div class="w3-section">
        <label>Estado</label>
        <input class="w3-input w3-border" ttype="text"
            id="estado"
            placeholder="Estado"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required/>
      </div>

     

     
      
      <h3 className='w3-center'> 
      <Link to='/carrinho'>
      <button class="w3-button" >  Voltar </button>
      </Link>
            
             <button class="w3-button w3-green ">   Prosseguir </button>
             
             </h3>
    </form>  
  </div>



    </div>
  );
}
