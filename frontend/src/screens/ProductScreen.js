import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

function verificaImage(product) {
 
  if(product.image !== 'Novo'){


    return <div>
      <img src={product.image}
      alt={product.name}
               ></img>
             
    </div>
  }
  else{
  return []
}


  
}

function verificaImage1(product) {
  if(product.productImages1 !== 'Novo'){
  return  <div>
  <img src={product.productImages1}
  alt={product.name}
           ></img>
         
</div>}
  else{
  return [] }
  
}

function verificaImage2(product) {
  if(product.productImages2 !== 'Novo'){
  return  <div>
  <img src={product.productImages2}
  alt={product.name}
           ></img>
         
</div>}
  else{
  return [] }
  
}

function verificaImage3(product) {
  if(product.productImages3 !== 'Novo'){
  return  <div>
  <img src={product.productImages3}
  alt={product.name}
           ></img>
         
</div>}
  else{
  return [] }
  
}

function verificaImage4(product) {
  if(product.productImages4 !== 'Novo'){
  return  <div>
  <img src={product.productImages4}
  alt={product.name}
           ></img>
         
</div>}
  else{
  return [] }
  
}

function verificaImage5(product) {
  if(product.productImages5 !== 'Novo'){
  return  <div>
  <img src={product.productImages5}
  alt={product.name}
           ></img>
         
</div>}
  else{
  return [] }
  
}
  
  
  
  
  
  



  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Adicione um comentário ou avaliação');
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Voltar</Link>
          <div className="row top">
           
           <div className="col-2" > 
            <Carousel showArrows autoPlay showThumbs={false}   >

        
              
              {verificaImage(product)} 
              
           
              {verificaImage1(product)}  

              {verificaImage2(product)}  
              
              {verificaImage3(product)}  

              {verificaImage4(product)} 

              {verificaImage5(product)}  
              

           
              
              

            
              
            
           
           
          </Carousel>
           
          </div>

            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                <li>Preço : R${product.price}</li>
                <li>
                  Descrição:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Preço</div>
                      <div className="price">R${product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">Em estoque</span>
                        ) : (
                          <span className="danger">Indisponível</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qtd</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Adicionar ao Carrinho
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h2 id="reviews">Reviews</h2>
            {product.reviews.length === 0 && (
              <MessageBox>Sem avalições</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Deixe sua avaliação</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Avaliação</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">...</option>
                        <option value="1">1- Ruim</option>
                        <option value="2">2- Normal</option>
                        <option value="3">3- Bom</option>
                        <option value="4">4- Muito bom</option>
                        <option value="5">5- Excelente</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Comentário</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Enviar
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                   Faça o <Link to="/signin">Login</Link> para avaliar
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
