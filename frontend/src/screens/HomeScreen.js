import React, { useEffect, useState }  from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Axios from 'axios';
import Product from '../components/Product';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductCategories } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';




export default function HomeScreen(props) {

  const [display,setDisplay]= useState('none');
 

function w3_open() {
  setDisplay('block')
  
}
 
function w3_close() {
  setDisplay('none')
  
}



  const cart = useSelector((state) => state.cart);

const { cartItems } = cart;
const userSignin = useSelector((state) => state.userSignin);
const { userInfo } = userSignin;
const dispatch = useDispatch();

function logout(){
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  document.location.href = '/'
}



const productCategoryList = useSelector((state) => state.productCategoryList);
const {
  loading: loadingCategories,
  error: errorCategories,
  categories,
} = productCategoryList;
useEffect(() => {
  dispatch(listProductCategories());
}, [dispatch]);

  const [products,setProducts] = useState([]);

  useEffect(()=>{
     
   let isSubscribed = true
 
   Axios.get('api/products/news').then(response =>{
 
       if (isSubscribed) {
           setProducts(response.data);
         }
       
   })
   return () => isSubscribed = false
 
 },[products]);
 

  return (
    <div>

<nav class="w3-sidebar w3-bar-block w3-white w3-collapse w3-top" style={{"z-index":"3","width":"250px",'display':`${display}`}} id="mySidebar">
  <div class="w3-container w3-display-container w3-padding-16">
    <i onClick={w3_close} class="fa fa-remove w3-hide-large w3-button w3-display-topright"></i>
    <img src={require("../assets/gazc.png")} className='logo' />
    
  </div>
  <div class="w3-padding-64 w3-large w3-text-grey" style={{"font-weight":"bold"}}>




  {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              
              categories.map((c) => (
                
                  <Link
                    to={`/search/category/${c}`}
                    class="w3-bar-item w3-button"
                    
                  >
                    {c}
                  </Link>
               
              ))
            )}
  
  </div>

  {
          userInfo ? (
            <div className="dropdown">

            <Link to='#' class="w3-bar-item w3-button w3-padding"> 
              {userInfo.name} <i className="fa fa-user-o"> </i> {''} 
              </Link>
              
                  

                        {userInfo && userInfo.isAdmin &&  (
                <div className="dropdown">
                
                
                  <Link class="w3-bar-item w3-button w3-padding" to="/dash"> Admin   </Link> 
                  
                
                

                </div>


              )}

               
                  <Link class="w3-bar-item w3-button w3-padding" to="/orderhistory"> Meus pedidos </Link>
                

              
                <Link class="w3-bar-item w3-button w3-padding"  onClick={logout}>Sair </Link>
                

            



            </div>
          ) :
          (
            <Link to='login' class="w3-bar-item w3-button w3-padding">Entrar</Link>
          )
        }

        
   
 <p>
  <i class="fa fa fa-whatsapp w3-hover-opacity w3-xlarge w3-margin-left"></i>
        <i class="fa fa-instagram w3-hover-opacity w3-xlarge w3-margin-left"></i> 
        <i class="fa fa fa-envelope-o w3-hover-opacity w3-xlarge w3-margin-left"></i>
        <i class="fa fa fa-lock w3-hover-opacity w3-xlarge w3-margin-left"></i>
       
  </p>
  
  

  <p class='w3-margin-left'> gazz@gazzstore.com.br </p>
 
</nav>

<header class="w3-bar w3-top w3-hide-large  w3-xlarge">
  <div class="w3-bar-item  w3-wide">
  <img src={require("../assets/gazc.png")} className='logo' /> 
  </div>
  <a class="w3-bar-item  w3-padding-24 w3-right" onClick={w3_open}><i class="fa fa-bars"></i></a>
</header>


<div class="w3-overlay w3-hide-large" onClick={w3_close} style={{"cursor":"pointer"}} title="close side menu" id="myOverlay"></div>


<div class="w3-main" style={{"margin-left":"250px"}}>


  <div class="w3-hide-large" style={{"margin-top":"83px"}}></div>
  
 
  <header class="w3-container w3-xlarge">
  <p class="w3-right header">
    
     

      <input className='search'hidden='true'></input><i class="fa fa-search w3-margin-right" ></i>

      <Link to='/carrinho'>
      <i class="fa fa-shopping-cart w3-margin-right"> {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )} </i>
      </Link>


      <i class="fa fa-user-o w3-margin-right"></i>
      
      
      </p>
  </header>


  <div class="w3-display-container w3-container">
  <h2>Destaque </h2>
    <img src={require("../assets/news.png")} className='img'/> 
    <div class="w3-display-topleft w3-text-white">
      <h1 class="w3-jumbo w3-hide-small" style={{'margin-top':"24px"}}>Nike Air Max 2090</h1>
      <h1 class="w3-hide-large w3-hide-medium" style={{'margin-top':"30px"}}>Nike Air Max 2090</h1>
      <h1 class="w3-hide-small">R$419,99</h1>
      <p><a href="#jeans" class="w3-button w3-black w3-padding-large w3-large">Comprar</a></p>
    </div>
  </div>

  <div class="w3-container w3-xlarge" id="jeans">
     <p class="w3-left"> Ultimos Lançamentos </p>  
  </div>


  <div class="w3-row w3">
   
  <>
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
            </>
   

  </div>

</div>




    </div>
  );
}
