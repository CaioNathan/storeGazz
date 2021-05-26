
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';



export default function Register(props) {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

 
  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    
    
    if (password !== confirmPassword){
      alert('As senhas devem ser iguais');
    
    }
    if(password.length < 8){
      alert('A senha deve conter no mínino 8 caracteres')
    }
     else {
      dispatch(register(name, email, password));
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
    Criar Conta
    </h1>

     
    <hr  class="w3-round"/>
   
    <form onSubmit={submitHandler} >
    {loading && <LoadingBox></LoadingBox>}
    {error && <MessageBox variant="danger">{error}</MessageBox>}

    <div class="w3-section">
          
          <label>Nome</label>
          <input
           class="w3-input w3-border"
              type="text"
              id="nome"
              placeholder="Nome"
              required
              onChange={(e) => setName(e.target.value)}
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
            
             <button class="w3-button w3-green" type='submit'>   Entrar </button>
             
             </h3>

             <div className='w3-center'>
            Novo na loja?{' '}
            <Link to={`/register?redirect=${redirect}`}>
              Crie uma conta
            </Link>
          </div>
          <div className='w3-center'>
            Esqueceu sua Senha?{' '}
            <Link to={`/sendtoken`}>
              Recuperar
            </Link>
          </div>
    </form>  
  </div>






    </div>
  );
}
