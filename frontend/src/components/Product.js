import React from 'react';
import { Link } from 'react-router-dom';


export default function Product(props) {
  const { product } = props;
  return (
      <div>


 
    <div class="w3-col l3 s6">
      <div class="w3-container">
      <div class="w3-display-container">
      <Link to={`/produto/${product._id}`}>
         <img src={product.image} className='img' style={{"max-width":"200px","height":"220px"}} /> 
      </Link>
          
          <div class="w3-display-middle w3-display-hover">
           <Link to={`/produto/${product._id}`}> <button class="w3-button w3-black">Ver Mais </button> </Link>
          </div>
        </div>
      
      
     
        <p>{product.name}<br/><b>R${product.price}</b></p>
      </div> 
  
    </div>

        
    </div>
  );
}
