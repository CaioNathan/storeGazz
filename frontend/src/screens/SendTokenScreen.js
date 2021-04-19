import React, { useState } from 'react';
import Axios from 'axios';



export default function SendTokenScreen(props) {
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
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Criar uma nova senha</h1>
        </div>
        
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div>
          <label />
          <button className="primary" type="submit">
            Enviar Token 
          </button>
        </div>
      </form>
    </div>
  );
}
