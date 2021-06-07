import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../constants/productConstants';
import { Link } from 'react-router-dom';

export default function Dash(props){

  const [pedidos,setPedidos] = useState('');
  const [clientes,setClientes] = useState('');
  const [produtos,setProdutos] = useState('');

  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const {
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  const productDelete = useSelector((state) => state.productDelete);
  const {
 
    success: successDelete,
  } = productDelete;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/editar`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(
      listProducts({})
    );
  }, [
    createdProduct,
    dispatch,
    successCreate,
   
  ]);

  useEffect(()=>{
        
    let mounted=true;
     axios.get('/api/orders',{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }).then(response =>{
        if(mounted){
        setPedidos(response.data);

    }})

    axios.get('/api/users',{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }).then(response =>{
        if(mounted){
        setClientes(response.data);

    }})

    axios.get('/api/products/list',{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }).then(response =>{
        if(mounted){
        setProdutos(response.data);

    }})



    return()=> mounted = false;
    

},[token]);

async function deleteClientesHandler(id) {
  if (window.confirm("Tem certeza que deseja excluir esse cliente?")) {
      try{
          await  axios.delete(`/api/users/${id}`,{
              headers:{
                  Authorization:`Bearer ${token}`,
              }
          }).then(response =>{
              setClientes(clientes.filter(clientes=>clientes._id!==id));
  
          })
      

      } catch(err) {
          alert(err);
      }
  }
}

async function deletePedidosHandler(id) {
  if (window.confirm("Tem certeza que deseja excluir esse pedido?")) {
      try{
          await  axios.delete(`/api/orders/${id}`,{
              headers:{
                  Authorization:`Bearer ${token}`,
              }
          }).then(response =>{
              setPedidos(pedidos.filter(pedidos=>pedidos._id!==id));
  
          })
      

      } catch(err) {
          alert(err);
      }
  }
}

async function deleteProdutosHandler(id) {
  if (window.confirm("Tem certeza que deseja excluir esse produto?")) {
      try{
          await  axios.delete(`/api/products/${id}`,{
              headers:{
                  Authorization:`Bearer ${token}`,
              }
          }).then(response =>{
              setProdutos(produtos.filter(produtos=>produtos._id!==id));
  
          })
      

      } catch(err) {
          alert(err);
      }
  }
}

const createHandler = () => {
  dispatch(createProduct());
};

    return(
        <div>


<div class="w3-bar w3-top w3-black w3-large" style={{"background":"black"}} >
<span class="w3-bar-item w3-left"><b>GazzStore</b> </span>
  <button class="w3-bar-item w3-button w3-hide-large w3-hover-none w3-hover-text-light-grey" ><i class="fa fa-bars"></i>  Menu</button>
  
</div>

<nav class="w3-sidebar w3-collapse w3-white w3-animate-left" id="mySidebar" style={{"margin-top":"45px"}}><br/>
  <div class="w3-container w3-row">
    <div class="w3-col s4">
      <Link to='/'>
      <img  src={require("../assets/gazc.png")}  class="w3-circle w3-margin-right logoDash" />
      </Link>
    </div>
    <div class="w3-col s8 w3-bar" style={{"background":"transparent"}}>
      <span>Bem vindo <strong> </strong></span><br/>
      <a href="#" class="w3-bar-item w3-button"><i class="fa fa-envelope"></i></a>
      <a href="#" class="w3-bar-item w3-button"><i class="fa fa-user"></i></a>
      <a href="#" class="w3-bar-item w3-button"><i class="fa fa-cog"></i></a>
    </div>
  </div>
  <hr/>
  <div class="w3-container">
    <h5>Menu</h5>
  </div>
  <div class="w3-bar-block">
   
    <a href="#" class="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black"  title="close menu"><i class="fa fa-remove fa-fw"></i>  Fechar </a>
    <a href="#" class="w3-bar-item w3-button w3-padding w3-blue"><i class="fa fa-diamond fa-fw"></i>  Inicio </a>
    <a href="#tabelaProdutos"  class="w3-bar-item w3-button w3-padding "><i class="fa fa-cubes fa-fw"></i> Produtos </a>
    <a href="#tabelaPedidos"  class="w3-bar-item w3-button w3-padding"><i class="fa fa-truck fa-fw"></i>  Pedidos </a>
    <a href="#tabelaClientes"  class="w3-bar-item w3-button w3-padding"><i class="fa fa-users fa-fw"></i>  Clientes </a>
   
    
  </div>
</nav>



<div class="w3-overlay w3-hide-large w3-animate-opacity"  title="close side menu" id="myOverlay"></div>


<div class="w3-main">


  <header class="w3-container" >
    <h5><b><i class="fa fa-dashboard"></i> Painel </b></h5>
  </header>

  <div class="w3-row-padding w3-margin-bottom">
 
    <div class="w3-quarter" >
    <a href="#tabelaProdutos" style={{"text-decoration":"none"}}>
      <div class="w3-container w3-red w3-padding-16">
        <div class="w3-left"><i class="fa fa-cubes w3-xxxlarge"></i></div>
        <div class="w3-right">
         
        </div>
        <div class="w3-clear"></div>
        <h4> Produtos </h4>
      </div>
      </a>
    </div>
   
    <div class="w3-quarter"  >
    <a href="#tabelaPedidos" style={{"text-decoration":"none"}}>
      <div class="w3-container w3-blue w3-padding-16">
        <div class="w3-left"><i class="fa fa-truck w3-xxxlarge"></i></div>
        <div class="w3-right">
         
        </div>
        <div class="w3-clear"></div>
        <h4>Pedidos</h4>
      </div>
      </a>
    </div>

   
   
    <div class="w3-quarter" >
    <a href="#tabelaClientes" style={{"text-decoration":"none"}}>
      <div class="w3-container w3-teal w3-padding-16">
        <div class="w3-left"><i class="fa fa-users w3-xxxlarge"></i></div>
        <div class="w3-right">
          
        </div>
        <div class="w3-clear"></div>
        <h4>Clientes</h4>
      </div>
      </a>
    </div>
    <div class="w3-quarter" >
    <a href="#tabelaPosts" style={{"text-decoration":"none"}}>
      <div class="w3-container w3-orange w3-text-white w3-padding-16">
        <div class="w3-left"><i class="fa fa-bolt w3-xxxlarge"></i></div>
        <div class="w3-right">
         
        </div>
        <div class="w3-clear"></div>
        <h4>Destaque</h4>
      </div>
      </a>
    </div>
  </div>

  {produtos !== '' && 
  <div class="w3-panel" id='tabelaProdutos'>
  <div class="w3-row-padding">

            <h1> Produtos </h1>
  
    
            <div class="w3-twothird">
            <h5> Recentes </h5>
            <div> 

                
            </div>

            <table class="w3-table w3-striped w3-white">

            <thead>
                    <tr>
                        <th></th>
                        <th>Produto</th>
                        <th>Preço</th>
                        <th>Marca</th>
                        <th>Quantidade</th>
                        <th>Opções</th>
                       
                        
                        
                    </tr>
                    </thead>
            {produtos.map((produtos) => (
                 <>
                    <tr>
                    <td><i class="fa fa-user w3-text-blue w3-large"></i></td>
                    <td> {produtos.name}  </td>
                    <td>{produtos.price}</td>
                    <td>{produtos.brand}</td>
                    <td> {produtos.countInStock}  </td>
                    
                   
                   
                    <td>
                   <Link to={`/product/${produtos._id}/editar`} className='edit'> <i class="fa fa-edit" aria-hidden="true" ></i> </Link> 
                    <i class="fa fa-trash-o" aria-hidden="true" onClick={()=>deleteProdutosHandler(produtos._id)}></i>
                    </td>

                    
                    
                </tr>
                </>
             ))}

             
                
            </table>

              
            

            
            </div>
            <div class="w3-third">
            <h5>Cadastrar</h5>
           
            <button class="w3-button w3-dark-grey" onClick={createHandler}>  Novo Produto   <i class="fa fa-arrow-right"></i></button>
           
            </div>
           
        </div>
        </div>
  
  }

{pedidos !== '' && 
  <div class="w3-panel" id='tabelaPedidos'>
  <div class="w3-row-padding">

            <h1> Pedidos </h1>
  
    
            <div class="w3-twothird">
            <h5> Recentes </h5>
            <div> 

                
            </div>

            <table class="w3-table w3-striped w3-white">

            <thead>
                    <tr>
                        <th></th>
                        <th>Rastreio</th>
                        <th>Pagamento</th>
                        <th>Entrega</th>
                        <th>Cliente</th>
                        <th>Opções</th>
                        
                        
                    </tr>
                    </thead>
            {pedidos.map((pedidos) => (
                 <>
                    <tr>
                    <td><i class="fa fa-user w3-text-blue w3-large"></i></td>
                    <td> {pedidos.codRastreio}  </td>
                    <td>{pedidos.isPaid ? 'Pago' : 'Pendente'}</td>
                    <td>{pedidos.isDelivered ? 'Pago' : 'Pendente'}</td>
                    <td> {pedidos.user.email}  </td>
                    
                   
                   
                    <td>
                    <Link to={`/pedido/${pedidos._id}`} className='edit'> <i class="fa fa-edit" aria-hidden="true" ></i> </Link>
                    <i class="fa fa-trash-o" aria-hidden="true" onClick={()=>deletePedidosHandler(pedidos._id)}></i>
                    </td>
                    
                </tr>
                </>
             ))}
                
            </table>

            
            </div>
           
        </div>
        </div>
  
  }



  
  {clientes !== '' && 
  <div class="w3-panel" id='tabelaClientes'>
  <div class="w3-row-padding">

            <h1> Clientes </h1>
  
    
            <div class="w3-twothird">
            <h5> Recentes </h5>
            <div> 

                
            </div>

            <table class="w3-table w3-striped w3-white">

            <thead>
                    <tr>
                        <th></th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Deletar</th>
                        
                        
                    </tr>
                    </thead>
            {clientes.map((clientes) => (
                 <>
                    <tr>
                    <td><i class="fa fa-user w3-text-blue w3-large"></i></td>
                    <td> {clientes.name}  </td>
                    <td> {clientes.email} </td>
                    <td>{clientes.isAdmin ? 'Sim' : 'Não'}</td>
                    <td>
                    <i class="fa fa-trash-o" aria-hidden="true" onClick={()=>deleteClientesHandler(clientes._id)}></i>
                    </td>
                    
                </tr>
                </>
             ))}
                
            </table>

            
            </div>
        </div>
        </div>
  
  }






  
  <hr/>
 
 

 
</div>


        </div>
    );
}