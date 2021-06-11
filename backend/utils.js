import jwt from 'jsonwebtoken';
import mg from 'mailgun-js';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
  });

export const payOrderEmailTemplate = (order) => {
  return `<h1>Agradecemos o seu pedido</h1>
  <p>
  Olá ${order.user.name},</p>
  <p>Seu pacote está sendo preparado para envio. </p>
  <p> Após o processamento do pacote em até 48 horas úteis você receberá um e-mail com o código de rastreio de seu pedido. </p>
  </p>
  <h2>[Pedido ${order._id}] </h2>
  <table>
  <thead>
  <tr>
  <td><strong>Produto      </strong></td>
  <td><strong>    Quantidade</strong></td>
  <td><strong align="right">   Preço</strong></td>
  </thead>
  <tbody>
  ${order.orderItems
    .map(
      (item) => `
    <tr>
    <td>${item.name}</td>
    <td align="center">     ${item.qty}</td>
    <td align="right"> R$${item.price.toFixed(2)}</td>
    </tr>
  `
    )
    .join('\n')}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="2">Items :</td>
  <td align="right"> R$${order.itemsPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Frete:</td>
  <td align="right"> R$${order.taxPrice.toFixed(2)}</td>
  </tr>
  
  <tr>
  <td colspan="2"><strong>Total:</strong></td>
  <td align="right"><strong> R$${order.totalPrice.toFixed(2)}</strong></td>
  </tr>
  <tr>
  <td colspan="2">Forma de Pagamento:</td>
  <td align="right">${order.paymentMethod}</td>
  </tr>
  </table>
  <h2>Endereço de entrega</h2>
  <p>
  ${order.shippingAddress.fullName},<br/>
  ${order.shippingAddress.address},<br/>
  ${order.shippingAddress.city},<br/>
  ${order.shippingAddress.country},<br/>
  ${order.shippingAddress.postalCode}<br/>
  </p>
  <hr/>
  <p>
  Obrigado por Comprar conosco! 
  </p>
  `;
};

export const tokenSendTemplete = (token) => {
  return  `<h1>Esqueseu sua senha?</h1>
  <p> Utilize o token de verificação para recuperar sua senha: <a href='#'> ${token} </a>   </p> 
   
  `
  
}

export const OrderEmailTemplate = (order) => {
  return `<h1>Agradecemos a preferencia</h1>
  <p> Olá ${order.shippingAddress.fullName.split(' ', 1)}, obrigado por escolher a GAZZ.</p>
  <p>Confira abaixo os detalhes do seu pedido [ ID: ${order._id}]  </p>
  <h2> Pedido  </h2>
  <table>
  <thead>
  <tr>
  <td><strong>Produto</strong></td>
  <td><strong>Quantidade</strong></td>
  <td><strong align="right">Preço</strong></td>
  </thead>
  <tbody>
  ${order.orderItems
    .map(
      (item) => `
    <tr>
    <td>${item.name}</td>
    <td align="center">${item.qty}</td>
    <td align="right"> R$${item.price.toFixed(2)}</td>
    </tr>
  `
    )
    .join('\n')}
  </tbody>
  <tfoot>
  
 
  <tr>
  <td colspan="2">Taxa de Entrega:</td>
  <td align="right"> R$${order.shippingPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2"><strong>Total Valor:</strong></td>
  <td align="right"><strong> R$${order.totalPrice.toFixed(2)}</strong></td>
  </tr>
  <tr>
  <td colspan="2">Forma de Pagamento:</td>
  <td align="right">${order.paymentMethod}</td>
  </tr>
  </table>
  <h2>Endereço de Entrega</h2>
  <p>
  ${order.shippingAddress.fullName},<br/>
  ${order.shippingAddress.address},<br/>
  ${order.shippingAddress.city},<br/>
  ${order.shippingAddress.country},<br/>
  ${order.shippingAddress.postalCode}<br/>
  </p>
  <hr/>
  <p> Caso existam divergências entre em contato com o Suporte de Atendimento (61)993828838 </p>
 <p> Sua solicitação de compra será analisada e seu pedido será confirmado em até 24 horas úteis.  </p>
   
 <p> Após a confirmação de seu pagamento, você receberá um e-mail com mais detalhes
   </p>

  <p>
  Obrigado por comprar conosco!
  </p>
  `;
};


export const rastreioOrderTemplate = (order) => {
  return `
  <h1> Olá ${order.shippingAddress.fullName.split(' ', 1)}</h1>

 

  <p>O seu pacote já foi preparado para envio e já se encontra nas instalações da transportadora. Fique de olho que em breve o seu pedido estará chegando até você! <p/>
 
  <p>

  <p>Codigo Para Rastreio: <strong> ${order.codRastreio} </strong>
  
  `;
};

