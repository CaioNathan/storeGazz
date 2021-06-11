import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';


export default function Carrinho(props) {

  const [tamanho,setTamanho] = useState('Único');
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const [qtd,setQtd] = useState(1);
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qtd,tamanho));
    }
  }, [dispatch, productId, qtd,tamanho]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push('/login?redirect=entrega');
  };

  

 

  function addCart (id,qtd,tamanho){
    setQtd(qtd)
    setTamanho(tamanho)
    dispatch(
      addToCart(id, Number(qtd),tamanho)
    )

  }
 
  

  return (
    <div>

    

    <div class="w3-card ">
    <div class="w3-container" >
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

         <span  style={{'margin-right':'15%'}} className='praPc'> Quantidade <select
                      defaultValue={qtd}
                      onChange={(e) => addCart(item.product,e.target.value,tamanho)
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    </span>
          
          
          
              
             
             

            <span  style={{'margin-right':'20%'}} className='praPc' >Tamanho 
            <select   defaultValue={tamanho}
                      onChange={(e) => addCart(item.product,qtd,e.target.value)
                      }>

                       {
                          !item.tamanhosDisponiveis[0].p &&
                          !item.tamanhosDisponiveis[0].m &&
                          !item.tamanhosDisponiveis[0].g &&
                          !item.tamanhosDisponiveis[0].num38 &&
                          !item.tamanhosDisponiveis[0].num39 &&
                          !item.tamanhosDisponiveis[0].num40 &&
                          
                          <option> Tamanho Único </option> 

                      }

                      {item.tamanhosDisponiveis[0].p &&
                        <option value='P' > P </option> 
                      }
                      {item.tamanhosDisponiveis[0].m &&
                        <option value='M'> M </option> 
                      }
                      {item.tamanhosDisponiveis[0].g &&
                        <option value='G'> G </option> 
                      }
                      {item.tamanhosDisponiveis[0].num38 &&
                        <option value='38'> 38 </option> 
                      }
                      {item.tamanhosDisponiveis[0].num39 &&
                        <option value='39'> 39 </option> 
                      }
                      {item.tamanhosDisponiveis[0].num40 &&
                        <option value='40'> 40 </option> 
                      }
                 
                     
                      
            </select>

            </span>

            <span  style={{'margin-right':'10%'}} className='praPc' >R${item.price},00   </span>

            <span  class='w3-right' ><i class="fa fa-trash-o" aria-hidden="true"  onClick={() => removeFromCartHandler(item.product)}></i></span>


            <div className='praMobile'>
            <div>
            <span  style={{'margin-right':'10%'}}  >{item.name} </span>
            </div>

            <span  style={{'margin-right':'10%'}} > Quantidade <select
                       defaultValue={qtd}
                       onChange={(e) => addCart(item.product,e.target.value,tamanho)
                       }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    </span>

            <div>
            <span  style={{'margin-right':'10%'}} >Tamanho 
            <select
            defaultValue={tamanho}
                      onChange={(e) => addCart(item.product,qtd,e.target.value)
                      }>

              {
                  !item.tamanhosDisponiveis[0].p &&
                  !item.tamanhosDisponiveis[0].m &&
                  !item.tamanhosDisponiveis[0].g &&
                  !item.tamanhosDisponiveis[0].num38 &&
                  !item.tamanhosDisponiveis[0].num39 &&
                  !item.tamanhosDisponiveis[0].num40 &&
                  
                  <option> Tamanho Único </option> 

              }

              {item.tamanhosDisponiveis[0].p &&
                <option> P </option> 
              }
              {item.tamanhosDisponiveis[0].m &&
                <option> M </option> 
              }
              {item.tamanhosDisponiveis[0].g &&
                <option> G </option> 
              }
              {item.tamanhosDisponiveis[0].num38 &&
                <option> 38 </option> 
              }
              {item.tamanhosDisponiveis[0].num39 &&
                <option> 39 </option> 
              }
              {item.tamanhosDisponiveis[0].num40 &&
                <option> 40 </option> 
              }



              </select>
            
            </span>
            </div>

            <div>
            <span  style={{'margin-right':'10%'}}  >R${item.price},00  </span>
            </div>

            </div>
          

                
                </li>

        ))}


                <li class="w3-padding-16">
                  <span> Subtotal</span>  
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
