import React, { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';



export default function Recuperar(props) {
    const [email, setEmail] = useState('');
  

  
    async function submitHandler() {
      
     try{
  
       await Axios.post('/api/users/forgot', {email})
       .then(
        alert('O token será enviado no email cadastrado'),
        props.history.push('/newpassword')  
       )
       
     }
     catch{
       alert('Email não cadastrado, tente novamente')
       props.history.push('/sendtoken')
     }

      
    };
  return (
    <div>
            <div class="w3-container"  >
    <h1 class="w3-center w3-text-blue">
    <img src={require("../assets/gazc.png")} className='imgLogin2' />
    </h1>
    <h1 class="w3-center w3-text-blue">
    Recuperar Senha
    </h1>

     
    <hr  class="w3-round"/>
   
    <form onSubmit={submitHandler} >
    
      
      <div class="w3-section">
          
        <label>Email</label>
        <input
         class="w3-input w3-border"
            type="email"
            id="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
      </div>
      

      <h3 className='w3-center'> 
            
             <button class="w3-button w3-green" type='submit'>  Enviar Token </button>
             
             </h3>

    </form>  
  </div>






    </div>
  );
}
