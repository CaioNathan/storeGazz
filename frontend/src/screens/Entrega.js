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
  const [country, setCountry] = useState('DF');
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
<h1 class='w3-center'> 
          <Link to='/' style={{'text-decoration':"none"}}> <img src={require("../assets/gazc.png")} className='logo' />  </Link>
            <b>Entrega</b></h1>
          
       
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
        <label>Endere??o</label>
        <input class="w3-input w3-border" type="text"
            id="address"
            placeholder="Endere??o"
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
       

          <select class="w3-input w3-border"
           defaultValue={'DF'}
           value={country}
           onChange={(e) => setCountry(e.target.value)}
           required
           >

         
          <option value="AC"  > AC </option>
          <option value="AL"  > AL </option>
          <option value="AP"  > AP </option>
          <option value="AM"  > AM </option>
          <option value="BA"  > BA </option>
          <option value="CE"  > CE </option>
          <option value="DF" selected > DF </option>
          <option value="ES"  > ES </option>
          <option value="GO"  > GO </option>
          <option value="MA"  > MA </option>
          <option value="MT"  > MT </option>
          <option value="MS"  > MS </option>
          <option value="MG"  > MG </option>
          <option value="PA"  > PA </option>
          <option value="PB"  > PB </option>
          <option value="PR"  > PR </option>
          <option value="PE"  > PE </option>
          <option value="PI"  > PI </option>
          <option value="RJ"  > RJ </option>
          <option value="RN"  > RN </option>
          <option value="RS"  > RS </option>
          <option value="RO"  > RO </option>
          <option value="RR"  > RR </option>
          <option value="SE"  > SE </option>
          <option value="TO"  > TO </option>
          


          </select>
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
