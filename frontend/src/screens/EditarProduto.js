import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function EditarProduto(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [condicao, setCondicao] = useState('');
  const [description, setDescription] = useState('');
  const [productImages1,setProductImages1] = useState('');
  const [productImages2,setProductImages2] = useState('');
  const [productImages3,setProductImages3] = useState('');
  const [productImages4,setProductImages4] = useState('');
  const [productImages5,setProductImages5] = useState('');
  const [tamanho,setTamanho] = useState('');
  const [p,setP] = useState('');
  const [m,setM] = useState('');
  const [g,setG] = useState('');
  const [gg,setGg] = useState('');
  const [num34,setNum34] = useState('');
  const [num35,setNum35] = useState('');
  const [num36,setNum36] = useState('');
  const [num37,setNum37] = useState('');
  const [num38,setNum38] = useState('');
  const [num39,setNum39] = useState('');
  const [num40,setNum40] = useState('');
  const [num41,setNum41] = useState('');
  const [num42,setNum42] = useState('');
  const [num43,setNum43] = useState('');
  const [num44,setNum44] = useState('');
  

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/dash');
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
      setProductImages1(product.productImages1) 
      setProductImages2(product.productImages2) 
      setProductImages3(product.productImages3) 
      setProductImages4(product.productImages4) 
      setProductImages5(product.productImages5) 
      setTamanho(product.tamanho)
      setCondicao(product.condicao)
      setP(product.tamanhosDisponiveis[0].p)
      setM(product.tamanhosDisponiveis[0].m)
      setG(product.tamanhosDisponiveis[0].g)
      setGg(product.tamanhosDisponiveis[0].gg)
      setNum34(product.tamanhosDisponiveis[0].num34)
      setNum35(product.tamanhosDisponiveis[0].num35)
      setNum36(product.tamanhosDisponiveis[0].num36)
      setNum37(product.tamanhosDisponiveis[0].num37)
      setNum38(product.tamanhosDisponiveis[0].num38)
      setNum39(product.tamanhosDisponiveis[0].num39)
      setNum40(product.tamanhosDisponiveis[0].num40)
      setNum41(product.tamanhosDisponiveis[0].num41)
      setNum42(product.tamanhosDisponiveis[0].num42)
      setNum43(product.tamanhosDisponiveis[0].num43)
      setNum44(product.tamanhosDisponiveis[0].num44)
    }
  }, [product, dispatch, productId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        brand,
        tamanho,
        countInStock,
        description,
        productImages1, 
        productImages2, 
        productImages3, 
        productImages4, 
        productImages5, 
        condicao,
        tamanhosDisponiveis:{
          p:p,m:m,g:g,gg:gg,
          num34:num34,num35:num35,num36:num36,num37:num37,num38:num38,
          num39:num39,num40:num40,num41:num41,num42:num42,num43:num43,num44:num44,
        
        }, 
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  const uploadFile1Handler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setProductImages1(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  const uploadFile2Handler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setProductImages2(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  const uploadFile3Handler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setProductImages3(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  const uploadFile4Handler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setProductImages4(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  const uploadFile5Handler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setProductImages5(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div>
      <div>

<div class="w3-container"  >
    <h1 class="w3-center w3-text">
    Editar Produto {name}
    </h1>

     
    <hr  class="w3-round"/>
   
    <form onSubmit={submitHandler} >
    {loading && <LoadingBox></LoadingBox>}
    {error && <MessageBox variant="danger">{error}</MessageBox>}
      
      <div class="w3-section">
        <label>Nome</label>
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
        <label>Pre??o</label>
        <input
         class="w3-input w3-border"
         id="price"
         type="text"
         placeholder="Pre??o"
         value={price}
         onChange={(e) => setPrice(e.target.value)}
        
          ></input>
      </div>
      <div class="w3-section">
        <label>Imagem Principal </label>
        <div>
        <input
         class="w3-input w3-border"
         id="image"
                type="text"
                placeholder="Imagem"
                value={image}
                onChange={(e) => setImage(e.target.value)}
        
          ></input>

       
              <input
                multiple
                type="file"
                id="imageFile"
                label="Escolha uma imagem"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}

        </div>

        <div class="w3-section">
        <label>Categoria</label>
        <input
         class="w3-input w3-border"
         id="category"
                type="text"
                placeholder="Categoria"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
         
          ></input>
      </div>

      <div class="w3-section">
        <label>Marca</label>
        <input
         class="w3-input w3-border"
         id="brand"
                type="text"
                placeholder="Marca"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
         
          ></input>
      </div>

      <div class="w3-section">
        <label>Quantidade</label>
        <input
         class="w3-input w3-border"
         id="countInStock"
                type="text"
                placeholder="Qtd Estoque"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
         
          ></input>
      </div>

      <div class="w3-section">
        <label>Tamanho</label><br/>
        <div style={{'display':'flex'}}>
            <div style={{'margin-right':'20px '}}>
            
            <input type="checkbox" id="p" type="checkbox"
                checked={p}
                onChange={(e) => setP(e.target.checked)}/>
                <label for="p"> P </label><br/>
            
            <input type="checkbox" id="m" type="checkbox"  
                checked={m}
                onChange={(e) => setM(e.target.checked)}/>
            <label for="m"> M </label><br/>
            <input type="checkbox" id="g"  checked={g}
                onChange={(e) => setG(e.target.checked)}/>
            <label for="g"> G </label><br/>
            <input type="checkbox" id="gg"  checked={gg}
                onChange={(e) => setGg(e.target.checked)}/>
            <label for="g"> GG </label><br/>
            </div>

            <div style={{'margin-right':'20px '}}> 
            <input type="checkbox" id="34"  checked={num34}
                onChange={(e) => setNum34(e.target.checked)}/>
            <label for="34"> 34 </label><br/>
           
            <input type="checkbox" id="35"  checked={num35}
                onChange={(e) => setNum35(e.target.checked)}/>
            <label for="35"> 35 </label><br/>

            <input type="checkbox" id="36"  checked={num36}
                onChange={(e) => setNum36(e.target.checked)}/>
            <label for="36"> 36 </label><br/>

            <input type="checkbox" id="37"  checked={num37}
                onChange={(e) => setNum37(e.target.checked)}/>
            <label for="37"> 37 </label><br/>
            </div>

            <div style={{'margin-right':'20px '}}>
            <input type="checkbox" id="38"  checked={num38}
                onChange={(e) => setNum38(e.target.checked)}/>
            <label for="38"> 38 </label><br/>
           
            <input type="checkbox" id="39"  checked={num39}
                onChange={(e) => setNum39(e.target.checked)}/>
            <label for="39"> 39 </label><br/>

            <input type="checkbox" id="40"  checked={num40}
                onChange={(e) => setNum40(e.target.checked)}/>
            <label for="40"> 40 </label><br/>

            <input type="checkbox" id="41"  checked={num41}
                onChange={(e) => setNum41(e.target.checked)}/>
            <label for="40"> 41 </label><br/>
            </div>

            <div >
            <input type="checkbox" id="42"  checked={num42}
                onChange={(e) => setNum42(e.target.checked)}/>
            <label for="42"> 42 </label><br/>
           
            <input type="checkbox" id="43"  checked={num43}
                onChange={(e) => setNum43(e.target.checked)}/>
            <label for="43"> 43 </label><br/>

            <input type="checkbox" id="44"  checked={num44}
                onChange={(e) => setNum44(e.target.checked)}/>
            <label for="44"> 44 </label><br/>

           
            </div>
        </div>
      </div>

      
      <div class="w3-section">
        <label>Descri????o</label>
        <input
         class="w3-input w3-border"
         id="description"
                type="text"
                placeholder="Descri????o"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
         
          ></input>
      </div>

      <div class="w3-section">
        <label>Condi????o</label>
        <input
         class="w3-input w3-border"
         id="condicao"
                type="text"
                placeholder="Condi????o"
                value={condicao}
                onChange={(e) => setCondicao(e.target.value)}
         
          ></input>
      </div>

      <div class="w3-section">
        <label>Imagem 2 </label>
        <div>
        <input
         class="w3-input w3-border"
         id="image"
                type="text"
                placeholder="Imagem"
                value={productImages1}
                onChange={(e) => setProductImages1(e.target.value)}
        
          ></input>

       
              <input
                multiple
                type="file"
                id="imageFile"
                label="Escolha uma imagem"
                onChange={uploadFile1Handler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}

        </div>
        </div>

        <div class="w3-section">
        <label>Imagem 3 </label>
        <div>
        <input
         class="w3-input w3-border"
         id="image"
                type="text"
                placeholder="Imagem"
                value={productImages2}
                onChange={(e) => setProductImages2(e.target.value)}
        
          ></input>

       
              <input
                multiple
                type="file"
                id="imageFile"
                label="Escolha uma imagem"
                onChange={uploadFile2Handler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}

        </div>
        </div>

        <div class="w3-section">
        <label>Imagem 4 </label>
        <div>
        <input
         class="w3-input w3-border"
         id="image"
                type="text"
                placeholder="Imagem"
                value={productImages3}
                onChange={(e) => setProductImages3(e.target.value)}
        
          ></input>

       
              <input
                multiple
                type="file"
                id="imageFile"
                label="Escolha uma imagem"
                onChange={uploadFile3Handler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}

        </div>
        </div>

        <div class="w3-section">
        <label>Imagem 5 </label>
        <div>
        <input
         class="w3-input w3-border"
         id="image"
                type="text"
                placeholder="Imagem"
                value={productImages4}
                onChange={(e) => setProductImages4(e.target.value)}
        
          ></input>

       
              <input
                multiple
                type="file"
                id="imageFile"
                label="Escolha uma imagem"
                onChange={uploadFile4Handler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}

        </div>
        </div>

        <div class="w3-section">
        <label>Imagem 6 </label>
        <div>
        <input
         class="w3-input w3-border"
         id="image"
                type="text"
                placeholder="Imagem"
                value={productImages5}
                onChange={(e) => setProductImages5(e.target.value)}
        
          ></input>

       
              <input
                multiple
                type="file"
                id="imageFile"
                label="Escolha uma imagem"
                onChange={uploadFile5Handler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}

        </div>
        </div>
      
      
       
      </div>
      <h3 className='w3-center'> 
            
             <button class="w3-button w3-green" type='submit'>   Editar </button>
             
             </h3>

    </form>  
  </div>
  </div>
  </div>

  );
}
