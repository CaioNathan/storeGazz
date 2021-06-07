import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
     
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert('As senhas devem ser iguais');
      
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
         
        })
      );
    }
    
  };
  return (
    <div>

<div class="w3-container"  >
    <h1 class="w3-center w3-text-blue">
    <img src={require("../assets/gazc.png")} className='imgLogin' />
    </h1>

      <form className="form" onSubmit={submitHandler}>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Editado com sucesso!
              </MessageBox>
            )}
            <div class="w3-section">
              <label htmlFor="name">Nome</label>
              <input
              class="w3-input w3-border"
                id="name"
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div class="w3-section">
              <label htmlFor="email">Email</label>
              <input
              class="w3-input w3-border"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div class="w3-section">
              <label htmlFor="password">Senha</label>
              <input
              class="w3-input w3-border"
                id="password"
                type="password"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div class="w3-section">
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <input
              class="w3-input w3-border"
                id="confirmPassword"
                type="password"
                placeholder="Confirmar Senha"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
           
            <div>
              <label />
              <button className="primary" type="submit">
                Editar
              </button>
            </div>
          </>
        )}
      </form>
      </div>
    </div>
  );
}
