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
      if(product.image !== 'Novo'){
        document.getElementById("imagem1").hidden=true; 
      } 
      if(product.productImages1 !== 'Novo'){
        document.getElementById("imagem2").hidden=false; 
      }
      if(product.productImages2 !== 'Novo'){ 
        document.getElementById("imagem3").hidden=true; 
      }
      if(product.productImages3 !== 'Novo'){
        document.getElementById("imagem4").hidden=true; 
      }
      if(product.productImages4 !== 'Novo'){
        document.getElementById("imagem5").hidden=true; 
      }


 
      if(product.image  !== 'Novo'){
        document.getElementById("first").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
      }
      if(product.productImages1 !== 'Novo'){
        document.getElementById("second").className='w3-tag demodots w3-border w3-transparent w3-white';
      }
      if(product.productImages2 !== 'Novo'){
        document.getElementById("tres").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
      }
      if(product.productImages3 !== 'Novo'){
        document.getElementById("quatro").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
      }
      if(product.productImages4 !== 'Novo'){
        document.getElementById("cinco").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
      }

        setCurrent('2')
      
    }

    function showSlides2(){
      if(product.image !== 'Novo'){
        document.getElementById("imagem1").hidden=true; 
      } 
      if(product.productImages1 !== 'Novo'){
        document.getElementById("imagem2").hidden=true; 
      }
      if(product.productImages2 !== 'Novo'){ 
        document.getElementById("imagem3").hidden=false; 
      }
      if(product.productImages3 !== 'Novo'){
        document.getElementById("imagem4").hidden=true; 
      }
      if(product.productImages4 !== 'Novo'){
        document.getElementById("imagem5").hidden=true; 
      }


 
      if(product.image  !== 'Novo'){
        document.getElementById("first").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
      }
      if(product.productImages1 !== 'Novo'){
        document.getElementById("second").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
      }
      if(product.productImages2 !== 'Novo'){
        document.getElementById("tres").className='w3-tag demodots w3-border w3-transparent w3-white';
      }
      if(product.productImages3 !== 'Novo'){
        document.getElementById("quatro").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
      }
      if(product.productImages4 !== 'Novo'){
        document.getElementById("cinco").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
      }

        setCurrent('3')
      
    }

    function showSlides3(){
      if(product.image !== 'Novo'){
        document.getElementById("imagem1").hidden=true; 
      } 
      if(product.productImages1 !== 'Novo'){
        document.getElementById("imagem2").hidden=true; 
      }
      if(product.productImages2 !== 'Novo'){ 
        document.getElementById("imagem3").hidden=true; 
      }
      if(product.productImages3 !== 'Novo'){
        document.getElementById("imagem4").hidden=false; 
      }
      if(product.productImages4 !== 'Novo'){
        document.getElementById("imagem5").hidden=true; 
      }


 
      if(product.image  !== 'Novo'){
        document.getElementById("first").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
      }
      if(product.productImages1 !== 'Novo'){
        document.getElementById("second").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
      }
      if(product.productImages2 !== 'Novo'){
        document.getElementById("tres").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
      }
      if(product.productImages3 !== 'Novo'){
        document.getElementById("quatro").className='w3-tag demodots w3-border w3-transparent w3-white';
      }
      if(product.productImages4 !== 'Novo'){
        document.getElementById("cinco").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
      }

        setCurrent('4')
     
    }

    function showSlides4(){
      if(product.image !== 'Novo'){
        document.getElementById("imagem1").hidden=true; 
      } 
      if(product.productImages1 !== 'Novo'){
        document.getElementById("imagem2").hidden=true; 
      }
      if(product.productImages2 !== 'Novo'){ 
        document.getElementById("imagem3").hidden=true; 
      }
      if(product.productImages3 !== 'Novo'){
        document.getElementById("imagem4").hidden=true; 
      }
      if(product.productImages4 !== 'Novo'){
        document.getElementById("imagem5").hidden=false; 
      }


 
      if(product.image  !== 'Novo'){
        document.getElementById("first").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
      }
      if(product.productImages1 !== 'Novo'){
        document.getElementById("second").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
      }
      if(product.productImages2 !== 'Novo'){
        document.getElementById("tres").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
      }
      if(product.productImages3 !== 'Novo'){
        document.getElementById("quatro").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
      }
      if(product.productImages4 !== 'Novo'){
        document.getElementById("cinco").className='w3-tag demodots w3-border w3-transparent w3-white';
      }

        setCurrent('5')
     
  }
  function showSlides5(){
    if(product.image !== 'Novo'){
      document.getElementById("imagem1").hidden=false; 
    } 
    if(product.productImages1 !== 'Novo'){
      document.getElementById("imagem2").hidden=true; 
    }
    if(product.productImages2 !== 'Novo'){ 
      document.getElementById("imagem3").hidden=true; 
    }
    if(product.productImages3 !== 'Novo'){
      document.getElementById("imagem4").hidden=true; 
    }
    if(product.productImages4 !== 'Novo'){
      document.getElementById("imagem5").hidden=true; 
    }



    if(product.image  !== 'Novo'){
      document.getElementById("first").className='w3-tag demodots w3-border w3-transparent w3-white';
    }
    if(product.productImages1 !== 'Novo'){
      document.getElementById("second").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
    }
    if(product.productImages2 !== 'Novo'){
      document.getElementById("tres").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
    }
    if(product.productImages3 !== 'Novo'){
      document.getElementById("quatro").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
    }
    if(product.productImages4 !== 'Novo'){
      document.getElementById("cinco").className='w3-tag demodots w3-border w3-transparent w3-hover-white';
    }

      setCurrent('1')
  }

    function volta(){
        if(current === '1'){
          if(product.image !== 'Novo')
          showSlides5() 
          if(product.productImages1 !== 'Novo')
            showSlides1() 
          if(product.productImages2 !== 'Novo')
            showSlides2() 
          if(product.productImages3 !== 'Novo')
            showSlides3() 
          if(product.productImages4 !== 'Novo')
            showSlides4() 
        }
        if(current === '2'){ 
             showSlides5() 
            }
        if(current === '3'){ 
                showSlides1() 
               }
        if(current === '4'){ 
            showSlides2() 
               }
        if(current === '5'){ 
            showSlides3() 
               }       
     }

    function passa(){
        if(current === '1'){
          if(product.productImages1 !== 'Novo'){
          showSlides1();
          }else{
            showSlides5();
          }
          
         
        }
        if(current === '2'){ 
          if(product.productImages2 !== 'Novo')
          showSlides2() 
        }
        if(current === '3'){ 
          if(product.productImages3 !== 'Novo'){
            showSlides3();
          }else{
            showSlides5();
          }
           
            
               }
        if(current === '4'){ 
          if(product.productImages4 !== 'Novo'){
          showSlides4();
          }else{
            showSlides5();
          }
          
               
               }
        if(current === '5'){ 
          if(product.productImages1 !== 'Novo'){
            showSlides5();
          }
          
            
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
      <a href="/" class="w3-button w3-block">Início</a>
    </div>
    <div class="w3-col s3">
      <a href="/search/category/all" class="w3-button w3-block">Buscar</a>
    </div>
    <div class="w3-col s3">
      <a href="/carrinho" class="w3-button w3-block">Carrinho</a>
    </div>
  </div>
</div>

<div class="w3-content" >

  

  <div class="w3-panel" style={{'margin-top':'36px'}}>
    <h1><b>{product.name}</b></h1>
 
  </div>

<div>

     


    

  <div class="w3-container" > 
  { product.image !== 'Novo' &&
    <div class="w3-display-container mySlides" id='imagem1'hidden={false}>
    <img src={product.image} className='img'/>
      <div class="w3-display-topleft w3-container w3-padding-32">
        
      </div>
    </div>
  }
    
    <div class="w3-display-container mySlides" id='imagem2' hidden={true}>
    <img src={product.productImages1} className='img'/>
      <div class="w3-display-toplefrtw3-container w3-padding-32">
        
      </div>
    </div>
    <div class="w3-display-container mySlides" id='imagem3' hidden={true}>
    <img src={product.productImages2} className='img'/>
      <div class="w3-display-topleft w3-container w3-padding-32">
        
      </div>
    </div>
    <div class="w3-display-container mySlides" id='imagem4' hidden={true}>
    <img src={product.productImages3} className='img'/>
      <div class="w3-display-topleft w3-container w3-padding-32">
       
      </div>
    </div>
    <div class="w3-display-container mySlides" id='imagem5' hidden={true}>
    <img src={product.productImages4} className='img'/>
      <div class="w3-display-topleft w3-container w3-padding-32">
       
      </div>
    </div>

    
    <div class="w3-container w3-dark-grey w3-padding w3-xlarge">
      
      <div class="w3-right" onClick={passa} id='passa'><i class="fa fa-arrow-circle-right w3-hover-text-teal"></i></div>
      <div class="w3-left"  onClick={volta} id='volta' ><i class="fa fa-arrow-circle-left w3-hover-text-teal"></i></div>
     
      <div class="w3-center">
      { product.image !== 'Novo' &&
        <span class="w3-tag demodots w3-border w3-transparent w3-white" id='first'onClick={showSlides5} ></span>
      }
       { product.productImages1 !== 'Novo' &&
        <span class="w3-tag demodots w3-border w3-transparent w3-hover-white"id='second'onClick={showSlides1} ></span>
      }
      { product.productImages2 !== 'Novo' &&
        <span class="w3-tag demodots w3-border w3-transparent w3-hover-white" id='tres' onClick={showSlides2} ></span>
      }
      { product.productImages3 !== 'Novo' &&
        <span class="w3-tag demodots w3-border w3-transparent w3-hover-white" id='quatro' onClick={showSlides3} ></span>
      }
      { product.productImages4 !== 'Novo' &&
        <span class="w3-tag demodots w3-border w3-transparent w3-hover-white" id='cinco' onClick={showSlides4} ></span>
      }
        </div>
    </div>
  </div>


  

  </div>
  

  <div class="w3-row w3-container">
    <div class="w3-center w3-padding-64">
      <span class="w3-xlarge  w3-border-dark-grey w3-padding-16">{product.name}</span>
    </div>
    <div class="w3-col l3 m6 w3-light-grey w3-container w3-padding-16">
      <h3>Tamanhos</h3>
      <p> 
        {product.tamanhosDisponiveis[0].p &&
        <b>P </b>
        }
         {product.tamanhosDisponiveis[0].m &&
        <b>M </b>
        }
         {product.tamanhosDisponiveis[0].g &&
         <b>G </b>
        }

        {product.tamanhosDisponiveis[0].gg &&
         <b>GG </b>
        }

        {product.tamanhosDisponiveis[0].num34 &&
        <b>34 </b>
        }
         {product.tamanhosDisponiveis[0].num35 &&
        <b>35 </b>
        }
         {product.tamanhosDisponiveis[0].num36 &&
         <b>36 </b>
        }

        {product.tamanhosDisponiveis[0].num37 &&
         <b>37 </b>
        }


        {product.tamanhosDisponiveis[0].num38 &&
        <b>38 </b>
        }
         {product.tamanhosDisponiveis[0].num39 &&
        <b>39 </b>
        }
         {product.tamanhosDisponiveis[0].num40 &&
         <b>40 </b>
        }
          {product.tamanhosDisponiveis[0].num41 &&
         <b>41 </b>
        }
          {product.tamanhosDisponiveis[0].num42 &&
         <b>42 </b>
        }
          {product.tamanhosDisponiveis[0].num43 &&
         <b>43 </b>
        }
          {product.tamanhosDisponiveis[0].num44 &&
         <b>44 </b>
        }
        
        
        
        
     </p>
    </div>

    <div class="w3-col l3 m6 w3-grey w3-container w3-padding-16">
      <h3>Condição</h3>
      <p>{product.condicao}</p>
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
