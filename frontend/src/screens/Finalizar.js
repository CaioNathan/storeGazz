import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Axios from 'axios';


export default function Finalizar(props) {

  const [cep,setCep] = useState('');
  const [entrega,setEntrega] = useState('0');
  const valorFrete = parseFloat(entrega.replace(",", "."));
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push('/pagamento');
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
      props.history.push(`/pedido/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

 
 

  return (
    <div>

<CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

<div class="w3-content" >


<header class="w3-container w3-center w3-padding-32"> 
<h1 class='w3-center'> 
          <Link to='/' style={{'text-decoration':"none"}}> <img src={require("../assets/gazc.png")} className='logo' />  </Link>
            <b>Finalizar Pedido</b></h1>
  
</header>


<div class="w3-row">


<div class="w3-col l8 s12">

  <div class="w3-card-4 w3-margin w3-white">
    
    <div class="w3-container">
      <h3><b>Entrega</b></h3> 
    </div>

    <div class="w3-container">
    <p>
      <strong>Nome:</strong> {cart.shippingAddress.fullName} <br />
       <strong>Endereço: </strong> {cart.shippingAddress.address},
        {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
        ,{cart.shippingAddress.country}
      </p>
      <div class="w3-row">
       
      </div>
    </div>
  </div>
  <hr/>

  <div class="w3-card-4 w3-margin w3-white">
    
    <div class="w3-container">
      <h3><b>Pagamento</b></h3> 
    </div>

    <div class="w3-container">
    <strong>Forma de Pagamento:</strong> {cart.paymentMethod}
      <div class="w3-row">
       
      </div>
    </div>
  </div>
  <hr/>

  <div class="w3-card-4 w3-margin w3-white">
    
    <div class="w3-container">
      <h3><b>Itens</b></h3> 
    </div>

    <div class="w3-container">
    <ul class="w3-ul ">

{cart.cartItems.map((item) => (

<li class="w3-padding-32"  >


  <Link to={`/produto/${item.product}`} >
  
 
   <img src={item.image} class="w3-left w3-margin-right" style={{'width':'70px','margin-bottom':'50px'}}/>
    
   </Link>

    <span   className='praPc' style={{'width':'70px','margin-bottom':'50px'}}>  {item.name} </span>

    
    
    
      <span   style={{'margin-left':'50px'}} className='praPc' > Qtd - {item.qty}  </span>

      <span   style={{'margin-left':'50px'}} className='praPc' >Tamanho - {item.tamanho} </span>

      <span   className='w3-right' > {item.qty}x R${item.price} = R${item.qty * item.price}   </span>

    

      <div className='praMobile'>
      <div>
      <span  style={{'margin-right':'10%'}}  >{item.name} </span>
      </div>

      <div>
      <span  style={{'margin-right':'10%'}}  > {item.qty} x R${item.price} = R${item.qty * item.price}</span>
      </div>

      <div>
      <span  style={{'margin-right':'10%'}}  >Tamanho - {item.tamanho} </span>
      </div>

      

      </div>
    

          
          </li>

  ))}


         
      </ul>
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
      <p><b>Itens</b> R${cart.itemsPrice.toFixed(2)}</p>
      {cart.shippingAddress.country !== 'DF' &&

        <>
        
         <p><b>Calcular Entrega</b></p>
         <input 
            type="text"
            id="cep"
            placeholder="CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}></input>
            <button
            onClick={()=>calcularFrete(cep)}
            ><i class="fa fa-truck" aria-hidden="true"></i></button>
          </>
          
      }

      {cart.shippingAddress.country === 'DF' &&

      <>

      <p><b>Calcular Entrega</b></p>
      <input 
          type="text"
          id="cep"
          placeholder="CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}></input>
          <button
          onClick={()=>setCfrete(true)}
          ><i class="fa fa-truck" aria-hidden="true"></i></button>
        </>
        
      }

     
     {cart.shippingAddress.country !== 'DF'  &&
      <p><b>Entrega</b> R${cart.taxPrice.toFixed(2)}</p>
    }

    {cart.shippingAddress.country === 'DF'  && cfrete &&
      <p><b>Entrega</b>:  Grátis para DF </p>
    }
      

      <p><b>Total</b> R${cart.totalPrice.toFixed(2)}</p>
      <button class="w3-button w3-green w3-right"  onClick={placeOrderHandler}>  Finalizar </button>   
    </div>
    
  </div>
  <Link to='/'>
          <button class="w3-button w3-margin-left">  Voltar para o Inicio </button>
          </Link>
  </div>


</div>


</div><br/>




    </div>
  );
}
