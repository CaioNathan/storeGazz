import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Axios from 'axios';

export default function ForgotPasswordScreen(props) {
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
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Criar nova Senha</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}

        <div>
          <label htmlFor="token">Token</label>
          <input
            type="text"
            id="token"
            placeholder="Token"
            required
            onChange={(e) => setToken(e.target.value)}
          ></input>
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
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="Senha"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirmar Senha"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continuar
          </button>
        </div>
       
      </form>
    </div>
  );
}
