import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import { CSSTransition } from "react-transition-group";
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import MapScreen from './screens/MapScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import SendTokenScreen from './screens/SendTokenScreen';

function App() {


  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };
  const toggleNavClose = () => {
    setNavVisibility(false);
  };

  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  



  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="grid-container">
      <header className="Header">
      <div className='h1c'> 
        <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i class="fa fa-bars" aria-hidden="true"></i>
         
            </button>
      <Link to="/" >
      <img src={require("./assets/gazc.png")} className="Logo" alt="logo" />  </Link> </div>
    
     
      <CSSTransition
        in={!isSmallScreen || isNavVisible} 
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        
        <nav className="Nav">

         
        
        <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>

         


    
        <Link to="/cart" className='cat'>
        <i class="fa fa-opencart" aria-hidden="true">
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
              </i>
       </Link>


  
 
           

          

        
       
        {
          userInfo ? (
            <div className="dropdown">

            <Link to='#'> 
              {userInfo.name} <i className="fa fa-caret-down"> </i> {''} 
              </Link>
              <ul className="dropdown-content">
              <li>
                  <Link to="/profile"> Profile </Link>
                </li>
                <li>
                  <Link to="/orderhistory"> Meus pedidos </Link>
                </li>

                <li> 
                <Link to="#signout" onClick={signoutHandler}>Sair </Link>
                </li>

              </ul>



            </div>
          ) :
          (
            <Link to="/signin">Entrar</Link>
          )
        }



        {userInfo && userInfo.isAdmin &&  (
          <div className="dropdown">
            <Link to="#admin">Admin <i className="fa fa-caret-down"> </i>
            </Link>
          <ul className="dropdown-content">
            <li>
            <Link to="/dashboard"> Painel  </Link> 
            </li>
            
            <li>
            <Link to="/productlist">Produtos  </Link> 
            </li>

            <li>
            <Link to="/orderlist">Pedidos  </Link> 
            </li>

            <li>
            <Link to="/userList">Usuários  </Link> 
            </li>

          </ul>


          </div>


        )}

      <Link className='cba' onClick={toggleNavClose}> <i class="fa fa-window-close-o" aria-hidden="true"> Fechar</i> </Link>


           
       
        </nav>
      
      </CSSTransition>

      

      <div className="cba">
       <Link to="/cart">
       <i class="fa fa-opencart" aria-hidden="true">
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
              </i>
        </Link>
        </div>
        <div>
      <span onClick={toggleNav} className="Burger">
      <i class="fa fa-plus-square" aria-hidden="true"></i>
      </span>
    </div>

    
      
    </header>
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categorias</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            <li><Link onClick={() => setSidebarIsOpen(false)} to='/search/category/all/name/all/min/0/max/0/rating/0/order/newest/pageNumber/1'> Todas</Link> </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                    
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
         
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/sendtoken" component={SendTokenScreen}></Route>
          <Route path="/newpassword" component={ForgotPasswordScreen}></Route>
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
          
          

          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="footer"> 

     

        <Link to="/" >
      <img src={require("./assets/gazc.png")} className="Logo2" alt="logo" />  </Link>

      

        <div className="block">

        <p> Contato: Gazz@gazzstore.com.br</p>


        <div> 
      <a href='https://api.whatsapp.com/send/?phone=5561993828838&text&app_absent=0'> <i className="fa fa-whatsapp" aria-hidden="true"> </i> </a>

  <a href='https://www.instagram.com/gazzstore/'>   <i className="fa fa-instagram" aria-hidden="true"></i> </a> 

<Link>  <i class="fa fa-lock" aria-hidden="true"></i> </Link> 

</div>


   

        

        </div>


     


      


     
         
       </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
