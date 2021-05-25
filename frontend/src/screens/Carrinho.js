import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';


export default function Carrinho(props) {

  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push('/login?redirect=entrega');
  };

 

  return (
    <div>

    

    <div class="w3-card ">
    <div class="w3-container " >
      <h4>Itens</h4>
    </div>
    {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox>
            O carrinho está vazio. <Link to="/">Voltar a loja</Link>
          </MessageBox>
        ) : (
    <ul class="w3-ul w3-hoverable w3-white">

      {cartItems.map((item) => (
     
      <li class="w3-padding-64"  >
       
         <img src={item.image} class="w3-left w3-margin-right" style={{'width':'100px'}}/>
          
      
          <span  style={{'margin-right':'10%'}} className='praPc'>  {item.name} </span>
          
          
            <span  style={{'margin-right':'15%'}} className='praPc' >Quantidade </span>

            <span  style={{'margin-right':'20%'}} className='praPc' >Tamanho</span>

            <span  style={{'margin-right':'10%'}} className='praPc' >R${item.price},00   </span>

            <span  class='w3-right' ><i class="fa fa-trash-o" aria-hidden="true"  onClick={() => removeFromCartHandler(item.product)}></i></span>


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

            <div>
            <span  style={{'margin-right':'10%'}}  >R${item.price},00  </span>
            </div>

            </div>
          

                
                </li>

        ))}


                <li class="w3-padding-16">
                  <span> Subtoal</span>  
                  <span className='w3-right'>  ({cartItems.reduce((a, c) => a + c.qty, 0)} itens) : R$
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</span>
                </li>
            </ul>
            )}


            </div>

            <h3 className='w3-center'> 
            <Link to='/'>
            <button class="w3-button ">  Voltar </button>
            </Link>
            
             <button class="w3-button w3-green"   onClick={checkoutHandler} disabled={cartItems.length === 0}>   Prosseguir </button>
             
             </h3>
    </div>
  );
}
