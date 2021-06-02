import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProductCategories, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';



export default function HomeScreen(props) {

  const [display,setDisplay]= useState('none');
 

function w3_open() {
  setDisplay('block')
  
}
 
function w3_close() {
  setDisplay('none')
  
}

const {
    name = 'all',
    category = 'all',
    min = 0,
    max = 0,
    rating = 0,
    order = 'newest',
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  useEffect(() => {

    
    dispatch(
      listProducts({
        pageNumber,
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '',
        min,
        max,
        rating,
        order,
      })
    );
    
  }, [category, dispatch, max, min, name, order, rating, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  };



 

  return (
    <div>

<nav class="w3-sidebar w3-bar-block w3-white w3-collapse w3-top" style={{"z-index":"3","width":"250px",'display':`${display}`}} id="mySidebar">
  <div class="w3-container w3-display-container w3-padding-16">
    <i onClick={w3_close} class="fa fa-remove w3-hide-large w3-button w3-display-topright"></i>
    <img src={require("../assets/gazc.png")} className='logo' />
    
  </div>
  <div class="w3-padding-64 w3-large w3-text-grey" style={{"font-weight":"bold"}}>




  {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <>
                  <Link
                    class="w3-bar-item w3-button"
                    to={getFilterUrl({ category: 'all' })}
                  >
                    Todas
                  </Link>
                
                {categories.map((c) => (
                 
                    <Link
                    class="w3-bar-item w3-button"
                      to={getFilterUrl({ category: c })}
                    >
                      {c}
                    </Link>
                  
                ))}
                </>
             
            )}



  
  </div>

  

        
 
 
</nav>

<header class="w3-bar w3-top w3-hide-large  w3-xlarge">
  <div class="w3-bar-item  w3-wide">
  <img src={require("../assets/gazc.png")} className='logo' /> 
  </div>
  <a class="w3-bar-item  w3-padding-24 w3-right" onClick={w3_open}><i class="fa fa-bars"></i></a>
</header>


    <div class="w3-overlay w3-hide-large" onClick={w3_close} style={{"cursor":"pointer"}} title="close side menu" id="myOverlay"></div>


        <div class="w3-main" style={{"margin-left":"250px"}}>

        

        <div class="w3-row w3-grayscale">

{loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{products.length} Resultados</div>
        )}

        <div style={{"margin-top":"65px"}}>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <select  value={category}
              onChange={(e) => {
                props.history.push(getFilterUrl({ category: e.target.value }));
              }}>
                 <option value="all">Todas</option>
                {categories.map((c) => (
                   <option value={c}>{c}</option>
                ))}
              </select>
            )}
          </div>

        

        <div className='w3-right'style={{"margin-bottom":"40px","margin-right":"20px"}}>
          Filtrar por:{' '}
          <select
            value={order}
            onChange={(e) => {
              props.history.push(getFilterUrl({ order: e.target.value }));
            }}
          >
            <option value="newest">Mais novos</option>
            <option value="lowest">Menor Preço</option>
            <option value="highest">Maior Preço</option>
            
          </select>

        </div>

        
          </div>



          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>Produto não encontrado</MessageBox>
              )}
              <>
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </>
              
            </>
          )}










        </div>




    </div>
  );
}
