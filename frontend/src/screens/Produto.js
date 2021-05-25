import React, { useEffect, useState }   from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {  createReview,detailsProduct } from '../actions/productActions';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';


export default function Produto(props) {

  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');


  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);
  const addToCartHandler = () => {
    props.history.push(`/carrinho/${productId}?qty=${qty}`);
  };
 

    const [current,setCurrent] = useState('1');


    function showSlides1(){
        document.getElementById("imagem1").hidden=true;  
        document.getElementById("imagem2").hidden=false;  
        document.getElementById("imagem3").hidden=true; 

 
     
        
        document.getElementById("first").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
        document.getElementById("second").className='w3-tag demodots w3-border w3-transparent w3-white';
        document.getElementById("tres").className='w3-tag demodots w3-border w3-transparent w3-hover-white';

        setCurrent('2')
       
    }

    function showSlides2(){
        document.getElementById("imagem1").hidden=true;  
        document.getElementById("imagem2").hidden=true;  
        document.getElementById("imagem3").hidden=false; 

       
        
        
        document.getElementById("second").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
        document.getElementById("tres").className='w3-tag demodots w3-border w3-transparent w3-white';
        document.getElementById("first").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
        
        setCurrent('3')
       
    }

    function showSlides3(){
        document.getElementById("imagem1").hidden=false;  
        document.getElementById("imagem2").hidden=true;  
        document.getElementById("imagem3").hidden=true;  

        document.getElementById("tres").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
        document.getElementById("first").className='w3-tag demodots w3-border w3-transparent w3-white';
        document.getElementById("second").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
        setCurrent('1')
       
     
    }

    function volta(){
        if(current === '1'){
       
         showSlides2() 
        }
        if(current === '2'){ 
             showSlides3() 
            }
        if(current === '3'){ 
                showSlides1() 
               }
     }

    function passa(){
        if(current === '1'){
       
         showSlides1() 
        }
        if(current === '2'){ 
             showSlides2() 
            }
        if(current === '3'){ 
                showSlides3() 
               }
     }


  return (
    <div> 
      {loading ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (

      
          <>    

<div class="w3-top">
  <div class="w3-row w3-large w3-light-grey">
    <div class="w3-col s3">
      <Link to="/" class="w3-button w3-block">
      <img src={require("../assets/gazc.png")} className='logo' /> 
      </Link>
    </div>
    <div class="w3-col s3">
      <a href="#plans" class="w3-button w3-block">Plans</a>
    </div>
    <div class="w3-col s3">
      <a href="#about" class="w3-button w3-block">About</a>
    </div>
    <div class="w3-col s3">
      <a href="#contact" class="w3-button w3-block">Contact</a>
    </div>
  </div>
</div>

<div class="w3-content" >

  

  <div class="w3-panel" style={{'margin-top':'36px'}}>
    <h1><b>{product.name}</b></h1>
 
  </div>

<div>

     


    

  <div class="w3-container" > 
    <div class="w3-display-container mySlides" id='imagem1'hidden={false}>
    <img src={require("../assets/news.png")} className='img'/>
      <div class="w3-display-topleft w3-container w3-padding-32">
        <span class="w3-white w3-padding-large w3-animate-bottom" onClick={showSlides2}>R$50.00</span>
      </div>
    </div>
    <div class="w3-display-container mySlides" id='imagem2' hidden={true}>
    <img src={require("../assets/tenis.png")} className='img'/>
      <div class="w3-display-toplefrtw3-container w3-padding-32">
        <span class="w3-white w3-padding-large w3-animate-bottom" onClick={showSlides3}>R$80.00</span>
      </div>
    </div>
    <div class="w3-display-container mySlides" id='imagem3' hidden={true}>
    <img src={require("../assets/gazc.png")} className='img'/>
      <div class="w3-display-topleft w3-container w3-padding-32">
        <span class="w3-white w3-padding-large w3-animate-bottom" onClick={showSlides1}>R$120.00</span>
      </div>
    </div>

    
    <div class="w3-container w3-dark-grey w3-padding w3-xlarge">
      
      <div class="w3-right" onClick={passa} id='passa'><i class="fa fa-arrow-circle-right w3-hover-text-teal"></i></div>
      <div class="w3-left"  onClick={volta} id='volta' ><i class="fa fa-arrow-circle-left w3-hover-text-teal"></i></div>
     
      <div class="w3-center">
        <span class="w3-tag demodots w3-border w3-transparent w3-white" id='first'onClick={showSlides3} ></span>
        <span class="w3-tag demodots w3-border w3-transparent w3-hover-white"id='second'onClick={showSlides1} ></span>
        <span class="w3-tag demodots w3-border w3-transparent w3-hover-white" id='tres' onClick={showSlides2} ></span>
      </div>
    </div>
  </div>


  

  </div>
  

  <div class="w3-row w3-container">
    <div class="w3-center w3-padding-64">
      <span class="w3-xlarge w3-bottombar w3-border-dark-grey w3-padding-16">Nike Air Max 2090</span>
    </div>
    <div class="w3-col l3 m6 w3-light-grey w3-container w3-padding-16">
      <h3>Tamanho</h3>
      <p>41</p>
    </div>

    <div class="w3-col l3 m6 w3-grey w3-container w3-padding-16">
      <h3>Condição</h3>
      <p>Novo sem caixa 4.5/5</p>
    </div>

    <div class="w3-col l3 m6 w3-dark-grey w3-container w3-padding-16">
      <h3>Preço</h3>
      <p>R${product.price},00</p>
    </div>

    <div class="w3-col l3 m6 w3-black w3-container w3-padding-16">
      <h3>Descrição</h3>
      <p>{product.description}</p>
    </div>
  </div>


  <div class="w3-row-padding" id="plans">
    <div class="w3-center w3-padding-64">
      <h3>  <button onClick={addToCartHandler} class="w3-button w3-green w3-padding-large">Adicioanar ao carrinho</button></h3>
     
    </div>

</div>
   
  </div>
  </>

  )}

    </div>
  );
}
