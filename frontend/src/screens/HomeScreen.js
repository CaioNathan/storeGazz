import React, { useEffect, useState }  from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Axios from 'axios';
import Product from '../components/Product';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductCategories } from '../actions/productActions';




export default function HomeScreen(props) {

  const [display,setDisplay]= useState('');

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
const signoutHandler = () => {
  dispatch(signoutHandler());
};



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


<nav class="w3-sidebar w3-bar-block w3-white w3-collapse w3-top" id="mySidebar" style={{'display':`${display}`}}>
  <div class="w3-container w3-display-container w3-padding-16">
  
    <img src={require("../assets/gazc.png")} className='logo' /> 
    
  </div>
  <div class="w3-padding-64 w3-large w3-text-grey" >
    <i onClick={w3_close} class="fa fa-remove w3-right" style={{'display':`${display}`}}> </i>
  
    <a href="/search/category/Camisetas/name/all/min/0/max/0/rating/0/order/newest/pageNumber/1" class="w3-bar-item w3-button">Camisetas </a>
    <a href="/search/category/Bermudas/name/all/min/0/max/0/rating/0/order/newest/pageNumber/1" class="w3-bar-item w3-button">Bermudas</a>
   
    
    <a href="/search/category/Bonés/name/all/min/0/max/0/rating/0/order/newest/pageNumber/1'" class="w3-bar-item w3-button">Bonés</a>
    <a href="#" class="w3-bar-item w3-button">Casacos</a>
    <a href="#" class="w3-bar-item w3-button">Calças</a>
    <a href="/search/category/Tênis/name/all/min/0/max/0/rating/0/order/newest/pageNumber/1" class="w3-bar-item w3-button">Tenis</a>
  </div>

  <Link to='login' class="w3-bar-item w3-button w3-padding">Entrar</Link>
   
 <p>
  <i class="fa fa fa-whatsapp w3-hover-opacity w3-xlarge w3-margin-left"></i>
        <i class="fa fa-instagram w3-hover-opacity w3-xlarge w3-margin-left"></i> 
        <i class="fa fa fa-envelope-o w3-hover-opacity w3-xlarge w3-margin-left"></i>
        <i class="fa fa fa-lock w3-hover-opacity w3-xlarge w3-margin-left"></i>
       
  </p>
  
  

  <p class='w3-margin-left'> gazz@gazzstore.com.br </p>
 
</nav>


<header class="w3-bar w3-top w3-hide-large  w3-xlarge">
  <div class="w3-bar-item w3-padding-24 w3-wide">

  <img src={require("../assets/gazc.png")} className='logo' /> 
  </div>
  <a  class="w3-bar-item w3-button w3-padding-24 w3-right" onClick={w3_open}><i class="fa fa-bars w3-margin-right"></i></a>
</header>

<div class="w3-overlay w3-hide-large" onClick={w3_close} title="close side menu" id="myOverlay" style={{'display':`${display}`}}></div>

<div class="w3-main" >


  <div class="w3-hide-large" style={{"margin-top":"120px"}} ></div>
  

  <header class="w3-container w3-xlarge">
   
    <p class="w3-right">

   
   
     
     <Link to='/carrinho'>
     <i class="fa fa-shopping-cart w3-margin-right"> {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )} </i>
     </Link>
     
    
     <i class="fa fa-user-o w3-margin-right"></i>

     <i class="fa fa-search w3-margin-right" ></i>
      
      
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
     <p class="w3-left"> Recentes </p>  
  </div>

  


  <div class="w3-row ">
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
