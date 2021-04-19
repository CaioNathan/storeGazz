import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Product from '../components/Product';
import { Carousel } from 'react-responsive-carousel';

import Axios from 'axios';
import { Link } from 'react-router-dom';


export default function HomeScreen() {
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

<div className="abc"> 
      <Link className="abcLink"to='/search/category/Camisetas/name/all/min/0/max/0/rating/0/order/newest/pageNumber/1'> Camisetas</Link>
      <Link className="abcLink"to='/search/category/Tênis/name/all/min/0/max/0/rating/0/order/newest/pageNumber/1' > Tênis</Link>
      <Link className="abcLink"to='/search/category/Bonés/name/all/min/0/max/0/rating/0/order/newest/pageNumber/1'> Bonés</Link>
      <Link className="abcLink"to='/search/category/Bermudas/name/all/min/0/max/0/rating/0/order/newest/pageNumber/1'> Bermudas</Link>
      <Link className="abcLink"to='/search/category/Calças/name/all/min/0/max/0/rating/0/order/newest/pageNumber/1'> Calças</Link>
     
      
      </div>

      

      <div className="cba"> 

          <Carousel  
          interval={2500}
          showArrows 
          autoPlay  
          showThumbs={false} 
          showIndicators={false} 
          showStatus={false} 
          infiniteLoop={true} >


        <div>
         <img src={require("../assets/Camisetas.jpg")} className="Logo" alt="logo" />  
        </div>

        <div>
         <img src={require("../assets/tenis.jpg")} className="Logo" alt="logo" />  
        </div>

        <div>
         <img src={require("../assets/bones.jpg")} className="Logo" alt="logo" />  
        </div>

        <div>
         <img src={require("../assets/bermudas.jpg")} className="Logo" alt="logo" />  
        </div>

        <div>
         <img src={require("../assets/calças.jpg")} className="Logo" alt="logo" />  
        </div>


                
        
         
          
          


          </Carousel>

          </div>

          
           <div className='h1c'>  <h1> Novidades da Loja</h1> </div>
          <div className="row center">
            
          
            <>
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
            </>
          </div>
          <div className="row center"> 
          <Link to="/search/category/all/name/all/min/0/max/0/rating/0/order/newest/pageNumber/1"> Ver tudo </Link>
          </div>
    </div>
  );
}
