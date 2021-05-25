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


function App() {



  return (
    <BrowserRouter>
      <div >
      
       
        <main>
         
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/produto/:id" component={Produto} ></Route>
          <Route path="/carrinho/:id?" component={Carrinho} ></Route>
          <Route path="/entrega" component={Entrega} ></Route>
          <Route path="/pagamento" component={Pagamento} ></Route>
          <Route path="/finalizar" component={Finalizar} ></Route>
          <Route path="/pedido/:id" component={Pedido} ></Route>
          <Route path="/login" component={Login} ></Route>

         
        </main>
       
      </div>
    </BrowserRouter>
  );
}

export default App;
