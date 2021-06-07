import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Produto from './screens/Produto';
import Carrinho from './screens/Carrinho';
import Entrega from './screens/Entrega';
import Pagamento from './screens/Pagamento';
import Finalizar from './screens/Finalizar';
import Pedido from './screens/Pedido';
import Login from './screens/Login';
import Register from './screens/Register';
import Recuperar from './screens/Recuperar';
import NovaSenha from './screens/NovaSenha';
import Dash from './screens/Dash';
import AdminRoute from './components/AdminRoute';
import Pesquisa from './screens/Pesquisa';
import EditarProduto from './screens/EditarProduto';
import PedidosList from './screens/Pedidos';
import ProfileScreen from './screens/Profile';


function App() {



  return (
    <BrowserRouter>
      <div >
      
       
        <main>
         
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/produto/:id" component={Produto} ></Route>
          <Route path="/product/:id/editar" component={EditarProduto} ></Route>
          <Route path="/carrinho/:id?" component={Carrinho} ></Route>
          <Route path="/entrega" component={Entrega} ></Route>
          <Route path="/pagamento" component={Pagamento} ></Route>
          <Route path="/finalizar" component={Finalizar} ></Route>
          <Route path="/pedido/:id" component={Pedido} ></Route>
          <Route path="/login" component={Login} ></Route>
          <Route path="/register" component={Register} ></Route>
          <Route path="/recuperar" component={Recuperar} ></Route>
          <Route path="/novasenha" component={NovaSenha} ></Route>
          <Route path="/pedidoslist" component={PedidosList} ></Route>
          <Route path="/profile" component={ProfileScreen} ></Route>
          <Route
            path="/search/name/:name?"
            component={Pesquisa}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={Pesquisa}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={Pesquisa}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={Pesquisa}
            exact
          ></Route>
          
          <AdminRoute
            path="/dash"
            component={Dash}
            exact
          ></AdminRoute>

         
        </main>
       
      </div>
    </BrowserRouter>
  );
}

export default App;
