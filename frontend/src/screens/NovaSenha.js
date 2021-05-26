import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Axios from 'axios';



export default function NovaSenha(props) {
    const [token,setToken] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const redirect = props.location.search
      ? props.location.search.split('=')[1]
      : '/';
  
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;
  
    async function submitHandler  ()  {
      if (password !== confirmPassword){
        alert('As senhas devem ser iguais');
      
      }
      if(password.length < 8){
        alert('A senha deve conter no mínino 8 caracteres')
      }else{
  
        try{
       
          await  await Axios.post('/api/users/newpassword', {email,password,token}).then(
            props.history.push('/signin')
          );
      
         
        }catch{
          alert('Não foi possível alterar, tente novamente.');
          props.history.push('/newpassword')
        }
  
      }
      
      
      
    };
    useEffect(() => {
      if (userInfo) {
        props.history.push(redirect);
      }
    }, [props.history, redirect, userInfo]);
  return (
    <div>

<div class="w3-container"  >
    <h1 class="w3-center w3-text-blue">
    <img src={require("../assets/gazc.png")} className='imgLogin2' />
    </h1>

    <h1 class="w3-center w3-text-blue">
     Nova Senha
    </h1>

     
    <hr  class="w3-round"/>
   
    <form onSubmit={submitHandler} >
    {loading && <LoadingBox></LoadingBox>}
    {error && <MessageBox variant="danger">{error}</MessageBox>}

    <div class="w3-section">
        <label>Token</label>
        <input
         class="w3-input w3-border"
            type="text"
            id="token"
            placeholder="Token"
            required
            onChange={(e) => setToken(e.target.value)}
          ></input>
      </div>
      
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
      <div class="w3-section">
        <label>Senha</label>
        <input
         class="w3-input w3-border"
            type="password"
            id="password"
            placeholder="Senha"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
      </div>
      <div class="w3-section">
        <label>Confirmar Senhar</label>
        <input
         class="w3-input w3-border"
            type="password"
            id="confirmPassword"
            placeholder="Confirmar Senha"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
      </div>
      <h3 className='w3-center'> 
            
             <button class="w3-button w3-green" type='submit'>   Continuar </button>
             
             </h3>
    </form>  
  </div>



    </div>
  );
}
